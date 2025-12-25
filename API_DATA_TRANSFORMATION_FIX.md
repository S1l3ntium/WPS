# API Data Transformation Fix - Localized Fields

**Date:** December 25, 2025 (Follow-up to Infinite Requests Fix)
**Issue:** "Failed to fetch publications: TypeError: l.split is not a function"
**Status:** ✅ **FIXED**
**Commit:** `5458340`

---

## Problem

After fixing the infinite API requests issue, a new error appeared in the browser console:

```
Failed to fetch publications: TypeError: l.split is not a function
at Bh (index-yJLbziYg.js:51:82702)
```

This error occurred when trying to display publications on the Press Center page.

### Root Cause

Components were trying to pass **localized API objects** to the `t()` function:

```typescript
// API returns:
{
  id: 8,
  title: { ru: "Открытие...", en: "Opening..." },
  excerpt: { ru: "На Чемпионат...", en: "The Sambo..." }
}

// Component code (WRONG):
const transformedNews = response.data.map((item: any) => ({
  title: t(item.title || ''),  // ❌ Passing object to t()
  excerpt: t(item.excerpt || '')  // ❌ Passing object to t()
}));
```

**Problem:**
- `t()` is for translation KEYS like `"pressCenterPage.title"`
- `t()` tries to call `.split('.')` on the key to navigate translation tree
- But it received an **object** `{ ru: "...", en: "..." }`
- Calling `.split()` on object causes: **"split is not a function"**

---

## Solution

Use the `getLocalized()` utility function from the API service:

```typescript
import { getLocalized } from '../../services/api';

const transformedNews = response.data.map((item: any) => ({
  title: getLocalized(item.title, locale as 'ru' | 'en'),  // ✅ Correct
  excerpt: getLocalized(item.excerpt, locale as 'ru' | 'en')  // ✅ Correct
}));
```

### How getLocalized Works

```typescript
/**
 * Get localized text (English by default, falls back to Russian)
 */
export const getLocalized = (
  data: { ru?: string; en?: string } | string,
  locale: 'ru' | 'en' = 'en'
): string => {
  if (typeof data === 'string') return data;  // Already a string
  if (!data) return '';  // Null/undefined
  return data[locale] || data['en'] || data['ru'] || '';  // Return correct language
};
```

**Behavior:**
- Input: `{ ru: "Открытие...", en: "Opening..." }` and `locale: 'ru'`
- Output: `"Открытие..."`
- Falls back to English if locale version unavailable
- Falls back to Russian if neither English nor locale available

---

## Files Fixed

### 1. PressCenterPage.tsx

**Before:**
```typescript
import { newsAPI } from '../../services/api';

const { t } = useTranslation();

title: t(item.title || ''),
excerpt: t(item.excerpt || '')
```

**After:**
```typescript
import { newsAPI, getLocalized } from '../../services/api';

const { t, locale } = useTranslation();

title: getLocalized(item.title, locale as 'ru' | 'en'),
excerpt: getLocalized(item.excerpt, locale as 'ru' | 'en')
```

### 2. ProgramPage.tsx

**Before:**
```typescript
import { eventsAPI } from '../../services/api';

const { t } = useTranslation();

title: t(apiEvent.title || ''),
description: t(apiEvent.description || ''),
location: t(apiEvent.location || '')
```

**After:**
```typescript
import { eventsAPI, getLocalized } from '../../services/api';

const { t, locale } = useTranslation();

title: getLocalized(apiEvent.title, locale as 'ru' | 'en'),
description: getLocalized(apiEvent.description, locale as 'ru' | 'en'),
location: getLocalized(apiEvent.location, locale as 'ru' | 'en')
```

### 3. ParticipantsPage.tsx

**Before:**
```typescript
import { hotelsAPI } from '../../services/api';

const { t } = useTranslation();

name: t(hotel.name || ''),
address: t(hotel.address || ''),
metro: t(hotel.metro || '')
```

**After:**
```typescript
import { hotelsAPI, getLocalized } from '../../services/api';

const { t, locale } = useTranslation();

name: getLocalized(hotel.name, locale as 'ru' | 'en'),
address: getLocalized(hotel.address, locale as 'ru' | 'en'),
metro: getLocalized(hotel.metro, locale as 'ru' | 'en')
```

---

## Understanding the Difference

### Two Types of API Data

**1. Localized Data Objects** (from API)
```typescript
{
  title: { ru: string, en: string },
  description: { ru: string, en: string }
}
```
**How to access:** `getLocalized(data.title, locale)`

**2. Translation Keys** (for UI strings)
```typescript
"pressCenterPage.breadcrumbHome"
"pressCenterPage.loading"
"pressCenterPage.readMore"
```
**How to access:** `t('pressCenterPage.breadcrumbHome')`

### Correct Usage Pattern

```typescript
// From API - localized content
const title = getLocalized(apiData.title, locale);      // ✅ Use getLocalized

// UI labels - translation keys
const label = t('pressCenterPage.readMore');             // ✅ Use t()

// Mix them together for complete component
<h1>{title}</h1>
<button>{label}</button>
```

---

## Verification

### Before Fix
```
Console Error: Failed to fetch publications: TypeError: l.split is not a function
Result: Pages don't display any content
```

### After Fix
```
Network: GET /api/news → 200 OK (proper pagination)
Console: No errors
Result: Pages display content correctly with localization
```

### API Response Structure
```json
{
  "data": [
    {
      "id": 8,
      "title": { "ru": "...", "en": "..." },
      "excerpt": { "ru": "...", "en": "..." },
      "date": "25.12.2025"
    }
  ],
  "pagination": {...}
}
```

---

## Key Takeaway

**Always understand your API response structure before transforming data:**

```typescript
// WRONG - assuming string
const title = t(item.title);

// RIGHT - using correct function for the data type
const title = getLocalized(item.title, locale);
```

When in doubt:
1. `console.log(item)` to see actual structure
2. Check API type definitions (`NewsData`, `EventData`, etc.)
3. Use appropriate function: `t()` for keys, `getLocalized()` for localized objects

---

## Related Documentation

- **INFINITE_REQUESTS_ROOT_CAUSE_ANALYSIS.md** - Previous API issues
- **API_REQUESTS_VERIFICATION.md** - API testing guide
- **wps-frontend/src/services/api.ts** - API type definitions and utilities

---

**Status:** 🟢 **FIXED AND VERIFIED**

All pages now correctly display localized content from the API without errors.

