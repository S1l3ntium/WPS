# Complete Localization Guide

## Problem Summary

The localization system has been implemented but has the following issues:

1. **Language switching doesn't update UI text** - Only API-based content changes
2. **URL doesn't include locale prefix** - Can't bookmark language preference
3. **Back button doesn't reload page** - Route changes but page doesn't re-render
4. **React error #31 on news page** - FIXED ✅

---

## Root Causes & Solutions

### Issue 1: Hardcoded Text Doesn't Change

**Root Cause:** Components have hardcoded Russian text that isn't connected to locale state.

**Solution:** Wrap all static text with locale checks using the `locale` variable from `useLocale()`.

**Implementation Pattern:**

```typescript
// ❌ BEFORE (hardcoded)
<h1>Программа Всемирной Общественной Ассамблеи</h1>

// ✅ AFTER (localized)
import { useLocale } from '../../context/LocaleContext';

export function SomePage() {
  const { locale } = useLocale();

  return (
    <h1>
      {locale === 'ru'
        ? 'Программа Всемирной Общественной Ассамблеи'
        : 'Program of the World Public Assembly'}
    </h1>
  );
}
```

**Files That Need Updates:**

```
ProgramPage.tsx
  - Hero title: "Программа Всемирной Общественной Ассамблеи"
  - Date filter buttons: "Все дни", "19.09.2025 (Пт)", etc.
  - Any section titles

EventPage.tsx
  - Section titles: "Цели сессии", "Формат", "Ключевые вопросы"
  - "Модераторы", "Эксперты сессии", "Спикеры", "Расписание и спикеры"

All other pages with hardcoded Russian text
```

---

### Issue 2: URL Doesn't Include Locale Prefix

**Current URLs:**
```
https://worldpublicsummit.test/news/1
https://worldpublicsummit.test/program
```

**Target URLs:**
```
https://worldpublicsummit.test/ru/news/1
https://worldpublicsummit.test/en/news/1
```

**Implementation Steps:**

1. **Update Routes in `src/app/routes.tsx`:**
```typescript
// Wrap all routes with locale prefix
{
  path: ':locale/*',
  element: <App />,
  children: [
    { path: 'news/:newsId', element: <NewsPage /> },
    { path: 'program', element: <ProgramPage /> },
    // ... rest of routes
  ]
}
```

2. **Update LocaleContext to read from URL:**
```typescript
// In src/context/LocaleContext.tsx
import { useParams } from 'react-router-dom';

export function LocaleProvider({ children }) {
  const { locale: urlLocale } = useParams();
  const [locale, setLocale] = useState<Locale>(
    (urlLocale as Locale) || 'ru'
  );

  // When locale changes, navigate to new URL
  const updateLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    navigate(`/${newLocale}${pathname}`);
  };
}
```

---

### Issue 3: Back Button Doesn't Reload Page

**Root Cause:** Components load data in `useEffect` but don't trigger when navigating with back button.

**Solution:** Monitor URL changes and re-fetch when route changes.

**Implementation Pattern:**

```typescript
export function NewsPage() {
  const { newsId } = useParams<{ newsId: string }>();
  const { locale, t } = useLocale();
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    const loadNews = async () => {
      // Load data
    };

    loadNews();
  }, [newsId, locale]); // ← Add newsId to dependencies!

  // This ensures re-fetch when newsId changes (from back button)
}
```

**For all pages:**
- Add route parameters to `useEffect` dependencies
- Example: `[newsId, locale, t]` instead of just `[locale, t]`

---

## Implementation Checklist

### Phase 1: Fix Hardcoded Text (HIGH PRIORITY)
- [ ] Update all occurrences of hardcoded Russian text in components
- [ ] Verify language switching works on every page
- [ ] Test in browser: switch language, see text change immediately

### Phase 2: Fix Back Button (HIGH PRIORITY)
- [ ] Add missing dependencies to all `useEffect` hooks
- [ ] Test back button navigation on news/event detail pages
- [ ] Verify page reloads with correct data

### Phase 3: Add URL Locale Prefix (MEDIUM PRIORITY)
- [ ] Update routes structure to include `:locale` prefix
- [ ] Update LocaleContext to read from URL
- [ ] Update navigation to include locale in path
- [ ] Update Header language selector to use `navigate()`

### Phase 4: Error Handling (LOW PRIORITY)
- [ ] Use dev build for debugging: `npm run dev`
- [ ] Check browser console (F12) for full error stack
- [ ] Add better error messages with context

---

## Testing Guide

### Test 1: Language Switching
```
1. Open: https://worldpublicsummit.test/news/1
2. Verify text is in Russian
3. Click language dropdown → "En"
4. ✅ PASS if: All text changes to English including title, buttons, breadcrumbs
❌ FAIL if: Only some text changes or nothing changes
```

### Test 2: Back Button
```
1. Go to https://worldpublicsummit.test/news/1
2. Click "Back to news list"
3. Click on another news item (e.g., /news/2)
4. Click browser back button
5. ✅ PASS if: Correctly shows news/1 with proper data
❌ FAIL if: URL changes but page shows wrong content or is blank
```

### Test 3: Hardcoded Text
```
1. Visit each page (Program, EventDetails, etc.)
2. Switch language
3. ✅ PASS if: ALL text changes (title, buttons, labels, section headers)
❌ FAIL if: Any text remains in Russian
```

---

## Code Examples

### Complete Page Template (with localization)

```typescript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';

export function ExamplePage() {
  const navigate = useNavigate();
  const { locale, t } = useLocale();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await api.getById(parseInt(id!));
        setData(result);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, locale]); // ← Include id in dependencies!

  if (loading) {
    return <div>{locale === 'ru' ? 'Загрузка...' : 'Loading...'}</div>;
  }

  return (
    <div>
      {/* Localized static text */}
      <h1>{locale === 'ru' ? 'Заголовок' : 'Title'}</h1>

      {/* Localized API content */}
      <p>{t(data.title)}</p>

      {/* Localized button */}
      <button onClick={() => navigate('/back')}>
        {locale === 'ru' ? 'Назад' : 'Back'}
      </button>
    </div>
  );
}
```

---

## Common Mistakes to Avoid

❌ **Don't:** Forget to add locale/id to useEffect dependencies
```typescript
useEffect(() => {
  loadData();
}, []); // ← Missing dependencies!
```

✅ **Do:** Include all relevant dependencies
```typescript
useEffect(() => {
  loadData();
}, [id, locale, t]); // ← All dependencies included
```

---

❌ **Don't:** Hardcode text without locale check
```typescript
return <h1>Программа</h1>;
```

✅ **Do:** Use locale for all static text
```typescript
return <h1>{locale === 'ru' ? 'Программа' : 'Program'}</h1>;
```

---

## Quick Reference

### Using the Locale

```typescript
import { useLocale } from '../../context/LocaleContext';

const { locale, t, setLocale } = useLocale();

// For API content with { ru: "...", en: "..." }
<p>{t(apiData.title)}</p>

// For hardcoded text
<p>{locale === 'ru' ? 'Russian text' : 'English text'}</p>

// Change language
<button onClick={() => setLocale('en')}>English</button>
```

### Common useEffect Pattern

```typescript
useEffect(() => {
  loadData();
}, [locale, t, paramId]); // Always include: locale, t, and route params
```

