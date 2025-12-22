# WPS Frontend - API Integration Summary

## ✅ Completed

### 1. API Service Created
**File:** `src/services/api.ts`

Contains:
- Type definitions for all data structures
- API client functions for each resource:
  - `eventsAPI` - Events management
  - `newsAPI` - News/Articles
  - `hotelsAPI` - Hotels listings
  - `committeeMembersAPI` - Committee info
  - `partnerPackagesAPI` - Partnership packages
  - `competitionsAPI` - Competitions/Grants
  - `awardsAPI` - Awards listings
  - `partnersAPI` - Partner companies
- Utility function `getLocalized()` for handling multilingual fields

### 2. Data Compatibility Report
**File:** `DATA_COMPATIBILITY_REPORT.md`

Detailed analysis of:
- How API data structure differs from frontend expectations
- Field-by-field compatibility for each resource
- Specific transformation functions needed
- Implementation checklist
- Priority levels for integration

---

## 📊 Data Compatibility Summary

### ✅ Full Integration Ready (Priority: HIGH)

#### 1. **Events** (Мероприятия)
- **API Provides:** ✓ Complete event data with multilingual support
- **Frontend Needs:** Minimal transformation
- **Main Issue:** Multilingual fields (use `getLocalized()`)
- **New Features Available:** venue, additionalInfo, goals, format, questions, moderators, experts, speakers

**Example transformation:**
```typescript
// API response
{ title: { ru: "...", en: "..." } }

// Frontend ready
{ title: getLocalized(title, 'en') }
```

#### 2. **News** (Новости)
- **API Provides:** ✓ Complete article data with images, dates, content
- **Frontend Needs:** Minimal transformation
- **Main Issue:** Multilingual fields (use `getLocalized()`)
- **Format Match:** Dates already in DD.MM.YYYY format

#### 3. **Hotels** (Отели)
- **API Provides:** ✓ Complete hotel listings grouped by category
- **Frontend Needs:** Group by `category` field + localization
- **Main Issue:** Multilingual fields (use `getLocalized()`)
- **Bonus:** `specialTariff` boolean field available

---

### ✅ Easy Integration (Priority: MEDIUM)

#### 4. **Committee Members** (Члены комитета)
- **API Provides:** ✓ All committee member data
- **Frontend Needs:** Simple localization
- **Complexity:** Very low effort

#### 5. **Partner Packages** (Пакеты партнерства)
- **API Provides:** ✓ All package details with benefits
- **Frontend Needs:** Simple localization
- **Complexity:** Low effort

---

### ⚠️ Partial Integration (Priority: MEDIUM)

#### 6. **Competitions** (Конкурсы/Гранты)
- **API Provides:** ✓ Competition details with FAQ
- **Frontend Status:** Currently hardcoded in components
- **Needs:** Custom date format conversion (YYYY-MM-DD → DD.MM. - DD.MM.YYYY)
- **Recommendation:** Can enrich existing components with API data

---

### 🔵 Optional Integration (Priority: LOW)

#### 7. **Awards** (Награды)
- **API Provides:** ✓ Award listings with winners
- **Frontend Status:** Currently hardcoded
- **Recommendation:** Can create separate "Award Winners" section as bonus feature

---

## 🔄 Data Transformation Pattern

All API responses that contain multilingual data follow this pattern:

```typescript
// API Response
{
  title: { ru: "Название на русском", en: "Title in English" },
  description: { ru: "Описание...", en: "Description..." }
}

// Transform using getLocalized()
const title = getLocalized(apiData.title, 'en');
const description = getLocalized(apiData.description, 'en');
```

---

## 📋 Implementation Checklist

### Phase 1: Core Components (Recommended First)

**Events Integration**
- [ ] Import `eventsAPI` in `ProgramPage.tsx`
- [ ] Replace mock data with `eventsAPI.getAll()`
- [ ] Apply localization to title, description, location fields
- [ ] Handle loading state

