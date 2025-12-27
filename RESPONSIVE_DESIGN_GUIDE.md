# Путеводитель по адаптивному дизайну - WPS Project

## Tailwind Breakpoints используемые в проекте

```
640px (sm:)  - Планшеты (горизонталь)
768px (md:)  - Планшеты (вертикаль) и маленькие ноутбуки
1024px (lg:) - Десктопы
1280px (xl:) - Большие десктопы
```

**Мобайл-первый подход:**
- Без префикса = мобильные устройства (< 640px)
- `sm:` = от 640px
- `md:` = от 768px
- `lg:` = от 1024px
- `xl:` = от 1280px

---

## Адаптивные шрифты

### Стандартный паттерн для заголовков:

```tailwind
// Большие заголовки (Hero, секции)
text-3xl sm:text-4xl md:text-5xl

// Средние заголовки (секции)
text-xl sm:text-2xl md:text-3xl lg:text-4xl

// Маленькие заголовки
text-sm md:text-base

// Основной текст
text-xs sm:text-sm

// Очень маленький текст (даты, инфо)
text-xs (без адаптации, достаточно маленький)
```

### Примеры в компонентах:

**HomePage.tsx - Hero:**
```tsx
<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
  Главный заголовок
</h1>
<p className='text-base sm:text-lg md:text-xl'>
  Описание секции
</p>
```

**Footer.tsx - Headings:**
```tsx
<h4 className='mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm font-semibold'>
  Название колонки
</h4>
```

---

## Адаптивный Padding

### Стандартный паттерн для секций:

```tailwind
px-4 sm:px-6 md:px-8 lg:px-8        // Горизонтальный padding
py-6 sm:py-8 md:py-12 md:py-16     // Вертикальный padding
```

### На разных размерах:
- 📱 Mobile (< 640px): `px-4 py-6` - компактно, экономит место
- 📱 Tablet (640px): `px-6 py-8` - средне
- 🖥️ Desktop (768px+): `px-8 py-12` - просторно

### Примеры:

**Header:**
```tsx
<div className='px-4 sm:px-6 lg:px-8 py-3'>
  Содержимое
</div>
```

**Footer:**
```tsx
<footer className='py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8'>
  Содержимое
</footer>
```

**HomePage sections:**
```tsx
<section className='px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-16 max-w-6xl mx-auto'>
  Содержимое
</section>
```

---

## Адаптивные размеры элементов

### Логотипы:
```tailwind
h-8 sm:h-10              // 32px на мобилях, 40px на планшетах+
// Ширина обычно auto
```

### Изображения в карточках:
```tailwind
h-36 sm:h-48 md:h-64     // Растет с размером экрана
w-full                    // Всегда на полную ширину контейнера
object-cover              // Заполняет без искажений
```

### Иконки:
```tailwind
w-4 h-4 sm:w-5 sm:h-5   // Маленькие иконки
w-5 h-5                  // Фиксированные (обычно ok)
w-6 h-6                  // Большие иконки
```

---

## Адаптивная сетка (Grid)

### Стандартные паттерны:

**2 колонки на мобилях, 4 на десктопе:**
```tailwind
grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8
```

**1 колонка на мобилях, 2 на планшетах, 4 на десктопе:**
```tailwind
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8
```

**1 колонка на мобилях, 2 на всех остальных:**
```tailwind
grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8
```

### Примеры в проекте:

**HomePage - Partners:**
```tailwind
grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8
```

**HomePage - Statistics:**
```tailwind
grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12
```

**Footer - Columns:**
```tailwind
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8
```

---

## Адаптивный Flexbox

### Стекание на мобилях:

```tailwind
// Стеклется в колонку на мобилях, в ряд на планшетах
flex-col lg:flex-row

// С адаптивными gaps
flex flex-col gap-3 sm:gap-4 lg:flex-row lg:gap-6
```

### Примеры:

**About section:**
```tsx
<div className='flex flex-col lg:flex-row gap-6 lg:gap-12 items-center'>
  <img className='w-full sm:w-72 lg:w-80' />
  <div className='flex-1'>...</div>
</div>
```

---

## Адаптивные кнопки

### Стандартный паттерн:

```tailwind
px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3
text-xs sm:text-sm font-medium
rounded-lg transition-colors
```

### По размерам:
- 📱 Mobile: px-4 py-2, text-xs - компактно
- 📱 Tablet: px-6 py-2.5, text-sm - нормально
- 🖥️ Desktop: px-8 py-3, text-sm - просторно

### Примеры:

**Footer buttons:**
```tsx
<button className='w-full px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3
                   text-xs sm:text-sm font-medium rounded-lg
                   hover:opacity-90 transition-opacity'>
  Текст
</button>
```

