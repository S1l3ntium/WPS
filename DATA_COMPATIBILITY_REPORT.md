# Data Compatibility Report: API vs Frontend

## Summary

This document details the compatibility between the WPS Backend API and Frontend components. Each section shows:
- **Frontend expects** (what the component needs)
- **API provides** (what the endpoint returns)
- **Action required** (transformation or mapping needed)

---

## 1. EVENTS (Мероприятия)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "title": { "ru": "Стратегическая сессия 1", "en": "Strategic Session 1" },
    "description": { "ru": "...", "en": "..." },
    "type": "СТРАТЕГИЧЕСКАЯ СЕССИЯ",
    "date": "19.09.2025",
    "time": "09:00 - 10:30",
    "location": { "ru": "...", "en": "..." },
    "tags": ["culture", "education"],
    "downloadLink": null,
    "venue": { "ru": "...", "en": "..." },
    "additionalInfo": { "ru": "...", "en": "..." },
    "goals": ["goal 1", "goal 2"],
    "format": { "ru": "...", "en": "..." },
    "questions": ["question 1", "question 2"],
    "moderators": [],
    "experts": [],
    "speakers": []
  }
}
```

### Frontend Expectation (ProgramPage.tsx)
```typescript
interface Event {
  id: string;
  date: string;        // Format: "19.09.2025" ✓ MATCH
  time: string;        // Format: "09:00 - 10:30" ✓ MATCH
  title: string;       // ❌ Expects string, API returns { ru, en }
  description: string; // ❌ Expects string, API returns { ru, en }
  location: string;    // ❌ Expects string, API returns { ru, en }
  tags: string[];      // ✓ MATCH
  downloadLink?: string; // ✓ MATCH
}
```

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| id | ✓ number | ✓ string | ✓ COMPATIBLE | Convert number to string |
| date | ✓ DD.MM.YYYY | ✓ DD.MM.YYYY | ✓ MATCH | No change needed |
| time | ✓ HH:MM - HH:MM | ✓ HH:MM - HH:MM | ✓ MATCH | No change needed |
| title | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(title, 'en')` |
| description | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(description, 'en')` |
| location | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(location, 'en')` |
| tags | ✓ string[] | ✓ string[] | ✓ MATCH | No change needed |
| downloadLink | ✓ string\|null | ✓ string (optional) | ✓ COMPATIBLE | No change needed |
| venue | ✓ { ru, en } | ✗ undefined | ⚠️ NEW FIELD | Optional, can be added |
| additionalInfo | ✓ { ru, en } | ✗ undefined | ⚠️ NEW FIELD | Optional, can be added |
| goals | ✓ string[] | ✗ undefined | ⚠️ NEW FIELD | Optional, can be added |
| format | ✓ { ru, en } | ✗ undefined | ⚠️ NEW FIELD | Optional, can be added |
| questions | ✓ string[] | ✗ undefined | ⚠️ NEW FIELD | Mapped from `discussionQuestions` in API |
| moderators | ✓ object[] | ✗ undefined | ⚠️ NEW FIELD | Optional, can be added |
| speakers | ✓ object[] | ✗ undefined | ⚠️ NEW FIELD | Optional, can be added |

### Recommendation
- ✅ **INTEGRATE** - Frontend needs minor updates to handle localized fields
- Create adapter function to transform API response to frontend format

---

## 2. NEWS (Новости)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "type": "news",
    "image": "https://...",
    "category": "НОВОСТИ",
    "title": { "ru": "...", "en": "..." },
    "excerpt": { "ru": "...", "en": "..." },
    "lead": { "ru": "...", "en": "..." },
    "date": "20.12.2025",
    "views": 0
  }
}
```

### Frontend Expectation (NewsPage.tsx)
```typescript
interface News {
  id: string;           // ✓ MATCH (convert number to string)
  date: string;         // Format: "03.10.2025" ✓ MATCH
  category: string;     // ✓ MATCH
  title: string;        // ❌ Expects string, API returns { ru, en }
  lead: string;         // ❌ Expects string, API returns { ru, en }
  image: string;        // ✓ MATCH
  content: object[];    // ❌ Not provided by API
}
```

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| id | ✓ number | ✓ string | ✓ COMPATIBLE | Convert number to string |
| date | ✓ DD.MM.YYYY | ✓ DD.MM.YYYY | ✓ MATCH | No change needed |
| category | ✓ string | ✓ string | ✓ MATCH | No change needed |
| title | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(title, 'en')` |
| lead | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(lead, 'en')` |
| excerpt | ✓ { ru, en } | ✗ undefined | ⚠️ NEW FIELD | Can be used as preview |
| image | ✓ string | ✓ string | ✓ MATCH | No change needed |
| type | ✓ string | ✓ string | ✓ MATCH | No change needed |
| content | ✗ N/A | ✓ object[] | ❌ MISSING | Fetch full article with `getById()` |

### Recommendation
- ✅ **INTEGRATE** - Frontend needs minor updates to handle localized fields
- For full article content, use `newsAPI.getById(id)` to fetch detailed view

---

## 3. HOTELS (Отели)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "name": { "ru": "...", "en": "..." },
    "address": { "ru": "...", "en": "..." },
    "metro": { "ru": "...", "en": "..." },
    "price": "250-350 USD",
    "image": "https://...",
    "category": "recommended",
    "specialTariff": true
  }
}
```

