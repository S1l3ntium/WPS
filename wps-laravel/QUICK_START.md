# Quick Start Guide - PostgreSQL & Multilingual Support

## Environment Setup

The project is now configured to use PostgreSQL with full Russian/English multilingual support.

### Current Configuration:
- **Database**: PostgreSQL (wps_development)
- **Default Locale**: Russian (ru)
- **Fallback Locale**: Russian (ru)
- **Supported Locales**: Russian (ru), English (en)

---

## File Structure

### Database & Models:
- `app/Models/Event.php` - Event model with JSON fields for ru/en
- `app/Models/News.php` - News model with JSON fields
- `app/Models/Partner.php` - Partner model with JSON fields
- `app/Models/Award.php` - Award model with JSON fields

### Admin Panel (MoonShine):
- `app/MoonShine/Resources/EventResource.php` - Admin interface for events
- `app/MoonShine/Resources/NewsResource.php` - Admin interface for news
- `app/MoonShine/Resources/PartnerResource.php` - Admin interface for partners
- `app/MoonShine/Resources/AwardResource.php` - Admin interface for awards

### Middleware & Routing:
- `app/Http/Middleware/SetLocale.php` - Locale detection from URL
- `routes/web.php` - Web routes with locale prefix (/{locale}/*)
- `bootstrap/app.php` - Middleware registration

### Translations:
- `lang/ru.json` - Russian UI strings
- `lang/en.json` - English UI strings
- `lang/ru/categories.php` - Russian categories/statuses
- `lang/en/categories.php` - English categories/statuses

### Views:
- `resources/views/layouts/app.blade.php` - Main layout with language switcher
- `resources/views/home.blade.php` - Homepage with translations

---

## Key Features

### 1. **JSON Fields in Database**
All content tables now use JSON fields:
```
events:      title, description, location, content (JSON)
news:        title, excerpt, content (JSON)
partners:    name, description (JSON)
awards:      title, description, winner_bio, achievement (JSON)
```

### 2. **Automatic Localization in Models**
Models automatically return the correct language version:
```php
app()->setLocale('ru');
$event->title; // Returns Russian title

app()->setLocale('en');
$event->title; // Returns English title
```

### 3. **MoonShine Admin Panel**
Direct translation editing in admin panel:
- Each field shows separate ru/en inputs
- No separate translation tables needed
- Clean, intuitive UI

### 4. **URL-Based Locale Selection**
- Russian: `/ru/news`, `/ru/program`
- English: `/en/news`, `/en/program`
- Root `/` redirects to `/ru` by default

### 5. **Language Switcher**
Dropdown in navbar for easy language switching between Russian and English.

---

## Common Tasks

### Add New Translation Key
1. Add to `lang/ru.json`:
   ```json
   "my.new.key": "Мой новый текст"
   ```
2. Add to `lang/en.json`:
   ```json
   "my.new.key": "My new text"
   ```
3. Use in view: `{{ __('my.new.key') }}`

### Create New Multilingual Content
1. Go to MoonShine admin panel (`/admin`)
2. Click on the resource (Events, News, Partners, Awards)
3. Each field shows ru/en tabs
4. Edit in both languages
5. Save

### Access Content Programmatically
```php
use App\Models\Event;

$event = Event::find(1);

// Get localized value based on current locale
echo $event->title; // Automatic based on app()->getLocale()

// Get specific locale
app()->setLocale('en');
echo $event->title; // English version

// Get raw JSON
$raw = $event->getRawAttribute('title');
// Returns: {"ru": "...", "en": "..."}
```

### Update Routes with Locale
```php
// Old: route('news.index')
// New: 
route('news.index', ['locale' => app()->getLocale()])

// Or for specific items:
route('news.show', ['locale' => app()->getLocale(), 'news' => $article->id])
```

---

## Testing

### Test Database Connection
```bash
php artisan tinker
> DB::connection()->getPdo();
> // Should return PDO connection
```

### Test Translations
```bash
php artisan tinker
> app()->setLocale('ru');
> echo __('site.title');
// Output: Всемирная Общественная Ассамблея

> app()->setLocale('en');
> echo __('site.title');
// Output: World Public Assembly
```

### Test Routes
```bash
php artisan route:list
// Check for routes with {locale} parameter
```

---

## Important Notes

1. **Default Locale**: Russian (ru) - used when no locale specified
2. **Fallback**: If English translation missing, shows Russian version
3. **Database**: PostgreSQL (not SQLite)
4. **Admin Panel**: Use JSON fields for translations, not separate tables
5. **URL Structure**: Always include locale prefix in links

---

## Deployment Checklist

- [ ] PostgreSQL server running
- [ ] `.env` configured with PostgreSQL credentials
- [ ] Migrations run: `php artisan migrate`
- [ ] Cache cleared: `php artisan optimize:clear`
- [ ] Language files exist in `lang/` directory
- [ ] MoonShine admin accessible at `/admin`

---

## Support for Additional Languages

To add a third language (e.g., French):

1. Create language files:
   - `lang/fr.json`
   - `lang/fr/categories.php`
   - `lang/fr/statuses.php`

2. Update configuration:
   - `config/moonshine.php`: Add `'fr' => 'Français'` to locales array

3. Update middleware validation:
   - `app/Http/Middleware/SetLocale.php`: Change `['ru', 'en']` to `['ru', 'en', 'fr']`

4. Update routes:
   - `routes/web.php`: Change locale regex from `'ru|en'` to `'ru|en|fr'`

5. Update models to handle 3 languages in JSON fields

---

## Troubleshooting

**Issue**: Locale not switching
- **Solution**: Check middleware registration in `bootstrap/app.php`

**Issue**: Translations showing translation keys instead of text
- **Solution**: Verify language files exist in `lang/` directory

**Issue**: Database connection error
- **Solution**: Check PostgreSQL is running, `.env` credentials correct

**Issue**: MoonShine admin not showing JSON fields
- **Solution**: Ensure `Json::make()` is used in resources, not `Text::make()`

---

## Next Steps

Consider implementing:
1. SEO metadata per language (hreflang tags)
2. Sitemap with locale variants
3. Language preference in user profile
4. Session/cookie-based language persistence
5. Translation management interface
6. Dynamic route translations

---

Created: 2025-12-18
Project: World Public Summit Laravel Application
Status: ✅ Complete and Tested
