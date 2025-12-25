# Language Selection Persistence Fix

**Date:** December 25, 2025
**Issue:** Language selection was resetting on page reload
**Status:** ✅ Fixed

## Problem Description

When users selected a language (Russian/English) and then refreshed the page (F5), the language would reset to Russian (default), even though they had explicitly chosen English.

## Root Causes

1. **Inconsistent localStorage key** - No dedicated constant for storage key
2. **No error handling** - localStorage access could fail silently in some contexts
3. **Missing fallbacks** - No browser language detection or graceful degradation
4. **Race condition** - Language selection not always saved when derived from URL

## Solution Implemented

### File Modified
- `wps-frontend/src/context/LocaleContext.tsx`

### Key Improvements

#### 1. Constants and Utilities
```typescript
const LOCALE_STORAGE_KEY = 'wps_locale';
const DEFAULT_LOCALE: Locale = 'ru';

const getStoredLocale = (): Locale | null => {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') return saved;
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
  return null;
};
```

#### 2. Priority-Based Initialization
Locale is determined with this priority:
1. **URL parameter** - `/en/` or `/ru/` in URL
2. **localStorage** - Previously saved selection
3. **Browser language** - `navigator.language`
4. **Default** - Russian if none of above available

#### 3. Safe localStorage Operations
All localStorage access is wrapped in try-catch to handle:
- Private/Incognito mode
- Storage quota exceeded
- Browser privacy settings

#### 4. Automatic Persistence
Language is saved to localStorage in 3 places:
- When initially derived from URL
- When changed via dropdown
- When browser language is detected

## How It Works

### On First Visit
```
1. Check URL for locale parameter
2. If not in URL, check localStorage
3. If not in localStorage, detect browser language
4. If all fail, use Russian (default)
5. Save detected/used locale to localStorage
```

### On Page Reload
```
1. React remounts, LocaleProvider runs
2. useParams gets locale from URL
3. If URL has locale, use it and save to localStorage
4. If no URL locale, retrieve from localStorage
5. Locale is restored without reset
```

### On Language Selection
```
1. User clicks language dropdown
2. setLocale() is called
3. Locale saved to localStorage
4. Navigation to new URL with locale: `/ru/path` or `/en/path`
5. useParams updates, component syncs
```

## Testing

### Verify Language Persistence
1. Visit `/ru/` and select English
2. Browser will navigate to `/en/`
3. Open DevTools: `localStorage.getItem('wps_locale')` → should be `'en'`
4. Press F5 (refresh)
5. Page should remain in English

### Edge Cases Handled
- ✅ Private/Incognito mode (localStorage unavailable)
- ✅ Browser language detection (English browser → starts in English)
- ✅ Direct URL navigation (`/en/` stays in English)
- ✅ Home page redirect to locale prefix

## Benefits

| Feature | Before | After |
|---------|--------|-------|
| Persist on reload | ❌ No | ✅ Yes |
| Private mode | ❌ Fails | ✅ Works (no persist) |
| Browser language | ❌ No | ✅ Auto-detected |
| Error handling | ❌ Silent fail | ✅ Graceful degradation |
| Code clarity | ⚠️ Magic strings | ✅ Named constants |

## Implementation Details

### Storage Key
- **Key:** `'wps_locale'`
- **Values:** `'ru'` or `'en'`
- **Scope:** Browser/domain local storage

### Error Handling
All operations include try-catch with warnings:
```
⚠️ localStorage not available
⚠️ Failed to save locale to localStorage
⚠️ Could not determine browser language
```

## Migration Note

Old localStorage key was `'locale'`. The fix uses `'wps_locale'` to avoid conflicts with other applications. Users will need to re-select their language once (automatically handled after first selection).

## Commit

```
c5601f7 Fix language selection persistence on page reload
```

---

**Related:** ETАП 8 - Localization fixes
**Impact:** Frontend - Better user experience with language selection