### Frontend Expectation (ParticipantsPage.tsx - Hotels section)
```typescript
interface Hotel {
  id: number;      // ✓ MATCH
  name: string;    // ❌ Expects string, API returns { ru, en }
  address: string; // ❌ Expects string, API returns { ru, en }
  metro: string;   // ❌ Expects string, API returns { ru, en }
  price: string;   // ✓ MATCH
  image: string;   // ✓ MATCH
}
```

### Organization in Frontend
```typescript
hotels: {
  recommended: Hotel[];
  championship: Hotel[];
  verified: Hotel[];
}
```

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| id | ✓ number | ✓ number | ✓ MATCH | No change needed |
| name | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(name, 'en')` |
| address | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(address, 'en')` |
| metro | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(metro, 'en')` |
| price | ✓ string | ✓ string | ✓ MATCH | No change needed |
| image | ✓ string | ✓ string | ✓ MATCH | No change needed |
| category | ✓ string | ✓ used for grouping | ✓ COMPATIBLE | Group by category when displaying |
| specialTariff | ✓ boolean | ✗ undefined | ⚠️ NEW FIELD | Optional, can display as badge |

### Recommendation
- ✅ **INTEGRATE** - Group hotels by `category` and handle localized fields
- Create mapping function to group hotels by category after fetching

---

## 4. COMMITTEE MEMBERS (Члены комитета)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "name": { "ru": "Иван Петров", "en": "Ivan Petrov" },
    "position": { "ru": "Председатель", "en": "Chairman" },
    "country": "Russia"
  }
}
```

### Frontend Expectation (OrgCommitteePage.tsx)
```typescript
interface CommitteeMember {
  country: string;   // ✓ MATCH
  name: string;      // ❌ Expects string, API returns { ru, en }
  position: string;  // ❌ Expects string, API returns { ru, en }
}
```

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| country | ✓ string | ✓ string | ✓ MATCH | No change needed |
| name | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(name, 'en')` |
| position | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(position, 'en')` |
| id | ✓ number | ✗ undefined | ⚠️ NEW FIELD | Available for unique key in lists |

### Recommendation
- ✅ **INTEGRATE** - Simple transformation needed for localized fields

---

## 5. PARTNER PACKAGES (Пакеты партнерства)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "title": { "ru": "...", "en": "..." },
    "category": "strategic",
    "description": { "ru": "...", "en": "..." },
    "benefits": ["Logo placement", "Speaking opportunity", ...],
    "price": { "ru": "По договоренности", "en": "By arrangement" },
    "downloadLink": "https://..."
  }
}
```

### Frontend Expectation (PartnersPage.tsx → PartnerPackage.tsx)
```typescript
interface PartnerPackage {
  id: string;              // ✓ MATCH (convert number to string)
  title: string;           // ❌ Expects string, API returns { ru, en }
  category: string;        // ✓ MATCH
  description: string;     // ❌ Expects string, API returns { ru, en }
  benefits: string[];      // ✓ MATCH
  downloadLink?: string;   // ✓ MATCH
  price?: string;          // ❌ Expects string, API returns { ru, en }
}
```

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| id | ✓ number | ✓ string | ✓ COMPATIBLE | Convert number to string |
| title | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(title, 'en')` |
| category | ✓ string | ✓ string | ✓ MATCH | No change needed |
| description | ✓ { ru, en } | ✗ string | ❌ MISMATCH | Use `getLocalized(description, 'en')` |
| benefits | ✓ string[] | ✓ string[] | ✓ MATCH | No change needed |
| price | ✓ { ru, en } | ✓ string (optional) | ❌ MISMATCH | Use `getLocalized(price, 'en')` |
| downloadLink | ✓ string | ✓ string (optional) | ✓ MATCH | No change needed |

### Recommendation
- ✅ **INTEGRATE** - Simple transformation needed for localized fields

---