**Hero button:**
```tsx
<button className='px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4
                   text-sm sm:text-base font-medium rounded-lg'>
  Текст
</button>
```

---

## Адаптивные отступы между элементами

### Gap (между элементами в flex/grid):
```tailwind
gap-2 sm:gap-4 md:gap-6        // Растет с размером
gap-4 md:gap-8                 // Скачок от 16px к 32px
gap-1.5 sm:gap-2 md:gap-3      // Маленькие отступы
```

### Space-y (вертикальные отступы):
```tailwind
space-y-2 sm:space-y-3 md:space-y-4    // Между элементами в колонке
space-y-1.5 sm:space-y-2               // Маленькие отступы
```

### Margin-bottom (нижние отступы):
```tailwind
mb-2 sm:mb-3 md:mb-4           // После заголовков
mb-4 sm:mb-6 md:mb-8           // Большие разделения
mt-8 sm:mt-12 md:mt-16         // Верхние отступы перед секциями
```

---

## Слайдеры (React Slick)

### Адаптивная конфигурация:

```tsx
responsive={[
  {
    breakpoint: 1280,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
    },
  },
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
      arrows: true,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
    },
  },
  {
    breakpoint: 640,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      centerMode: false,
    },
  },
]}
```

### Карточки слайдера:
```tsx
// На мобилях: px-0 (без padding, во всю ширину)
// На планшетах: px-2 (небольшой padding)
// На десктопе: px-4 (полный padding)
<div className='px-0 sm:px-2 md:px-4'>
  <div className='bg-white rounded-lg'>
    <img className='h-36 sm:h-48 md:h-64 w-full object-cover' />
  </div>
</div>
```

---

## Что НЕ нужно адаптировать

❌ **Не адаптировать:**
- border-radius (одинаковый везде)
- colors (одинаковые везде)
- transition/animation (одинаковые везде)
- z-index (обычно фиксированный)
- shadow (тень обычно одна)

✅ **Адаптировать:**
- Font sizes (text-xs, text-sm, text-base, etc.)
- Padding/Margin (px-4, py-6, mx-auto, etc.)
- Gaps/Spaces (gap-4, space-y-2, etc.)
- Widths/Heights (w-72, h-64, max-w-6xl, etc.)
- Grid/Flex layout (grid-cols-1, flex-col, etc.)
- Display (hidden lg:block, etc.)

---

## Проверка адаптивности

### На девелопменте (Chrome DevTools):

1. Нажать F12 → DevTools
2. Ctrl+Shift+M (Cmd+Shift+M на Mac) → Device mode
3. Выбрать разные устройства и проверить:
   - ✅ Текст читаемый
   - ✅ Кнопки нажимаемы (min 44px высота)
   - ✅ Отступы достаточные
   - ✅ Нет горизонтального скролла
   - ✅ Изображения не растянуты
   - ✅ Нет переполнения контента

### Тестовые размеры:
- 375px (iPhone SE)
- 640px (iPad Mini)
- 768px (iPad)
- 1024px (iPad Pro)
- 1280px+ (Desktops)

---

## Чек-лист для новых компонентов

При создании нового компонента:

- [ ] Заголовки: `text-sm sm:text-base md:text-lg` или аналогичное
- [ ] Padding: `px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12`
- [ ] Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- [ ] Flexbox: `flex-col lg:flex-row` для стекания на мобилях
- [ ] Gaps: `gap-4 sm:gap-6 md:gap-8`
- [ ] Button: `px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3`
- [ ] Images: `w-full h-32 sm:h-40 md:h-48`
- [ ] No inline styles (использовать только классы)
- [ ] Нет hardcoded px значений
- [ ] Тестировано на 375px, 640px, 768px, 1280px

---

## Полезные Tailwind классы

```tailwind
// Контейнеры
max-w-4xl sm:max-w-5xl lg:max-w-6xl   // Ширина контента
mx-auto                                // Центрирование

// Отзывчивое отображение
hidden lg:block                        // Показать только на desktop
block md:hidden                        // Спрятать на планшетах+

// Пропорции
aspect-square                          // 1:1
aspect-video                           // 16:9

// Ellipsis и truncate
truncate                               // Одна строка, обрезать
line-clamp-2                           // Макс 2 строки
line-clamp-3                           // Макс 3 строки

// Для иконок в текстах
inline-flex items-center gap-2         // Иконка + текст в одной строке
```

---

**Последнее обновление:** 27 декабря 2025
**Версия:** 1.0
**Статус:** ✅ Все компоненты адаптивны
