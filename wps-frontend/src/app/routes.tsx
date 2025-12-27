import { RouteObject } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PartnersPage } from './components/PartnersPage';
import { ProgramPage } from './components/ProgramPage';
import { EventPage } from './components/EventPage';
import { ParticipantsPage } from './components/ParticipantsPage';
import { AwardPage } from './components/AwardPage';
import { AwardDetailPage } from './components/AwardDetailPage';
import { CompetitionPage } from './components/CompetitionPage';
import { PressCenterPage } from './components/PressCenterPage';
import { NewsPage } from './components/NewsPage';
import { PhotoGalleryPage } from './components/PhotoGalleryPage';
import { VenuePage } from './components/VenuePage';
import { ContactsPage } from './components/ContactsPage';
import { AboutPage } from './components/AboutPage';
import { MissionPage } from './components/MissionPage';
import { OrgCommitteePage } from './components/OrgCommitteePage';
import { OrganizersPage } from './components/OrganizersPage';
import { MobileAppPage } from './components/MobileAppPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ForbiddenPage } from './components/ForbiddenPage';

const nestedRoutes: RouteObject[] = [
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'partners',
    element: <PartnersPage />,
  },
  {
    path: 'program',
    element: <ProgramPage />,
  },
  {
    path: 'event/:eventId',
    element: <EventPage />,
  },
  {
    path: 'participants',
    element: <ParticipantsPage />,
  },
  {
    path: 'award',
    element: <AwardPage />,
  },
  {
    path: 'award/:id',
    element: <AwardDetailPage />,
  },
  {
    path: 'competition/:id',
    element: <CompetitionPage />,
  },
  {
    path: 'press-center',
    element: <PressCenterPage />,
  },
  {
    path: 'news/:newsId',
    element: <NewsPage />,
  },
  {
    path: 'photo-gallery',
    element: <PhotoGalleryPage />,
  },
  {
    path: 'venue',
    element: <VenuePage />,
  },
  {
    path: 'contacts',
    element: <ContactsPage />,
  },
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: 'mission',
    element: <MissionPage />,
  },
  {
    path: 'org-committee',
    element: <OrgCommitteePage />,
  },
  {
    path: 'organizers',
    element: <OrganizersPage />,
  },
  {
    path: 'mobile-app',
    element: <MobileAppPage />,
  },
  {
    path: '404',
    element: <NotFoundPage />,
  },
  {
    path: '403',
    element: <ForbiddenPage />,
  },
];

export const routes: RouteObject[] = [
  {
    path: '/:locale',
    children: nestedRoutes,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '/403',
    element: <ForbiddenPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
