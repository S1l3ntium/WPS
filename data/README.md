# WPS Project Data Directory

This directory stores all persistent data for the WPS project.

## Structure

```
data/
├── backups/          # PostgreSQL database backups
├── uploads/          # User uploaded files (from Laravel storage)
└── README.md         # This file
```

## Usage

### Database Backups

Store and restore PostgreSQL database backups:

```bash
# Create backup
docker compose exec -T postgres pg_dump -U postgres wps > data/backups/wps-$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker compose exec -T postgres psql -U postgres wps < data/backups/wps-20251228_123456.sql

# List backups
ls -lh data/backups/
```

### User Uploads

Files uploaded through the application are stored in `data/uploads/`:

```bash
# View uploaded files
ls -la data/uploads/

# Clean old uploads (if needed)
rm -rf data/uploads/*
```

## Volume Mounts

In `docker-compose.yml`, these directories are mounted as volumes:

- **PostgreSQL**: `data/backups` → `/backups` (for backup storage)
- **Laravel**: `data/uploads` → `/app/storage/uploads` (for user uploads)

## Persistence

- Files in this directory are persisted when containers restart
- Volumes in docker-compose ensure data survives `docker compose down`
- Only removed by `docker compose down -v` (which deletes all volumes)

## Backup Strategy

Recommended backup frequency:
- **Development**: Daily backups (automated via cron)
- **Production**: Multiple daily backups + offsite replication

Backup script example:
```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="data/backups/wps-${TIMESTAMP}.sql"
docker compose exec -T postgres pg_dump -U postgres wps > "${BACKUP_FILE}"
gzip "${BACKUP_FILE}"  # Optional: compress backup
echo "✓ Backup created: ${BACKUP_FILE}.gz"
```

## Troubleshooting

### Permission Denied When Accessing Uploads

```bash
# Fix permissions
sudo chown -R $(whoami):staff data/uploads/
chmod -R 755 data/uploads/
```

### Backup File Too Large

```bash
# Backup with compression
docker compose exec -T postgres pg_dump -U postgres wps | gzip > data/backups/wps-backup.sql.gz

# View compressed size
ls -lh data/backups/wps-backup.sql.gz
```

### Restore Fails

```bash
# Check if database exists
docker compose exec -T postgres psql -U postgres -l | grep wps

# Drop and recreate database if needed
docker compose exec -T postgres psql -U postgres -c "DROP DATABASE IF EXISTS wps;"
docker compose exec -T postgres psql -U postgres -c "CREATE DATABASE wps;"

# Then restore backup
docker compose exec -T postgres psql -U postgres wps < data/backups/wps-backup.sql
```

## Important Notes

- **Never commit** `data/` directory to Git (add to `.gitignore`)
- **Always backup** before major updates
- **Test restores** regularly to ensure backups are valid
- **Monitor disk space** - backups can grow large over time

---

**Last Updated**: 2025-12-28
