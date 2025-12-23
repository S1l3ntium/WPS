# Security Guidelines - World Public Summit

## 🔒 Critical Security Practices

This document outlines the security measures implemented in the WPS project and guidelines for maintaining security.

---

## 1. Environment Variables & Secrets

### ✅ Best Practices Implemented

- **`.env` file in .gitignore**: The `.env` file is NOT tracked in git
- **`.env.example` as template**: Use `.env.example` as a reference for required variables
- **No hardcoded secrets**: All sensitive data comes from environment variables
- **Admin credentials from env**: `ADMIN_EMAIL` and `ADMIN_PASSWORD` loaded from `.env` at seed time

### Setup Instructions

**Development:**
```bash
# 1. Copy the example file
cp .env.example .env

# 2. Edit .env with your local settings
nano .env

# 3. Key variables to set:
APP_KEY=base64:XXXXX (generate with: php artisan key:generate)
DB_PASSWORD=your_postgres_password
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=strong_password_here
```

**Production:**
```bash
# Create .env.production with secure values
# NEVER commit this file to git
# Use deployment tool to set environment variables on server
```

### Required Environment Variables

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `APP_KEY` | Laravel encryption key | Yes | `base64:xxxxx` |
| `APP_ENV` | Application environment | Yes | `production` |
| `APP_DEBUG` | Debug mode | Yes | `false` (production) |
| `DB_PASSWORD` | Database password | Yes | `strong_password` |
| `ADMIN_EMAIL` | Admin user email | Yes | `admin@example.com` |
| `ADMIN_PASSWORD` | Admin user password | Yes | `strong_password` |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins | Yes | `https://yourdomain.com` |

---

## 2. Application Debug Mode

### ⚠️ Critical

**Development:**
```env
APP_DEBUG=true    # OK for local development
```

**Production:**
```env
APP_DEBUG=false   # MUST be false in production!
```

### Why?
- When `APP_DEBUG=true`, Laravel exposes sensitive information in error pages:
  - Database credentials
  - Environment variables
  - Stack traces with file paths
  - Database queries

### Verification
Check your `.env` file:
```bash
grep "APP_DEBUG" .env
```

---

## 3. Database Security

### PostgreSQL Setup
```bash
# Create dedicated database user (NOT postgres)
createuser wps_user --createdb
psql -U postgres -d postgres -c "ALTER USER wps_user WITH PASSWORD 'strong_password';"

# Create database
createdb -U wps_user wps_production
```

### Application Configuration
```env
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=wps_production
DB_USERNAME=wps_user          # NOT 'postgres'
DB_PASSWORD=strong_password   # Strong password
```

---

## 4. Laravel Security Features

### Authentication
- Admin authentication via MoonShine built-in auth
- Session stored in database
- CSRF protection enabled by default
- Password hashing using bcrypt

### Authorization
- MoonShine roles and permissions system
- Each resource has access control
- Admin-only endpoints protected

### CORS Configuration
```env
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Only these origins can make API requests from browsers.

---

## 5. Frontend Security

### TypeScript & Type Safety
- All API responses have TypeScript types
- Prevents runtime type errors
- Type checking at compile time

### XSS Protection
- React escapes all text content by default
- Tailwind CSS utility classes (no inline styles)
- No dangerouslySetInnerHTML used

### HTTPS/SSL
```nginx
# Nginx configuration
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

---

## 6. API Security

### Public Endpoints (GET)
- Accessible without authentication
- Filtered data only (no sensitive information)
- Rate limiting recommended

### Protected Endpoints (POST, PUT, DELETE)
- Require Bearer token authentication
- MoonShine admin users only
- Input validation on all requests

### Request Validation
All API endpoints validate input:
```php
// FormRequest validation example
public function rules(): array
{
    return [
        'title' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8|confirmed',
    ];
}
```

---

## 7. Deployment Checklist

Before deploying to production:

- [ ] Set `APP_DEBUG=false`
- [ ] Generate unique `APP_KEY`
- [ ] Set strong database password
- [ ] Set strong `ADMIN_PASSWORD`
- [ ] Configure `CORS_ALLOWED_ORIGINS` for your domain
- [ ] Enable HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Test API authentication
- [ ] Verify environment variables are set on server
- [ ] Run database migrations: `php artisan migrate --force`
- [ ] Clear caches: `php artisan config:cache`

---

## 8. Regular Security Maintenance

### Weekly
- Monitor error logs: `storage/logs/laravel.log`
- Review authentication logs
- Check for failed API requests

### Monthly
- Update Laravel and dependencies: `composer update`
- Review and rotate admin passwords
- Check database backups are working
- Review CORS allowed origins

### Quarterly
- Conduct security audit
- Penetration testing (if in production)
- Review access logs
- Update security policies

---

## 9. Incident Response

### If credentials are exposed:

1. **Immediately**:
   - Regenerate `APP_KEY`: `php artisan key:generate`
   - Change all admin passwords
   - Rotate database credentials

2. **Within 24 hours**:
   - Check git history for exposed data
   - Review server logs for unauthorized access
   - Notify users if user data was exposed

3. **Document**:
   - What happened
   - When it was discovered
   - What was exposed
   - What actions were taken
   - How to prevent it in future

---

## 10. Useful Security Links

- [Laravel Security Guide](https://laravel.com/docs/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Laravel Best Practices](https://github.com/alexeymezenin/laravel-best-practices)
- [PHP Security](https://www.php.net/manual/en/security.php)

---

## 11. Files with Sensitive Configuration

These files should NEVER be committed to git:
- `.env` - Local environment variables
- `.env.production` - Production secrets
- `storage/logs/laravel.log` - May contain sensitive data
- `database/` dumps with real data
- Any backup files with credentials

---

## Contact & Questions

For security concerns or questions:
- Email: security@worldpublicsummit.org
- Report privately - do not create public issues

---

**Last Updated**: December 2025
**Status**: Active ✅