**News Integration**
- [ ] Import `newsAPI` in `NewsPage.tsx`
- [ ] Replace mock data with `newsAPI.getAll()`
- [ ] Apply localization to title, excerpt, lead fields
- [ ] Handle loading state

**Hotels Integration**
- [ ] Import `hotelsAPI` in `ParticipantsPage.tsx`
- [ ] Fetch hotels: `hotelsAPI.getAll()`
- [ ] Group by `category` field
- [ ] Apply localization to name, address, metro fields
- [ ] Handle loading state

### Phase 2: Additional Components

**Committee Members**
- [ ] Import in `OrgCommitteePage.tsx`
- [ ] Replace mock with `committeeMembersAPI.getAll()`
- [ ] Apply localization

**Partner Packages**
- [ ] Import in `PartnersPage.tsx`
- [ ] Replace mock with `partnerPackagesAPI.getAll()`
- [ ] Apply localization

### Phase 3: Optional Enhancements

**Competitions**
- [ ] Create date formatting utility
- [ ] Enrich `GrantsCompetitionPage` with FAQ data
- [ ] Convert dates to DD.MM. - DD.MM.YYYY format

**Awards**
- [ ] Create Awards Winners section (optional)

---

## 🛠️ Key Utilities Provided

### `getLocalized(data, locale)`
Extracts the correct language version from multilingual field.

```typescript
import { getLocalized } from 'src/services/api';

const text = getLocalized(
  { ru: "Российский текст", en: "English text" },
  'en'  // Returns "English text"
);
```

### API Client Functions
All functions return Promise with typed data:

```typescript
import { eventsAPI, newsAPI, hotelsAPI } from 'src/services/api';

// Get all events
const events = await eventsAPI.getAll();

// Get all events for specific date
const dayEvents = await eventsAPI.getAll({ date: '2025-09-20' });

// Get specific event details
const event = await eventsAPI.getById(1);

// Get hotels by category
const recommended = await hotelsAPI.getAll({ category: 'recommended' });
```

---

## 🚀 Quick Start

1. **Environment Setup:**
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```
   (Already defaults to this, but can be overridden)

2. **Basic Integration:**
   ```typescript
   import { eventsAPI, getLocalized } from '../services/api';

   // In your component
   const [events, setEvents] = useState([]);

   useEffect(() => {
     eventsAPI.getAll().then(data => {
       const transformed = data.map(event => ({
         ...event,
         title: getLocalized(event.title, 'en'),
         location: getLocalized(event.location, 'en')
       }));
       setEvents(transformed);
     });
   }, []);
   ```

3. **Error Handling:**
   ```typescript
   try {
     const data = await eventsAPI.getAll();
   } catch (error) {
     console.error('Failed to fetch events:', error);
     // Show user-friendly error message
   }
   ```

---

## 📝 Notes

- **API Server:** Must be running on `http://localhost:8000` for development
- **CORS:** Already configured on backend for localhost
- **Data Format:** All dates are in DD.MM.YYYY format from API
- **Languages:** All user-facing strings support Russian and English
- **Lazy Loading:** Consider implementing pagination for large datasets later

---

## Files Created

1. **`/src/services/api.ts`**
   - API client with all endpoints
   - Type definitions
   - Utility functions
   - Ready to use

2. **`DATA_COMPATIBILITY_REPORT.md`**
   - Detailed field-by-field comparison
   - Transformation requirements
   - Priority matrix
   - Implementation checklist

3. **`API_INTEGRATION_SUMMARY.md`** (this file)
   - Quick reference guide
   - Integration patterns
   - Quick start examples

---

## Next Steps

1. ✅ API service created
2. ✅ Data compatibility analyzed
3. ⏳ **Ready to start integrating components**
   - Start with ProgramPage (Events)
   - Then NewsPage
   - Then ParticipantsPage (Hotels)
   - Continue with other components

Each integration follows the same pattern:
- Import API module
- Replace mock data with API call
- Apply localization transformations
- Add loading/error states

---

## Support

For detailed field mappings, see `DATA_COMPATIBILITY_REPORT.md`
For API client documentation, see comments in `src/services/api.ts`
