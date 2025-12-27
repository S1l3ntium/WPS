# 🔧 Путеводитель по исправлению адаптивности всех Page компонентов

**Дата:** 27 декабря 2025
**Статус:** План исправления

---

## 📊 Общая статистика

| Метрика | Значение |
|---------|----------|
| Всего Page компонентов | 17 файлов |
| Средний рейтинг адаптивности | 5.7/10 |
| Файлы с 7/10 | 1 (MissionPage) |
| Файлы с 6/10 | 9 |
| Файлы с 5/10 | 7 |
| Файлы с идеальными паттернами | 4 (можно копировать) |

---

## 🎯 Критические проблемы (встречаются в 13-15 файлах)

### 1. FIXED PADDING (13-15 файлов)
**Проблема:** Все используют `px-8` или `px-6` без адаптивности

**НЕПРАВИЛЬНО:**
```tsx
<section className='px-8 py-16'>
```

**ПРАВИЛЬНО:**
```tsx
<section className='px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16'>
```

**Затронутые файлы:**
VenuePage, PhotoGallery, Partners, Event, About, Program, Contacts, Participants, PressCenter, GrantsCompetition, Award, LeadershipCompetition, NewsPage

---

### 2. NON-RESPONSIVE BUTTON PADDING (12 файлов)
**Проблема:** Кнопки имеют фиксированное `px-6 py-3` или `px-8 py-4`

**НЕПРАВИЛЬНО:**
```tsx
<button className='px-6 py-3 bg-blue'>Click</button>
```

**ПРАВИЛЬНО:**
```tsx
<button className='px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-xs sm:text-sm font-medium'>Click</button>
```

---

### 3. FIXED IMAGE HEIGHTS (10 файлов)
**Проблема:** Изображения используют `h-64`, `h-80` без адаптивности

**НЕПРАВИЛЬНО:**
```tsx
<img className='h-64 w-full object-cover' />
```

**ПРАВИЛЬНО:**
```tsx
<img className='h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover' />
```

---

### 4. NON-RESPONSIVE GRID GAPS (14 файлов)
**Проблема:** Grid gaps фиксированы: `gap-8`, `gap-12`, `gap-x-20`

**НЕПРАВИЛЬНО:**
```tsx
<div className='grid md:grid-cols-2 gap-8'>
```

**ПРАВИЛЬНО:**
```tsx
<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12'>
```

---

### 5. FIXED FONT SIZES (9 файлов)
**Проблема:** Заголовки не масштабируются: `text-5xl`, `text-4xl`

**НЕПРАВИЛЬНО:**
```tsx
<h1 className='text-5xl font-bold'>Title</h1>
```

**ПРАВИЛЬНО:**
```tsx
<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>Title</h1>
```

---

## 🟢 Хорошие примеры (можно копировать паттерны)

### ✅ MissionPage.tsx - Line 15
```tsx
<div className='py-16 px-4 sm:px-6 lg:px-8'>
```
✅ Идеальный паттерн для padding!

### ✅ OrganizersPage.tsx - Line 13
```tsx
<div className='px-4 sm:px-6 lg:px-8 py-16'>
```
✅ То же самое - используй этот паттерн везде!

### ✅ MobileAppPage.tsx - Line 12
```tsx
<div className='px-4 sm:px-6 lg:px-8 py-16'>
```
✅ Копируй этот паттерн!

### ✅ OrgCommitteePage.tsx - Line 96
```tsx
<div className='px-4 sm:px-6 lg:px-8 py-16'>
```
✅ Идеально!

---

## 📋 План исправления по приоритетам

### TIER 1: Критические изменения (влияют на все страницы)

**1. Замени все `px-8` на `px-4 sm:px-6 md:px-8 lg:px-12`**

Команда для быстрого поиска:
```bash
grep -r "px-8" src/app/components/ | grep "Page.tsx"
```

**2. Замени все `px-6` на `px-4 sm:px-6 md:px-8`**

**3. Замени `gap-8` на `gap-4 sm:gap-6 md:gap-8`**
**   Замени `gap-12` на `gap-6 sm:gap-8 md:gap-12`**

**4. Замени `py-16` на `py-8 sm:py-12 md:py-16`**

---

### TIER 2: Типография

**Для всех заголовков:**
- `text-5xl` → `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- `text-4xl` → `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- `text-3xl` → `text-lg sm:text-xl md:text-2xl lg:text-3xl`

**Для всех параграфов:**
- `text-base` → `text-xs sm:text-sm md:text-base` (если маленький текст)
- Обычно текст оставляется `text-sm` или `text-base` везде

---

### TIER 3: Компонент-специфичные исправления

#### PartnersPage.tsx
- Line 163: `w-[480px]` → `w-full max-w-sm md:max-w-md lg:max-w-2xl`
- Line 142: Hero `px-8 py-20` → `px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20`
- Line 146: `text-5xl` → `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`

