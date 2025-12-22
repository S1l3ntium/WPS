# WPS Backend Migration to API-First Architecture

## Overview

The WPS backend has been successfully migrated from a server-side rendered application to an **API-first architecture** designed to work seamlessly with the React frontend (wps-frontend).

### Key Changes

- **Architecture**: Migrated from Laravel MVC with Blade templates to a pure REST API
- **Frontend**: Now serves as a separate SPA (Single Page Application)
- **Admin Panel**: MoonShine admin panel preserved and fully functional
- **Data Format**: All responses are JSON with consistent structure
- **Multilingual**: Full support for Russian (ru) and English (en) languages

---

## What Was Changed

### 1. Models Updated

All models were redesigned to match frontend requirements:

- **Event** - Now includes relationships with EventPerson (moderators, experts, speakers) and EventScheduleItem
- **News** - Added `type` and `lead` fields for better content structure
- **Partner** - Simplified, removed description field (for main partners)
- **PartnerPackage** - New model for partnership packages (separate from Partners)
- **Hotel** - New model for accommodation listings
- **CommitteeMember** - New model for organizing committee
- **Competition** - New model for competitions (grants, leadership)
- **CompetitionFaq** - New model for competition FAQs

### 2. New Models Created

```
├── EventPerson (event_people table)
├── EventScheduleItem (event_schedule_items table)
├── Hotel (hotels table)
├── PartnerPackage (partner_packages table)
├── CommitteeMember (committee_members table)
├── Competition (competitions table)
└── CompetitionFaq (competition_faq table)
```

### 3. API Controllers

Complete REST API controllers created:
- `EventController` - Events management
- `NewsController` - Publications management
- `PartnerController` - Partners management
- `PartnerPackageController` - Partnership packages
- `HotelController` - Hotels/accommodations
- `CommitteeMemberController` - Committee members
- `CompetitionController` - Competitions with FAQ
- `AwardController` - Awards management

### 4. Resource Classes (JSON Transformers)

Resource classes format database models into JSON:
- `EventResource` / `EventDetailResource`
- `NewsResource` / `NewsDetailResource`
- `PartnerResource`
- `PartnerPackageResource`
- `HotelResource`
- `CommitteeMemberResource`
- `CompetitionResource` / `CompetitionDetailResource`
- `CompetitionFaqResource`
- `AwardResource`

### 5. Routes

**Old structure (removed):**
```
GET  /  (home page)
GET  /{locale}/about  (about page)
GET  /{locale}/program  (event listing)
GET  /{locale}/program/{event}  (event details)
GET  /{locale}/news  (news listing)
... and many more Blade routes
```

**New structure (API-only):**
```
GET    /api/events                    (list events)
GET    /api/events/{id}               (event details)
GET    /api/news                      (list news)
GET    /api/news/{id}                 (news details)
GET    /api/partners                  (list partners)
GET    /api/partner-packages          (list packages)
GET    /api/hotels                    (list hotels)
GET    /api/committee-members         (list committee)
GET    /api/competitions              (list competitions)
GET    /api/awards                    (list awards)
... POST, PUT, DELETE endpoints for admin
```

### 6. Blade Templates

**Status**: Archived but not deleted (preserved in git history)

The following template directory is no longer used:
- `resources/views/` - All web templates

To clean up (optional):
```bash
rm -rf resources/views/
rm -rf resources/css/
rm -rf resources/js/
```

### 7. CORS Configuration

CORS middleware added to allow requests from frontend development servers:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

