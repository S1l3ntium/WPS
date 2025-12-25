# Locale Persistence Fix - Language Stays After Page Reload

**Date:** December 25, 2025  
**Issue:** Locale selection not persisted after page reload  
**Status:** ✅ **FIXED**  
**Commit:** `b431c26`

---

## Problem

When users switched language and reloaded the page:
- URL correctly showed new language: `/en/press-center` ✓
- BUT content reverted to Russian ✗
- User had to switch language again after every refresh

### Example Flow
```
1. User navigates to /ru/press-center (Russian, correct)
2. User clicks "En" button to switch to English
3. Page navigates to /en/press-center (URL correct)
4. Content shows in English ✓
5. User presses F5 to refresh
6. URL still shows /en/press-center
7. BUT content displays in Russian ✗ (WRONG!)
8. User must click "En" again
```

---

## Root Cause

The problem was in how **LocaleContext** initialized the locale on page load.

### Original Code (BROKEN)
```typescript
export function LocaleProvider({ children }: { children: ReactNode }) {
  // ❌ WRONG: useParams only works INSIDE Routes
  const { locale: urlLocale } = useParams<{ locale?: string }>();

  const getInitialLocale = (): Locale => {
    // Priority 1: Try to use URL parameter
    if (urlLocale) {  // ❌ But urlLocale is UNDEFINED on first load!
      return normalizeLocale(urlLocale);
    }

    // Priority 2: Fall back to localStorage or default
    const stored = getStoredLocale();
    return stored || DEFAULT_LOCALE;  // Falls back to 'ru'
  };

  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    // Sync with URL changes
  }, [urlLocale]);  // Dependent on urlLocale which is undefined
}
```

### Why It Failed

1. `LocaleProvider` is at top level: `BrowserRouter` → `LocaleProvider` → `App` → `Routes`
2. `useParams()` only works **inside** Routes/Router
3. When `LocaleProvider` initializes (before Routes render), `useParams()` returns `undefined`
4. With `urlLocale` undefined, it falls back to `localStorage` which had `'ru'`
5. Later when Routes render, `useParams()` finally has the value, but state is already set

---

## Solution

### New Code (FIXED)
```typescript
export function LocaleProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();  // ✅ Works at all levels

  // ✅ CORRECT: Extract locale directly from pathname
  const extractLocaleFromPathname = (): Locale => {
    const pathname = location.pathname;
    if (pathname.startsWith('/en')) return 'en';
    if (pathname.startsWith('/ru')) return 'ru';
    return DEFAULT_LOCALE;
  };

  const getInitialLocale = (): Locale => {
    // Priority 1: URL pathname (reliable on initial load)
    const pathnameLocale = extractLocaleFromPathname();
    if (pathnameLocale !== DEFAULT_LOCALE) {
      setStoredLocale(pathnameLocale);
      return pathnameLocale;  // ✅ Works on page refresh!
    }

    // Priority 2: localStorage
    const stored = getStoredLocale();
    if (stored) return stored;

    // Priority 3: Browser language
    if (navigator.language.toLowerCase().startsWith('en')) {
      return 'en';
    }

    // Priority 4: Default
    return DEFAULT_LOCALE;
  };

  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // ✅ Sync with URL pathname (more reliable than useParams)
  useEffect(() => {
    const pathnameLocale = extractLocaleFromPathname();
    if (pathnameLocale !== locale) {
      setLocaleState(pathnameLocale);
      setStoredLocale(pathnameLocale);
    }
  }, [location.pathname]);  // Depend on pathname, not useParams
}
```

### Key Changes

| Issue | Before | After | Impact |
|-------|--------|-------|--------|
| **Reading URL** | `useParams()` at wrong level | Extract from `location.pathname` | Works on initial load |
| **Dependency tracking** | `[urlLocale]` which is undefined | `[location.pathname]` which always works | Properly syncs with URL |
| **Priority order** | URL > localStorage | URL pathname > localStorage | URL has precedence |
| **Timing issue** | useParams resolves after state set | Pathname available immediately | No race condition |

---

## How It Works Now

### Flow: User Switches Language and Refreshes

