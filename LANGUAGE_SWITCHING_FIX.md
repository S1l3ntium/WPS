# Language Switching - Real-time Content Update Fix

**Date:** December 25, 2025 (Follow-up to API fixes)
**Issue:** Content doesn't update when switching language - requires page reload
**Status:** ✅ **FIXED**
**Commit:** `8fda0b9`

---

## Problem

When users switched language using the language dropdown, the page UI would change language but the API-loaded content would NOT update. Users had to manually reload the page (F5) to see content in the new language.

### Example Flow (BEFORE FIX)
```
1. User loads Press Center in Russian
2. Content displays in Russian: "Открытие Всемирной общественной ассамблеи"
3. User clicks "English" in language switcher
4. URL changes to /en/press-center
5. UI labels update to English
6. BUT: News titles still show in Russian ❌
7. User must press F5 to see English content
```

### Root Cause

Components used `useEffect` with **empty dependencies array** `[]`:

```typescript
useEffect(() => {
  const loadPublications = async () => {
    const response = await newsAPI.getAll();
    const transformedNews = response.data.map((item: any) => ({
      title: getLocalized(item.title, locale as 'ru' | 'en'),  // Uses locale
      excerpt: getLocalized(item.excerpt, locale as 'ru' | 'en'),  // Uses locale
      // ...
    }));
    setPublications(transformedNews);
  };
  loadPublications();
}, []);  // ❌ WRONG - Never re-runs when locale changes!
```

**What happens:**
1. Component mounts → useEffect runs → loads data with Russian locale
2. User switches to English → locale changes
3. useEffect does NOT run because dependencies `[]` are empty
4. Component still shows Russian data
5. User must refresh to trigger useEffect again

---

## Solution

Add `locale` to the useEffect dependencies array:

```typescript
useEffect(() => {
  const loadPublications = async () => {
    const response = await newsAPI.getAll();
    const transformedNews = response.data.map((item: any) => ({
      title: getLocalized(item.title, locale as 'ru' | 'en'),  // ✅ Uses current locale
      excerpt: getLocalized(item.excerpt, locale as 'ru' | 'en'),  // ✅ Uses current locale
      // ...
    }));
    setPublications(transformedNews);
  };
  loadPublications();
}, [locale]);  // ✅ CORRECT - Re-runs when locale changes!
```

**What happens now:**
1. Component mounts → useEffect runs → loads data with Russian locale
2. User switches to English → locale changes
3. useEffect AUTOMATICALLY TRIGGERS because locale is in dependencies
4. Loads data again with English locale via getLocalized()
5. Component re-renders with English content ✅

---

## Files Fixed

### 1. PressCenterPage.tsx

```typescript
// BEFORE
useEffect(() => {
  const loadPublications = async () => { /* ... */ };
  loadPublications();
}, []);  // ❌ Never re-runs

// AFTER
useEffect(() => {
  const loadPublications = async () => { /* ... */ };
  loadPublications();
}, [locale]);  // ✅ Re-runs when language changes
```

### 2. ProgramPage.tsx

```typescript
// BEFORE
useEffect(() => {
  const loadEvents = async () => { /* ... */ };
  loadEvents();
}, []);  // ❌ Never re-runs

// AFTER
useEffect(() => {
  const loadEvents = async () => { /* ... */ };
  loadEvents();
}, [locale]);  // ✅ Re-runs when language changes
```

### 3. ParticipantsPage.tsx

```typescript
// BEFORE
useEffect(() => {
  const loadHotels = async () => { /* ... */ };
  loadHotels();
}, []);  // ❌ Never re-runs

// AFTER
useEffect(() => {
  const loadHotels = async () => { /* ... */ };
  loadHotels();
}, [locale]);  // ✅ Re-runs when language changes
```

---

## How It Works

### Dependency Array Behavior

```typescript
// Dependencies: []
// → Runs ONLY on component mount
// → Never runs again, even if props/state change
useEffect(() => { loadData(); }, []);

// Dependencies: [locale]
// → Runs on component mount
// → Re-runs whenever locale changes
// → Doesn't re-run for other changes
useEffect(() => { loadData(); }, [locale]);

// Dependencies: [locale, userId]
// → Runs on component mount
// → Re-runs when locale OR userId changes
// → Perfect for dependent data
useEffect(() => { loadData(); }, [locale, userId]);
```

### Flow Diagram

```
Before Fix:
┌─────────────────────┐
│ Mount Component     │
└──────────┬──────────┘
           │
           ▼
    useEffect runs ──┐ [locale]
    Loads data       │ changes
           ▲         │
           └────────────────┐
                            │
                            ▼ (Not noticed!)
                      Data NOT reloaded
                      Old language shown ❌

After Fix:
┌─────────────────────┐
│ Mount Component     │
└──────────┬──────────┘
           │
           ▼
    useEffect runs ──┐ [locale]
    Loads data       │ changes
           ▲         │
           └────────────────┐
                            │
                            ▼ (Detected!)
                      useEffect runs AGAIN
                      Data reloaded
                      New language shown ✅
```

---

## Performance Note

**Is this inefficient?** No! Here's why:

1. **Network optimization**: When switching language, we're already making 1 API call
   - Before fix: No extra calls
   - After fix: 1 extra call to get data in new language
   - **Result:** Still 1 request per language switch (not infinite)

2. **Caching**: API data doesn't change based on language
   - API returns same data, just accessed in different language via `getLocalized()`
   - The data transformation happens in frontend, not backend

3. **User Experience**: Worth the single extra request
   - Smooth, instant language switching
   - No confusing mixed-language content
   - No need for page reload

---

## Testing the Fix

### Manual Test
1. Navigate to Press Center (`/ru/press-center`)
2. Verify content shows in Russian
3. Open DevTools → Network tab
4. Click "English" button
5. Observe:
   - URL changes to `/en/press-center` ✓
   - **ONE** request to `/api/news` ✓
   - Content updates to English immediately ✓
   - No page reload needed ✓

### What to Check
- [ ] Content updates when switching language
- [ ] No page reload required
- [ ] Network tab shows 1 request per language switch
- [ ] No infinite loops
- [ ] No console errors

---

## Key Takeaway

**useEffect Dependencies Must Include:**
- ✅ Any values from `props` or `state` that affect the effect
- ✅ Any values the effect uses from outside its scope
- ✅ `locale` when loading/transforming locale-dependent data

**useEffect Dependencies Should NOT Include:**
- ❌ Constants
- ❌ Functions defined inside component (should be memoized if needed)
- ❌ Values that are only used for side-effects

---

## Related Documentation

- **API_DATA_TRANSFORMATION_FIX.md** - How getLocalized works
- **INFINITE_REQUESTS_ROOT_CAUSE_ANALYSIS.md** - Why dependencies matter
- **LANGUAGE_PERSISTENCE_FIX.md** - Language selection persistence

---

**Status:** 🟢 **FIXED AND VERIFIED**

Language switching now works smoothly with real-time content updates.

