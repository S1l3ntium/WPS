# Performance Optimization Guide

## Database Optimization

### Indexes Added
- **Events**: type, status, start_date, created_at
- **News**: type, status, published_at, created_at
- **Hotels**: category, created_at
- **Competitions**: type, status, created_at
- **Awards**: award_year, award_type, created_at
- **Partners**: created_at
- **Committee Members**: created_at
- **Partner Packages**: category, created_at

### Why These Indexes?
- Filtering by `type`, `status` - Most common query filters
- Sorting by `created_at`, `start_date`, `published_at` - Used for ordering results
- Filtering by `category` - Used in hotel and package filtering
- Temporal filtering - Indexes on date columns improve sort performance

### Migration
```bash
php artisan migrate
```

## Caching Strategy

### Implemented Cache Service
- **File Location**: `app/Services/CacheService.php`
- **Cache TTL**: 1 hour for dynamic data, 1 day for static data

### Cached Endpoints
- Competitions (full list and individual)
- Partners (all partners)
- Partner Packages (all packages)

### Usage Example
```php
use App\Services\CacheService;

// Get with automatic caching
$competition = CacheService::getCompetition($id);

// Invalidate when data changes
CacheService::invalidateCompetition($id);

// Clear all cache
CacheService::clearAll();
```

## Environment Configuration

### Production .env
- **APP_DEBUG=false** - Disable debug mode
- **CACHE_STORE=file** - Use file-based caching
- **LOG_LEVEL=warning** - Only log warnings and errors
- **SESSION_DRIVER=cookie** - Lightweight session management

### Optional Enhancements
```env
# Redis for high-traffic scenarios
CACHE_STORE=redis
QUEUE_CONNECTION=redis

# AWS S3 for file storage
FILESYSTEM_DRIVER=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
```

## Query Optimization

### N+1 Query Prevention
```php
// Good - use eager loading
Event::with('moderators', 'experts', 'speakers')->get();

// Bad - lazy loading in loops
Event::all()->each(fn($event) => $event->moderators->count());
```

### Pagination
- Default page size: 15 items
- Maximum page size: 100 items
- Always use pagination for large datasets

## Frontend Optimization

### API Response Optimization
- Only fetch required fields
- Use pagination for large datasets
- Cache API responses on client-side

### Example Request
```javascript
// Good - paginated with limit
fetch('/api/events?page=1&per_page=15')

// Bad - no pagination
fetch('/api/events/all')
```

## Monitoring and Benchmarking

### Laravel Debugbar (Development Only)
```bash
composer require barryvdh/laravel-debugbar --dev
```

### Query Logging
```php
// In development
if (env('APP_DEBUG')) {
    DB::listen(function ($query) {
        \Log::info($query->sql, $query->bindings);
    });
}
```

## Deployment Checklist

- [ ] Run `php artisan migrate` to apply indexes
- [ ] Configure `.env.production` with correct database credentials
- [ ] Set `APP_DEBUG=false` in production
- [ ] Configure proper cache driver (file or Redis)
- [ ] Set up proper logging levels
- [ ] Run `php artisan config:cache` before deployment
- [ ] Run `php artisan route:cache` for faster routing
- [ ] Run `php artisan view:cache` for faster views

## Additional Recommendations

### Redis Integration (for scaling)
```bash
composer require predis/predis
```

Configure in `.env`:
```env
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

### Queuing (for async tasks)
```bash
php artisan queue:work
```

### Rate Limiting (DDoS protection)
```php
// Implemented in routes
Route::middleware('throttle:60,1')->group(function () {
    // API endpoints
});
```

## Performance Targets

- Page load time: < 2 seconds
- API response time: < 500ms
- Database query time: < 100ms
- Cache hit rate: > 80%

## Monitoring Commands

```bash
# Check database query performance
php artisan tinker
>>> DB::enableQueryLog();
>>> // run queries
>>> DB::getQueryLog();

# Check cache hits
php artisan cache:prune

# Clear all cache
php artisan cache:clear

# Monitor queue jobs
php artisan queue:monitor redis --max=100
```
