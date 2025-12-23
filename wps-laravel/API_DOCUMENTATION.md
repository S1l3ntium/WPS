# WPS Backend API Documentation

## Overview

The WPS backend now provides a complete REST API for the React frontend application. All data is returned in JSON format. The backend has been migrated from server-side rendering to API-first architecture.

## Base URL

```
http://localhost:8000/api
```

## Authentication

Admin endpoints (POST, PUT, DELETE) require authentication via `auth:api` middleware. Public endpoints (GET) are accessible without authentication.

## CORS Configuration

CORS is enabled for frontend development. Allowed origins are configured in `.env`:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173
```

---

## Public Endpoints

### Events

#### Get all events with filters
```
GET /api/events
```

**Query Parameters:**
- `date` (optional): Filter by date (YYYY-MM-DD)
- `tags` (optional): Filter by tags (comma-separated)

**Response:**
```json
[
  {
    "id": 1,
    "title": { "ru": "...", "en": "..." },
    "description": { "ru": "...", "en": "..." },
    "type": "СТРАТЕГИЧЕСКАЯ СЕССИЯ",
    "date": "20.09.2025",
    "time": "09:00 - 10:30",
    "location": { "ru": "...", "en": "..." },
    "tags": ["tag1", "tag2"],
    "downloadLink": "url/to/document"
  }
]
```

#### Get event details
```
GET /api/events/{id}
```

**Response:**
```json
{
  "id": 1,
  "type": "СТРАТЕГИЧЕСКАЯ СЕССИЯ",
  "title": { "ru": "...", "en": "..." },
  "date": "20.09.2025",
  "time": "09:00 - 10:30",
  "location": { "ru": "...", "en": "..." },
  "venue": { "ru": "...", "en": "..." },
  "description": { "ru": "...", "en": "..." },
  "additionalInfo": { "ru": "...", "en": "..." },
  "goals": ["goal1", "goal2"],
  "format": { "ru": "...", "en": "..." },
  "questions": ["question1", "question2"],
  "moderators": [
    {
      "name": "John Doe",
      "description": "Role/Position",
      "country": "USA"
    }
  ],
  "experts": [...],
  "speakers": [...],
  "schedule": [
    {
      "time": "09:00 - 09:30",
      "title": "Opening remarks",
      "speakers": [...]
    }
  ],
  "tags": ["tag1", "tag2"],
  "downloadLink": "url"
}
```

---

### News & Publications

#### Get all publications
```
GET /api/news
```

**Query Parameters:**
- `type` (optional): Filter by type ('news' or 'article')

**Response:**
```json
[
  {
    "id": 1,
    "type": "news",
    "image": "image_url",
    "category": "НОВОСТИ",
    "title": { "ru": "...", "en": "..." },
    "excerpt": { "ru": "...", "en": "..." },
    "date": "20.12.2025"
  }
]
```

#### Get news details
```
GET /api/news/{id}
```

**Response:**
```json
{
  "id": 1,
  "type": "news",
  "image": "image_url",
  "category": "НОВОСТИ",
  "title": { "ru": "...", "en": "..." },
  "excerpt": { "ru": "...", "en": "..." },
  "lead": { "ru": "...", "en": "..." },
  "content": { "ru": "...", "en": "..." },
  "date": "20.12.2025",
  "views": 150
}
```

---

### Partners

#### Get all active partners
```
GET /api/partners
```

**Response:**
```json
[
  {
    "id": 1,
    "name": { "ru": "...", "en": "..." },
    "logo": "logo_url",
    "websiteUrl": "https://example.com"
  }
]
```

#### Get partner details
```
GET /api/partners/{id}
```

---

### Partner Packages

#### Get all partner packages
```
GET /api/partner-packages
```

**Query Parameters:**
- `category` (optional): Filter by category ('strategic', 'general', 'official', 'sessions', 'cultural', 'supplier')

**Response:**
```json
[
  {
    "id": 1,
    "title": { "ru": "Стратегический партнер", "en": "Strategic Partner" },
    "category": "strategic",
    "description": { "ru": "...", "en": "..." },
    "benefits": ["benefit1", "benefit2", "benefit3"],
    "price": { "ru": "от 5,000,000 ₽", "en": "from 5,000,000 ₽" },
    "downloadLink": "document.pdf"
  }
]
```

---

### Hotels

#### Get hotels by category
```
GET /api/hotels
```

**Query Parameters:**
- `category` (optional): 'recommended', 'championship', 'verified'

**Response:**
```json
[
  {
    "id": 1,
    "name": { "ru": "Hotel Name", "en": "Hotel Name" },
    "address": { "ru": "...", "en": "..." },
    "metro": { "ru": "Станция метро", "en": "Metro station" },
    "price": "от 25 000 ₽",
    "image": "image_url",
    "category": "recommended",
    "specialTariff": true
  }
]
```

---

### Committee Members

#### Get all committee members
```
GET /api/committee-members
```

**Response:**
```json
[
  {
    "id": 1,
    "name": { "ru": "Ivan Petrov", "en": "Ivan Petrov" },
    "position": { "ru": "...", "en": "..." },
    "country": "Russia"
  }
]
```

---

### Competitions

#### Get all competitions
```
GET /api/competitions
```

**Response:**
```json
[
  {
    "id": 1,
    "type": "grants",
    "name": { "ru": "ДОВЕРИЕ И ЕДИНСТВО", "en": "Trust and Unity" },
    "description": { "ru": "...", "en": "..." }
  }
]
```

#### Get competition details with FAQ
```
GET /api/competitions/{id}
```

**Response:**
```json
{
  "id": 1,
  "type": "grants",
  "name": { "ru": "...", "en": "..." },
  "description": { "ru": "...", "en": "..." },
  "timeline": {
    "applicationDeadline": "01.07 — 30.07.2025",
    "awardDate": "20.09.2025",
    "implementationStart": "01.01.2026",
    "implementationEnd": "30.06.2026"
  },
  "eligibility": {
    "organizationType": "NGO",
    "minCountries": 2
  },
  "supportAreas": ["area1", "area2", "area3"],
  "faq": [
    {
      "id": 1,
      "question": { "ru": "...", "en": "..." },
      "answer": { "ru": "...", "en": "..." }
    }
  ]
}
```

---

### Awards

#### Get all awards
```
GET /api/awards
```

**Query Parameters:**
- `year` (optional): Filter by award year
- `type` (optional): Filter by award type

**Response:**
```json
[
  {
    "id": 1,
    "title": { "ru": "За служение человечеству", "en": "For Service to Humanity" },
    "description": { "ru": "...", "en": "..." },
    "winnerName": "John Doe",
    "winnerBio": { "ru": "...", "en": "..." },
    "awardYear": "2025",
    "awardType": "prize",
    "image": "image_url",
    "achievement": { "ru": "...", "en": "..." }
  }
]
```

---

## Admin Endpoints (Protected)

All admin endpoints require authentication. Prepend `POST`, `PUT`, `DELETE` methods to the public endpoints listed above.

### Create Resource
```
POST /api/{resource}
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Example (Event):**
```json
{
  "title": { "ru": "...", "en": "..." },
  "description": { "ru": "...", "en": "..." },
  "type": "СТРАТЕГИЧЕСКАЯ СЕССИЯ",
  "start_date": "2025-09-20 09:00:00",
  "end_date": "2025-09-20 10:30:00",
  "location": { "ru": "...", "en": "..." },
  "venue": { "ru": "...", "en": "..." },
  "tags": ["tag1", "tag2"],
  "goals": ["goal1", "goal2"],
  "format": { "ru": "...", "en": "..." },
  "discussion_questions": ["q1", "q2"],
  "download_link": "url"
}
```

