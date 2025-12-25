# WPS (World Public Summit) API Documentation

**Version:** 1.0
**Base URL:** `https://api.wps.example.com/api`
**Last Updated:** December 25, 2025

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Common Parameters](#common-parameters)
4. [Response Format](#response-format)
5. [Events API](#events-api)
6. [News API](#news-api)
7. [Hotels API](#hotels-api)
8. [Competitions API](#competitions-api)
9. [Awards API](#awards-api)
10. [Partners API](#partners-api)
11. [Committee Members API](#committee-members-api)
12. [Error Handling](#error-handling)
13. [Rate Limiting](#rate-limiting)

---

## Getting Started

### Base Requirements
- API Endpoint: `https://api.wps.example.com/api`
- Content-Type: `application/json`
- All API calls use HTTP methods: GET, POST, PUT, DELETE

### Quick Start Example
```bash
curl -X GET "https://api.wps.example.com/api/events?page=1&per_page=15"
```

---

## Authentication

### Token-Based (Sanctum)
Currently, the API supports public access for read-only endpoints. Admin endpoints require authentication.

```bash
# Future: Get authentication token
curl -X POST "https://api.wps.example.com/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

### Using Token
```bash
curl -X GET "https://api.wps.example.com/api/protected" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Common Parameters

### Pagination Parameters
All list endpoints support pagination:

| Parameter | Type | Default | Max | Description |
|-----------|------|---------|-----|-------------|
| `page` | integer | 1 | - | Page number |
| `per_page` | integer | 15 | 100 | Items per page |

### Search Parameters
Some endpoints support full-text search:

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Search query across searchable fields |

### Sorting Parameters
All list endpoints support sorting:

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| `sort_by` | string | field name | Field to sort by |
| `sort_order` | string | `asc` \| `desc` | Sort direction |

### Example Request
```
GET /api/events?page=1&per_page=15&sort_by=start_date&sort_order=asc&search=conference
```

---

## Response Format

### Success Response (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "title": {
        "ru": "Событие",
        "en": "Event"
      },
      "created_at": "2025-12-25T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "total": 100,
    "last_page": 7,
    "from": 1,
    "to": 15
  }
}
```

### Error Response (4xx, 5xx)
```json
{
  "message": "Validation Error",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

### Single Resource Response
```json
{
  "data": {
    "id": 1,
    "title": {"ru": "Название", "en": "Title"},
    "created_at": "2025-12-25T10:00:00Z"
  }
}
```

---

## Events API

### List Events
```
GET /api/events
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page (max 100)
- `sort_by` (string) - Field: `created_at`, `start_date`, `title`
- `sort_order` (string) - `asc` or `desc`
- `search` (string) - Search by type

**Example:**
```bash
curl "https://api.wps.example.com/api/events?page=1&per_page=15&sort_by=start_date&sort_order=desc"
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": {"ru": "Конференция", "en": "Conference"},
      "description": {"ru": "Описание", "en": "Description"},
      "type": "conference",
      "start_date": "2025-12-25T10:00:00Z",
      "status": "published",
      "created_at": "2025-12-25T10:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 15,
    "total": 50,
    "last_page": 4
  }
}
```

### Get Single Event
```
GET /api/events/{id}
```

**Example:**
```bash
curl "https://api.wps.example.com/api/events/1"
```

---

## News API

### List News
```
GET /api/news
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `sort_by` (string) - Field: `created_at`, `published_at`, `views_count`
- `sort_order` (string) - `asc` or `desc`
- `type` (string) - Filter: `news`, `article`

**Example:**
```bash
curl "https://api.wps.example.com/api/news?type=news&page=1&per_page=10"
```

### Get Single News
```
GET /api/news/{id}
```

---

## Hotels API

### List Hotels
```
GET /api/hotels
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `category` (string) - Filter: `recommended`, `championship`, `verified`

**Example:**
```bash
curl "https://api.wps.example.com/api/hotels?category=recommended&page=1"
```

### Get Single Hotel
```
GET /api/hotels/{id}
```

---

## Competitions API

### List Competitions
```
GET /api/competitions
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `search` (string) - Search by type

**Example:**
```bash
curl "https://api.wps.example.com/api/competitions?page=1&per_page=15"
```

### Get Single Competition
```
GET /api/competitions/{id}
```

### Get Competition FAQ
```
GET /api/competitions/{id}/faq
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `search` (string) - Search in FAQ

**Response:**
```json
{
  "data": [
    {
      "question": {"ru": "Вопрос", "en": "Question"},
      "answer": {"ru": "Ответ", "en": "Answer"}
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 20,
    "last_page": 2
  }
}
```

---

## Awards API

### List Awards
```
GET /api/awards
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `year` (string) - Filter by award year
- `sort_by` (string) - Field: `created_at`, `award_year`

**Example:**
```bash
curl "https://api.wps.example.com/api/awards?year=2025&page=1"
```

### Get Single Award
```
GET /api/awards/{id}
```

---

## Partners API

### List Partners
```
GET /api/partners
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `search` (string) - Search by name

**Example:**
```bash
curl "https://api.wps.example.com/api/partners?page=1&per_page=20"
```

### Get Single Partner
```
GET /api/partners/{id}
```

---

## Committee Members API

### List Committee Members
```
GET /api/committee-members
```

**Parameters:**
- `page` (integer) - Page number
- `per_page` (integer) - Items per page
- `search` (string) - Search by name

**Example:**
```bash
curl "https://api.wps.example.com/api/committee-members?page=1"
```

### Get Single Member
```
GET /api/committee-members/{id}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful request |
| 400 | Bad Request | Invalid parameters |
| 404 | Not Found | Resource doesn't exist |
| 422 | Validation Error | Invalid input data |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Internal server error |

### Error Response Example
```json
{
  "message": "Validation Error",
  "errors": {
    "per_page": ["The per_page field must not be greater than 100."]
  }
}
```

---

## Rate Limiting

### Limits
- **Default:** 60 requests per minute per IP
- **Authenticated:** 100 requests per minute per token

### Headers
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1640419200
```

### Exceeding Limit
```json
{
  "message": "Too Many Requests",
  "retry_after": 30
}
```

---

## Best Practices

### Caching
```javascript
// Cache responses on client side
const getCachedEvents = async () => {
  const cached = localStorage.getItem('events_cache');
  if (cached && Date.now() - JSON.parse(cached).timestamp < 3600000) {
    return JSON.parse(cached).data;
  }

  const response = await fetch('/api/events?page=1&per_page=15');
  const data = await response.json();
  localStorage.setItem('events_cache', JSON.stringify({
    data: data,
    timestamp: Date.now()
  }));
  return data;
};
```

### Pagination Usage
```javascript
// Always use pagination for large datasets
const getEvents = async (page = 1) => {
  const response = await fetch(
    `/api/events?page=${page}&per_page=15&sort_by=start_date&sort_order=desc`
  );
  return response.json();
};
```

### Error Handling
```javascript
const fetchWithErrorHandling = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error.message);
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};
```

---

## Version History

### v1.0 (December 25, 2025)
- Initial API release
- All core endpoints implemented
- Pagination, search, and sorting available

---

**Support:** api-support@wps.example.com