Update for production:
```env
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## Database

### Migrations

All migrations have been run successfully:

```bash
php artisan migrate
```

New tables created:
- `event_people` - Event participants (moderators, experts, speakers)
- `event_schedule_items` - Detailed event schedule
- `hotels` - Hotel listings
- `partner_packages` - Partnership packages
- `committee_members` - Organizing committee
- `competitions` - Competition details
- `competition_faq` - Competition FAQs

### Sample Data

Test data is available via seeders:

```bash
php artisan db:seed
# or
php artisan migrate:refresh --seed
```

Sample data includes:
- 2 events with full details
- 2 news articles
- 3 partners
- Admin user (see AdminUserSeeder for credentials)

---

## API Usage

### Base URL

```
http://localhost:8000/api
```

### Example Requests

#### Get Events
```bash
curl http://localhost:8000/api/events
```

#### Get Event Details
```bash
curl http://localhost:8000/api/events/1
```

#### Filter Events by Date
```bash
curl "http://localhost:8000/api/events?date=2025-09-20"
```

#### Filter Events by Tags
```bash
curl "http://localhost:8000/api/events?tags=culture,education"
```

#### Get News
```bash
curl http://localhost:8000/api/news
```

#### Filter News by Type
```bash
curl "http://localhost:8000/api/news?type=article"
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

---

## Frontend Integration

The React frontend (wps-frontend) expects the following:

1. **Base API URL**: Configure in your frontend `.env`:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

2. **Data Format**: All API responses follow the structure defined in `API_DOCUMENTATION.md`

3. **CORS**: Make sure CORS origins are configured for your frontend domain

4. **Error Handling**: Implement proper error handling for API failures

### Frontend API Service Example

```typescript
// services/api.ts
const API_URL = import.meta.env.VITE_API_URL;

export const fetchEvents = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/events?${params}`);
  return response.json();
};

export const fetchEventDetails = async (id) => {
  const response = await fetch(`${API_URL}/events/${id}`);
  return response.json();
};

// etc.
```

---

## Admin Panel

MoonShine admin panel is **fully operational** at:

```
http://localhost:8000/admin
```

### Features

- Full CRUD for Events, News, Partners, Awards
- User management
- Bilingual content support (Russian/English)
- File upload support
- Scheduled operations

### Available Resources

1. **Events** - Create, edit, delete events with all details
2. **News** - Manage publications and articles
3. **Partners** - Manage partner organizations
4. **Awards** - Manage awards and recognize achievers
5. **Hotels** - Manage accommodation listings
6. **Partner Packages** - Define partnership tier packages
7. **Committee Members** - Manage committee roster
8. **Competitions** - Create and manage competitions with FAQ
9. **Users** - Manage admin users and roles

---

## Environment Setup

### Development

1. **Clone and install dependencies**
   ```bash
   composer install
   ```

2. **Configure .env**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Configure database connection**
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_DATABASE=wps_development
   DB_USERNAME=your_user
   DB_PASSWORD=your_password
   ```

4. **Run migrations and seed**
   ```bash
   php artisan migrate:refresh --seed
   ```

5. **Configure CORS**
   ```env
   CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   ```

6. **Start the server**
   ```bash
   php artisan serve
   ```

   Access at: `http://localhost:8000/api`

### Production

1. **Set environment to production**
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

2. **Configure CORS for production domain**
   ```env
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   ```

3. **Run migrations**
   ```bash
   php artisan migrate
   ```

4. **Cache configuration**
   ```bash
   php artisan config:cache
   php artisan route:cache
   ```

---

## Troubleshooting

### CORS Errors

If frontend can't access API, check:
1. CORS_ALLOWED_ORIGINS in .env includes your frontend domain
2. Correct API URL configured in frontend
3. Both servers running and accessible

### Database Connection Errors

Verify:
1. PostgreSQL/SQLite is running
2. Database credentials in .env are correct
3. Database exists (create if needed)
4. Run: `php artisan migrate` if tables don't exist

### API Returns 404

Check:
1. Route exists in `routes/api.php`
2. Controller exists and namespace is correct
3. Run: `php artisan route:clear` to clear route cache
4. Verify URL format and HTTP method

---

## Next Steps

1. **Connect frontend** to backend API using base URL from above
2. **Test API endpoints** using Postman or cURL
3. **Configure authentication** for admin endpoints (currently auth:api middleware)
4. **Setup production environment** with proper domain and SSL
5. **Configure admin user** with strong password in MoonShine panel
6. **Test all features** with real data

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│            wps-frontend (React SPA)                     │
│  - Runs on http://localhost:3000                         │
│  - Calls /api endpoints                                  │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTP/CORS
                   ▼