#### ParticipantsPage.tsx
- Line 222: `text-4xl` → `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- Line 238, 266, 294: `h-64` → `h-40 sm:h-48 md:h-56 lg:h-64`
- Line 235: `md:grid-cols-2` → `grid-cols-1 md:grid-cols-2`

#### EventPage.tsx
- Line 353: Left sidebar `w-[45%]` → `w-full md:w-[30%] lg:w-[25%]`
- Line 334: Speaker cards `grid-cols-[120px_1fr]` → `grid-cols-1 md:grid-cols-[120px_1fr]`

#### LeadershipCompetitionPage.tsx
- Line 339: `w-72 h-48` → `w-full sm:w-80 md:w-96 h-32 sm:h-40 md:h-48`
- Line 236: `grid-cols-5` → `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`

#### About/Award/VenuePages:
- Заменить все `px-8` на стандартный паттерн
- Заменить все `gap-*` на responsive варианты
- Заменить fixed высоты изображений на responsive

---

## 🔍 Как найти проблемные строки быстро

### Поиск в VS Code:

**Найти все `px-8` (не в buttons, где это правильно):**
```
regex: className='[^']*px-8[^']*'
```

**Найти все `text-5xl` без вариантов:**
```
regex: className='[^']*text-5xl[^']*'(?!.*sm:text)
```

**Найти все `gap-` без `sm:` или `md:`:**
```
regex: gap-\d+(?!.*sm:)
```

---

## 📝 Шаблон для быстрого исправления

### Для PADDING в главной секции:
```tsx
// ДО
<section className='px-8 py-16'>

// ПОСЛЕ
<section className='px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16'>
```

### Для КНОПОК:
```tsx
// ДО
<button className='px-6 py-3'>Button</button>

// ПОСЛЕ
<button className='px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 text-xs sm:text-sm font-medium'>Button</button>
```

### Для GRID LAYOUTS:
```tsx
// ДО
<div className='grid md:grid-cols-2 gap-8'>

// ПОСЛЕ
<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
```

### Для IMAGES:
```tsx
// ДО
<img className='h-64 w-full object-cover' />

// ПОСЛЕ
<img className='h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover' />
```

### Для HEADINGS:
```tsx
// ДО
<h1 className='text-5xl font-bold'>Title</h1>

// ПОСЛЕ
<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>Title</h1>
```

---

## 📂 Порядок исправления файлов (по приоритету)

### Группа 1 - Критические (исправить в первую очередь)
1. **VenuePage.tsx** (5/10) - фиксированный padding везде
2. **PartnersPage.tsx** (5/10) - фиксированные изображения и текст
3. **AboutPage.tsx** (4/10) - самый плохой рейтинг
4. **AwardPage.tsx** (5/10) - фиксированный padding и текст

### Группа 2 - Средний приоритет
5. **EventPage.tsx** (6/10) - боковая панель фиксирована
6. **ParticipantsPage.tsx** (5/10) - image heights фиксированы
7. **GrantsCompetitionPage.tsx** (6/10) - логотипы фиксированы
8. **LeadershipCompetitionPage.tsx** (5/10) - grid-cols-5 на мобилях

### Группа 3 - Уже хорошие
9. **ProgramPage.tsx** (6/10)
10. **PhotoGalleryPage.tsx** (6/10)
11. **ContactsPage.tsx** (5/10)
12. **PressCenterPage.tsx** (6/10)
13. **NewsPage.tsx** (6/10)
14. **MobileAppPage.tsx** (6/10) ✅
15. **OrganizersPage.tsx** (6/10) ✅
16. **OrgCommitteePage.tsx** (6/10) ✅
17. **MissionPage.tsx** (7/10) ✅

---

## ✅ Чек-лист для каждого файла

При исправлении каждого файла проверь:

- [ ] Все `px-8` или `px-6` заменены на `px-4 sm:px-6 md:px-8`
- [ ] Все `gap-*` заменены на `gap-X sm:gap-Y md:gap-Z`
- [ ] Все `py-16` или `py-20` заменены на responsive версии
- [ ] Все `text-5xl`, `text-4xl` заменены на responsive
- [ ] Все фиксированные высоты изображений заменены на responsive
- [ ] Все фиксированные ширины изображений заменены на responsive (или max-w-*)
- [ ] Все кнопки имеют responsive padding
- [ ] Grid layouts имеют `grid-cols-1` для мобилей
- [ ] Нет inline styles (style={{ }})
- [ ] Build проходит без ошибок

---

## 🚀 После исправления

1. **Build проект:**
```bash
cd /Volumes/ADATA\ LEGEND\ 900/Work/WPS/wps-frontend
npm run build
```

2. **Проверь в браузере:**
- DevTools → Device mode
- Размеры: 375px, 640px, 768px, 1024px, 1280px
- Проверь: шрифты, padding, gap, button sizes

3. **Результат:**
- Все 17 файлов должны быть минимум 7/10
- Не должно быть горизонтального скролла на мобилях
- Кнопки должны быть нажимаемы (минимум 44px)
- Текст должен быть читаемым

---

**Эта таблица поможет систематически исправить все проблемы!**