### Update Resource
```
PUT /api/{resource}/{id}
```

### Delete Resource
```
DELETE /api/{resource}/{id}
```

---

## Data Format Notes

### Multilingual Fields
All text fields support both Russian (ru) and English (en):
```json
{
  "title": {
    "ru": "Русское название",
    "en": "English title"
  }
}
```

### Date Format
Dates in responses are formatted as `DD.MM.YYYY` (e.g., "20.09.2025")

### Time Format
Times are formatted as `HH:MM - HH:MM` (e.g., "09:00 - 10:30")

### Prices
Prices include currency symbol:
```json
{
  "price": {
    "ru": "от 5,000,000 ₽",
    "en": "from 5,000,000 ₽"
  }
}
```

Or for custom agreements:
```json
{
  "price": {
    "ru": "Индивидуально по договоренности",
    "en": "Individually by agreement"
  }
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "message": "Not found"
}
```

### 422 Validation Error
```json
{
  "message": "The given data was invalid",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthenticated"
}
```

---

## Testing the API

### Using cURL

**Get all events:**
```bash
curl http://localhost:8000/api/events
```

**Get events filtered by date:**
```bash
curl "http://localhost:8000/api/events?date=2025-09-20"
```

**Get single event with full details:**
```bash
curl http://localhost:8000/api/events/1
```

**Get news filtered by type:**
```bash
curl "http://localhost:8000/api/news?type=article"
```

**Get hotels with pagination:**

```bash
curl "http://localhost:8000/api/hotels?page=1&per_page=10"
```

**Get competition FAQ:**

```bash
curl http://localhost:8000/api/competitions/1/faq
```

### Using Postman

1. Import collection from `/postman/WPS_API.postman_collection.json`
2. Select environment: Development or Production
3. Run requests and inspect responses
4. Test multilingual data by checking `title.ru` and `title.en`

---

## Admin Panel

The MoonShine admin panel remains fully functional at `/admin` for managing all content.

---

## Environment Configuration

### CORS Origins
Update `CORS_ALLOWED_ORIGINS` in `.env` for production:
```
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### API Response Locale
The API respects the browser's locale setting. Use the `Accept-Language` header to specify the preferred language.

