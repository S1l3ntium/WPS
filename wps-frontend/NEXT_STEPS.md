# Localization - Next Steps

## Current Status

✅ **WORKING:**
- Language switching button in header (RU/EN)
- API content displays in selected language
- React error #31 is FIXED
- Locale context is set up globally

❌ **NEEDS WORK:**
1. Hardcoded Russian text doesn't change when language switches
2. Browser back button doesn't reload page properly
3. URL doesn't include locale prefix (/ru/ or /en/)

---

## Immediate Action Items

### 1. Test Current Setup (Right Now)

```bash
# Start dev server
npm run dev

# Test in browser
# https://worldpublicsummit.test:5173
```

**What to verify:**
- [ ] Language dropdown works (shows RU/EN)
- [ ] API content changes when language switches
- [ ] News page (/news/1) doesn't show error
- [ ] Check browser console (F12) for any errors

---

### 2. Quick Fix: Add Missing useEffect Dependencies

**File:** `src/app/components/ProgramPage.tsx` (line 57)

**Current:**
```typescript
}, [locale, t]);
```

**Issue:** This works for initial load, but the page won't update when coming from back button.

**Note:** Already has locale, t - should be fine. Check others.

---

### 3. Fix Hardcoded Text (Pick One Component)

**Example: ProgramPage hero title**

**Current (line 93-95):**
```typescript
<h1 className="text-4xl mb-4 text-[#1a1f4d]">
  {locale === 'ru' ? 'Программа' : 'Program'}<br />
  {locale === 'ru' ? 'Всемирной Общественной Ассамблеи' : 'of the World Public Assembly'}
</h1>
```

✅ Already fixed!

**Remaining in ProgramPage:**
- Line 152: "Все дни" → `{locale === 'ru' ? 'Все дни' : 'All Days'}`
- Line 162: "19.09.2025 (Пт)" → needs i18n
- Line 172: "20.09.2025 (Сб)" → needs i18n

**Search for hardcoded Russian text:**
```bash
grep -r "Программа\|Архтектура\|Все дни\|Цели\|Модераторы" src/app/components/
```

---

### 4. Test Language Switching

1. Open any page
2. Click language button (top-right: "RU")
3. Click "En"
4. **Expected:** Text changes to English
5. **If not:** Component has hardcoded text that needs fixing

---

## Three-Level Implementation Plan

### Level 1: Minimal (Works for API content only)
- ✅ Already done
- Language switching works for API-based text
- Static UI text stays in Russian
- No URL locale indicator

### Level 2: Good (Full localization)
- [ ] Add locale checks to all hardcoded text
- [ ] Fix back button by ensuring useEffect dependencies include route params
- [ ] Test all pages work with language switching
- **Estimated effort:** 2-3 hours

### Level 3: Professional (URL-based locale)
- [ ] Add `/ru/` and `/en/` URL prefixes
- [ ] Update all navigation to use locale-aware links
- [ ] Make locale bookmarkable
- **Estimated effort:** 4-5 hours

---

## Priority Fixes

### MUST FIX (Blocking users):
1. Hardcoded text in components
2. Back button behavior on detail pages

### SHOULD FIX (Better UX):
3. URL locale prefix for bookmarking

### NICE TO HAVE:
4. Better error messages
5. Locale persistence in localStorage

---

## Testing Commands

```bash
# Build production
npm run build

# Start dev server
npm run dev

# Check for hardcoded Russian text
grep -r "\"[А-Я]" src/app/components --include="*.tsx" | grep -v "locale === 'ru'" | head -20

# Find all locale usage
grep -r "useLocale\|locale ===" src/app/components --include="*.tsx" | wc -l
```

---

## File Reference

Key files for localization:

```
src/context/LocaleContext.tsx         ← Locale state management
src/main.tsx                           ← Provider wrapper
src/app/components/Header.tsx          ← Language selector (working ✅)
src/app/components/NewsPage.tsx        ← Content localization (fixed ✅)
src/app/components/PressCenterPage.tsx ← Works with locale ✅
src/app/components/ProgramPage.tsx     ← Needs hardcoded text fixes ⚠️
src/app/components/EventPage.tsx       ← Needs hardcoded text fixes ⚠️
src/app/components/ParticipantsPage.tsx ← Works with locale ✅
```

---

## Quick Wins

### Win 1: Update ProgramPage static text (15 min)
Replace all hardcoded Russian text with locale checks

### Win 2: Verify all useEffect dependencies (10 min)
Make sure route params are in dependencies array

### Win 3: Test in browser (10 min)
Switch language on each page and verify text changes

---

## Notes

- The locale context is working correctly
- Language switching is functional
- React error #31 is FIXED
- Main blocker is hardcoded Russian text in components
- Back button issue is likely due to missing dependencies in useEffect

---

## Questions to Answer

1. Should we implement URL locale prefix? (Better for SEO, bookmarking)
2. Should we save user's language preference to localStorage?
3. Should we add more languages beyond RU/EN?
4. Should we translate navigation menu items or keep them in Russian?

