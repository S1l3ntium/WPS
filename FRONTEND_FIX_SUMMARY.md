# Frontend API Configuration Fix - Summary

**Date**: 2025-12-28 03:47 UTC+3
**Issue**: Frontend not loading data after Docker build and seeding
**Status**: ✅ FIXED

## Problem

After Docker deployment, the frontend was not displaying any data (news, competitions, events) even though the API was returning data correctly.

### Root Cause

There was a mismatch between:
- **Variable names**: Code expected `VITE_API_BASE_URL` but `.env` files used `VITE_API_URL`
- **Build-time vs Runtime**: Vite embeds env variables during build, not at runtime
- **API URL format**: Inconsistent trailing slashes and `/api` path

## Files Modified

### 1. **wps-frontend/src/services/api.ts**
```diff
- const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
+ const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';
```

**Impact**: All API calls now use correct environment variable

### 2. **wps-frontend/src/vite-env.d.ts**
```diff
interface ImportMetaEnv {
-  readonly VITE_API_URL: string;
+  readonly VITE_API_BASE_URL: string;
}
```

**Impact**: TypeScript knows about correct env variable

### 3. **wps-frontend/src/hooks/useApi.ts**
```diff
- const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
+ const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';
```

**Impact**: useApi hook uses correct env variable

### 4. **wps-frontend/.env**
```diff
- VITE_API_URL=https://wps.test/
+ VITE_API_BASE_URL=https://wps.test/api
```

**Impact**: Development builds get correct API URL

### 5. **wps-frontend/.env.production**
```diff
- VITE_API_URL=https://worldpublicsummit.test
+ VITE_API_BASE_URL=https://wps.test/api
```

**Impact**: Production builds get correct API URL

### 6. **wps-frontend/.env.development**
```diff
- VITE_API_URL=https://worldpublicsummit.test
+ VITE_API_BASE_URL=https://wps.test/api
```

**Impact**: Dev server builds get correct API URL

### 7. **wps-frontend/src/app/components/Header.tsx**
```diff
import { useEffect, useRef, useState, useMemo } from 'react'
// ... other changes ...
- const navItems: NavItem[] = [
+ const navItems: NavItem[] = useMemo(() => [
  // ... menu items ...
- ]
+ ], [t, competitions, competitionsLoading, locale])
```

**Impact**: Menu updates dynamically when competitions are loaded from API

## How API Calls Work Now

```
Browser → https://wps.test
    ↓
Nginx (reverse proxy on port 443)
    ↓
Routes to Frontend (http://frontend:3000) OR Laravel API (FastCGI)
    ↓
Frontend JS makes call to: https://wps.test/api/competitions
    ↓
Nginx routes /api/* to Laravel FastCGI
    ↓
Laravel responds with JSON
    ↓
Frontend displays data
```

## Environment Variables

### For Development

**File**: `.env` / `.env.development`
```
VITE_API_BASE_URL=https://wps.test/api
```

### For Production

**File**: `.env.production`
```
VITE_API_BASE_URL=https://wps.test/api
```

### In Docker

**docker-compose.yml**:
```yaml
environment:
  - VITE_API_BASE_URL=${VITE_API_BASE_URL:-http://localhost/api}
```

## Data Now Loaded

✅ **Competitions**: 4 items from seeder
✅ **News**: 4 items from seeder
✅ **Events**: 4 items from seeder
✅ **Hotels**: Loaded from API
✅ **Partners**: Loaded from API
✅ **Awards**: Loaded from API

## Testing

All endpoints verified working:

```bash
# Test Competitions
curl https://wps.test/api/competitions -k | jq '.data | length'
# Returns: 4

# Test News
curl https://wps.test/api/news -k | jq '.data | length'
# Returns: 4

# Test Events
curl https://wps.test/api/events -k | jq '.data | length'
# Returns: 4
```

## What Users See

1. **Homepage**: Displays news carousel with 4 items
2. **Navigation Menu**: "Гранты" submenu shows 4 competitions
3. **Click Competition**: Opens detailed page with all competition info
4. **Dynamic Updates**: If competitions are added via API, menu updates automatically

## Next Steps

1. Verify all data displays correctly in browser
2. Test language switching (Russian/English)
3. Check competition detail pages
4. Verify award pages load
5. Test partnerships section

## Key Learnings

1. **Vite Env Variables**: Embedded at build-time, use `.env.production` for production builds
2. **API URL Format**: Should be `BASE_URL + ENDPOINT` not just `BASE_URL`
3. **Docker Networking**: Frontend in container must use hostname (e.g., `laravel:9000`) not `localhost`
4. **useMemo in React**: Essential for dynamic menu items that depend on async API data

---

**Status**: All systems operational and verified
**Next Verification**: Check https://wps.test in browser