## 6. COMPETITIONS (Конкурсы)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "type": "Grant",
    "name": { "ru": "...", "en": "..." },
    "description": { "ru": "...", "en": "..." },
    "timeline_opening": "2025-09-01",
    "timeline_closing": "2025-10-31",
    "timeline_announcement": "2025-11-15",
    "eligibility_age_min": 18,
    "eligibility_age_max": 65,
    "eligibility_requirements": ["Active researcher", ...],
    "support_areas": ["Technology", "Healthcare", ...]
  }
}
```

### Frontend Expectations
- **GrantsCompetitionPage.tsx** - Hardcoded competition data
- **LeadershipCompetitionPage.tsx** - Hardcoded competition data

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| id | ✓ number | ✗ N/A | ⚠️ NEW | Optional |
| type | ✓ string | ✗ N/A | ⚠️ NEW | Can differentiate competitions |
| name | ✓ { ru, en } | ✗ Hardcoded | ❌ MISMATCH | Use `getLocalized(name, 'en')` |
| description | ✓ { ru, en } | ✗ Hardcoded | ❌ MISMATCH | Use `getLocalized(description, 'en')` |
| timeline_opening | ✓ YYYY-MM-DD | ✓ Date (different format) | ⚠️ NEEDS CONVERSION | Convert to "DD.MM. - DD.MM.YYYY г." |
| timeline_closing | ✓ YYYY-MM-DD | ✓ Date (different format) | ⚠️ NEEDS CONVERSION | Convert to date format |
| eligibility_requirements | ✓ string[] | ✓ string[] | ✓ MATCH | No change needed |
| support_areas | ✓ string[] | ✓ string[] | ✓ MATCH | No change needed |

### Recommendation
- ⚠️ **PARTIAL INTEGRATION** - Competitions have different structure in frontend
- Can enrich current components with API data about dates and requirements
- Requires custom date formatting utility

---

## 7. AWARDS (Награды)

### API Response Sample
```json
{
  "data": {
    "id": 1,
    "title": { "ru": "...", "en": "..." },
    "awardYear": "2025",
    "awardType": "Technology",
    "winnerName": "Tech Innovation Center",
    "winnerBio": { "ru": "...", "en": "..." },
    "description": { "ru": "...", "en": "..." },
    "image": "https://..."
  }
}
```

### Frontend Expectation (AwardPage.tsx)
```typescript
// Hardcoded award information in component
```

### Compatibility Status

| Field | API | Frontend | Status | Action |
|-------|-----|----------|--------|--------|
| id | ✓ number | ✗ Hardcoded | ⚠️ NEW | Available for data |
| title | ✓ { ru, en } | ✗ Hardcoded | ⚠️ NEW | Use `getLocalized(title, 'en')` |
| awardYear | ✓ string | ✗ Hardcoded | ⚠️ NEW | Can be used to display historical awards |
| awardType | ✓ string | ✗ Hardcoded | ⚠️ NEW | Can categorize awards |
| winnerName | ✓ string | ✗ Hardcoded | ⚠️ NEW | Can show award winners |
| winnerBio | ✓ { ru, en } | ✗ N/A | ⚠️ NEW | Can be used for winner details |
| description | ✓ { ru, en } | ✗ Hardcoded | ⚠️ NEW | Can replace hardcoded description |
| image | ✓ string | ✗ Hardcoded | ⚠️ NEW | Can display winner image |

### Recommendation
- ⚠️ **OPTIONAL INTEGRATION** - Award page is primarily descriptive
- Can create separate "Award Winners" section with API data
- Current award description page can remain as is

---

## Summary Table

| Resource | Status | Priority | Effort | Notes |
|----------|--------|----------|--------|-------|
| Events | ✅ INTEGRATE | HIGH | Medium | Many new fields available, good match |
| News | ✅ INTEGRATE | HIGH | Low | Simple field mappings |
| Hotels | ✅ INTEGRATE | HIGH | Low | Grouping by category, localization |
| Committee Members | ✅ INTEGRATE | MEDIUM | Very Low | Simple localization |
| Partner Packages | ✅ INTEGRATE | MEDIUM | Low | Simple field mappings |
| Competitions | ⚠️ PARTIAL | MEDIUM | Medium | Custom date formatting needed |
| Awards | ⚠️ OPTIONAL | LOW | N/A | Can be added as bonus feature |

---

## Implementation Checklist

### Phase 1 - Core Integration (Events, News, Hotels)
- [ ] Create API service (`src/services/api.ts`) ✓ DONE
- [ ] Create adapter functions for data transformation
- [ ] Update ProgramPage component
- [ ] Update NewsPage component
- [ ] Update ParticipantsPage (Hotels section)
- [ ] Test all endpoints with real data

### Phase 2 - Additional Integration (Partners, Committee)
- [ ] Update PartnersPage component
- [ ] Update OrgCommitteePage component

### Phase 3 - Advanced Integration (Competitions)
- [ ] Create date formatting utility
- [ ] Update GrantsCompetitionPage (optional enrichment)
- [ ] Update LeadershipCompetitionPage (optional enrichment)

### Phase 4 - Optional (Awards)
- [ ] Create Award Winners section (optional)
- [ ] Integrate awards data as enhancement

---

## Notes

✓ = Compatible / fully matches
⚠️ = Partial compatibility / needs transformation
❌ = Incompatible / needs significant work
✗ = Not available / missing

All localized fields use the same pattern: `{ ru: string, en: string }`
Use the `getLocalized()` utility function to extract the correct language version.