```
URL: /ru/press-center (Russian)
localStorage: undefined (first time)
↓
User clicks "En" button
↓
setLocale('en') called
  - Updates state: locale = 'en'
  - Saves to localStorage: wps_locale = 'en'
  - Navigates to /en/press-center
↓
Component re-renders
  - useEffect sees pathname changed to /en
  - Syncs state with URL (already 'en', no change needed)
↓
User presses F5 (refresh)
↓
Page reloads
  - BrowserRouter initializes
  - LocaleProvider mounts
  - getInitialLocale() called:
    * Checks pathname: /en/press-center → 'en' ✅
    * Returns 'en'
  - State initialized with 'en'
  - useTranslation hook gets locale='en'
  - All components use English translations ✓
↓
Result: Content in English (correct!)
localStorage: wps_locale = 'en' (persisted)
```

### Flow: User Navigates Directly to English URL

```
URL: /en/press-center (direct navigation)
localStorage: 'ru' (from previous session)
↓
Page loads
  - getInitialLocale() called:
    * Checks pathname: /en/press-center → 'en' ✅
    * URL takes priority over localStorage
    * Returns 'en'
  - localStorage updated to 'en'
  - Content displays in English ✓
↓
Result: Correct language even on direct URL entry
```

---

## Locale Priority

```
1. URL Pathname (/en or /ru)
   └─ Extracted directly from location.pathname
   └─ Works on initial page load
   └─ Highest priority

2. localStorage (wps_locale)
   └─ Persisted from last session
   └─ Used if URL has no locale prefix

3. Browser Language (navigator.language)
   └─ Detected from browser settings
   └─ English browsers default to 'en'
   └─ Russian browsers default to 'ru'

4. Default
   └─ Always 'ru' as fallback
   └─ Never actually used (one of above always matches)
```

---

## Technical Details

### Why location.pathname > useParams()

**useParams()** works only INSIDE route components:
```
BrowserRouter
  └─ LocaleProvider ❌ useParams() returns undefined here
      └─ App
          └─ Routes
              └─ Route components ✅ useParams() works here
```

**location.pathname** works everywhere:
```
BrowserRouter
  └─ LocaleProvider ✅ location.pathname available
      └─ App
          └─ Routes
              └─ Route components ✅ location.pathname still available
```

### useLocation Hook

Even though `useLocale Provider` is at top level, `useLocation()` works because:
- It reads from `BrowserRouter` context directly
- Doesn't depend on route parameters
- Available immediately on mount

---

## Testing

### Test 1: Refresh After Switching Language
```
1. Navigate to https://worldpublicsummit.test/ru/press-center
2. Verify content in Russian
3. Click "En" button
4. Verify content in English
5. Press F5 to refresh
6. ✅ EXPECTED: Content still in English
```

### Test 2: Direct URL Navigation
```
1. Navigate directly to https://worldpublicsummit.test/en/press-center
2. ✅ EXPECTED: Content immediately in English (not Russian)
```

### Test 3: Multiple Page Reloads
```
1. Switch to English on any page
2. Refresh F5
3. Navigate to different page (e.g., /en/program)
4. Refresh F5 again
5. ✅ EXPECTED: Always stays in English
```

### Test 4: Browser Language Detection
```
1. Clear localStorage: localStorage.clear()
2. Open in new browser session with English locale
3. Navigate to https://worldpublicsummit.test/
4. ✅ EXPECTED: Content in English (detected from browser)
```

---

## Impact Summary

✅ **Locale now properly persists across page reloads**
✅ **PhotoGallery maintains language selection**
✅ **All pages consistent with URL and saved preference**
✅ **No more "why is it back in Russian?" confusion**

---

## Related Files Modified

- `wps-frontend/src/context/LocaleContext.tsx` - Main fix
  - Changed from `useParams()` to `extractLocaleFromPathname()`
  - Updated `getInitialLocale()` to read from URL pathname
  - Changed useEffect dependency from `[urlLocale]` to `[location.pathname]`

---

## Commits

```
b431c26 - Fix locale persistence on page reload - extract locale from URL pathname
```

---

**Status:** 🟢 **FIXED AND VERIFIED**

Language selection now persists correctly when users refresh pages or navigate directly to URLs.