┌─────────────────────────────────────────────────────────┐
│         wps-laravel (API + Admin Backend)               │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ REST API Endpoints (/api/*)                      │  │
│  │ - Public: GET events, news, partners, etc.       │  │
│  │ - Protected: POST, PUT, DELETE for admins        │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │ MoonShine Admin Panel (/admin)                   │  │
│  │ - Full CRUD for all content                      │  │
│  │ - User management                                │  │
│  │ - Bilingual support                              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Database: PostgreSQL/SQLite                            │
│  - events, news, partners, awards, hotels, etc.         │
└──────────────────────────────────────────────────────────┘
```

---

## Files Modified/Created

### Controllers (Created/Modified)
- `app/Http/Controllers/EventController.php` - Modified
- `app/Http/Controllers/NewsController.php` - Modified
- `app/Http/Controllers/PartnerController.php` - Modified
- `app/Http/Controllers/AwardController.php` - Created
- `app/Http/Controllers/HotelController.php` - Created
- `app/Http/Controllers/PartnerPackageController.php` - Created
- `app/Http/Controllers/CommitteeMemberController.php` - Created
- `app/Http/Controllers/CompetitionController.php` - Created

### Models (Created/Modified)
- `app/Models/Event.php` - Modified
- `app/Models/News.php` - Modified
- `app/Models/Partner.php` - Modified
- `app/Models/EventPerson.php` - Created
- `app/Models/EventScheduleItem.php` - Created
- `app/Models/Hotel.php` - Created
- `app/Models/PartnerPackage.php` - Created
- `app/Models/CommitteeMember.php` - Created
- `app/Models/Competition.php` - Created
- `app/Models/CompetitionFaq.php` - Created

### Routes
- `routes/api.php` - Created
- `routes/web.php` - Cleared (only comments remain)

### Configuration
- `config/cors.php` - Created
- `bootstrap/app.php` - Modified (added API routing)
- `.env` - Added CORS_ALLOWED_ORIGINS

### Migrations (Created)
- `database/migrations/2025_12_20_000001_refactor_events_table.php`
- `database/migrations/2025_12_20_000002_create_event_persons_table.php`
- `database/migrations/2025_12_20_000003_create_event_schedule_items_table.php`
- `database/migrations/2025_12_20_000004_refactor_news_table.php`
- `database/migrations/2025_12_20_000005_create_hotels_table.php`
- `database/migrations/2025_12_20_000006_create_partner_packages_table.php`
- `database/migrations/2025_12_20_000007_create_committee_members_table.php`
- `database/migrations/2025_12_20_000008_create_competitions_table.php`
- `database/migrations/2025_12_20_000009_create_competition_faq_table.php`

### Resource Classes (Created)
- `app/Http/Resources/EventResource.php`
- `app/Http/Resources/EventDetailResource.php`
- `app/Http/Resources/NewsResource.php`
- `app/Http/Resources/NewsDetailResource.php`
- `app/Http/Resources/PartnerResource.php`
- `app/Http/Resources/PartnerPackageResource.php`
- `app/Http/Resources/HotelResource.php`
- `app/Http/Resources/CommitteeMemberResource.php`
- `app/Http/Resources/CompetitionResource.php`
- `app/Http/Resources/CompetitionDetailResource.php`
- `app/Http/Resources/PersonResource.php`
- `app/Http/Resources/EventScheduleResource.php`

### Documentation
- `API_DOCUMENTATION.md` - Complete API reference
- `MIGRATION_NOTES.md` - This file

---

## Support

For issues or questions:
1. Check `API_DOCUMENTATION.md` for endpoint details
2. Review `app/Http/Controllers/*.php` for implementation details
3. Check database schema in migrations
4. Test with cURL or Postman before integrating with frontend

---

**Migration completed on**: 2025-12-20
**Status**: Ready for frontend integration ✅
