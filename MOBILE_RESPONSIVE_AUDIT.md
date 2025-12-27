# Аудит мобильной адаптивности

**Дата:** 27 декабря 2025
**Статус:** ⚠️ ТРЕБУЕТСЯ ИСПРАВЛЕНИЕ

---

## Выявленные проблемы

### 1. Hero Section (HomePage)
**Файл:** `src/app/components/HomePage.tsx` (строки 173-183)

**Проблемы:**
- ❌ `<h1 className='text-5xl'>` - 48px на всех экранах
- ❌ `<h2 className='text-4xl'>` - 36px на всех экранах  
- ❌ `<p className='text-xl'>` - 20px на всех экранах
- ❌ Кнопки `px-8 py-4` - слишком большие на мобилке

**Решение:**
```typescript
// Вместо:
<h1 className='text-5xl mb-4'>

// Написать:
<h1 className='text-3xl sm:text-4xl md:text-5xl mb-4'>
```

### 2. About Section
- ❌ `<img className='w-80'>` - фиксированная ширина 320px
- На мобилке 375px: изображение займет 85% экрана

**Решение:**
```typescript
className='w-full sm:w-80 h-auto'
```

### 3. Statistics Section
- ❌ `text-6xl` (60px) - слишком большой для мобилки
- ❌ `gap-12` - слишком большой gap на мобилке

### 4. Padding/Margins
- ❌ `px-8 py-16` - слишком много места на мобилке
- Должно быть: `px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16`

---

## Рекомендуемые Responsive Шрифты

| Использование | Mobile | Tablet | Desktop |
|---|---|---|---|
| h1 (Hero) | `text-3xl` | `text-4xl` | `text-5xl` |
| h2 (Sections) | `text-2xl` | `text-3xl` | `text-4xl` |
| h3 (Cards) | `text-lg` | `text-xl` | `text-2xl` |
| p (Описание) | `text-base` | `text-lg` | `text-xl` |

---

## Чеклист исправлений HomePage.tsx

- [ ] Hero title: `text-3xl sm:text-4xl md:text-5xl`
- [ ] Hero subtitle: `text-2xl sm:text-3xl md:text-4xl`
- [ ] Hero buttons: `px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4`
- [ ] About image: `w-full sm:w-80`
- [ ] About layout: `flex-col lg:flex-row`
- [ ] Section headings: `text-2xl sm:text-3xl md:text-4xl`
- [ ] Statistics numbers: `text-4xl sm:text-5xl md:text-6xl`
- [ ] Statistics grid: `gap-6 sm:gap-8 md:gap-12`
- [ ] Section padding: `px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16`

---

## Инструменты тестирования

1. Chrome DevTools: F12 → Toggle device toolbar (Ctrl+Shift+M)
2. Тестировать на: 375px (iPhone), 768px (iPad), 1280px+ (Desktop)

---

**Время на исправление:** ~2-3 часа  
**Сложность:** Средняя
