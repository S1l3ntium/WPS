# React Router Setup

## Overview
Приложение теперь использует React Router для управления маршрутизацией и поддержки истории браузера (back/forward кнопки работают корректно).

## Changes Made

### 1. Dependencies Added
- `react-router-dom@^7.11.0` - для маршрутизации

### 2. Files Created
- `src/app/routes.tsx` - определение всех маршрутов приложения

### 3. Files Modified

#### `src/main.tsx`
- Добавлен `BrowserRouter` wrapper вокруг App компонента
- Это позволяет использовать React Router hooks во всех компонентах

#### `src/app/App.tsx`
- Полностью переписан для использования `useRoutes` из React Router
- Вместо условной логики (if/else) на основе state, теперь используется декларативная маршрутизация

#### `src/app/components/Header.tsx`
- Добавлен `useNavigate` hook
- Все `onClick` handlers теперь используют `navigate()` вместо callback пропсов
- Удалены все `onNavigateTo*` пропсы из interface

#### `src/app/components/Footer.tsx`
- Добавлен `useNavigate` hook
- Удалены пропсы `onNavigateToPartners` и `onNavigateToMobileApp`
- Кнопки "Стать партнером" и "Скачать приложение" используют `navigate()`

#### Все Page компоненты (17 файлов)
- Добавлен `useNavigate` hook из React Router
- Удалены все `onNavigateTo*` props из interface и function signature
- Все навигационные callbacks заменены на `navigate()` вызовы
- EventPage и NewsPage теперь используют `useParams` для получения ID из URL
- Footer вызывается без пропсов (`<Footer />`)

### 4. Route Structure

```plaintext
/                          → HomePage
/partners                  → PartnersPage
/program                   → ProgramPage
/event/:eventId            → EventPage (получает eventId из URL)
/participants              → ParticipantsPage
/award                     → AwardPage
/grants-competition        → GrantsCompetitionPage
/leadership-competition    → LeadershipCompetitionPage
/press-center              → PressCenterPage
/news/:newsId              → NewsPage (получает newsId из URL)
/photo-gallery             → PhotoGalleryPage
/venue                     → VenuePage
/contacts                  → ContactsPage
/about                     → AboutPage
/mission                   → MissionPage
/org-committee             → OrgCommitteePage
/organizers                → OrganizersPage
/mobile-app                → MobileAppPage
```

## How It Works

1. **URL-based Navigation**: При клике на ссылку, URL меняется
2. **Back/Forward Buttons**: Работают с историей браузера
3. **Page Reload**: После перезагрузки страницы, приложение восстанавливает страницу по текущему URL
4. **Dynamic Routes**: EventPage и NewsPage получают ID из URL параметров

## Example Usage

```typescript
// В компонентах вместо:
onClick={onNavigateToPartners}

// Теперь используется:
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
onClick={() => navigate('/partners')}

// Для параметризованных маршрутов:
const { eventId } = useParams<{ eventId: string }>();
onClick={() => navigate(`/event/${eventId}`)}
```

## Testing

Build проходит успешно без ошибок:

```bash
npm run build
✓ built in 992ms
```

Dev сервер запущен успешно:

```plaintext
VITE v6.3.5  ready in 175 ms

➜  Local:   http://localhost:5174/
```

Все маршруты готовы к работе!
