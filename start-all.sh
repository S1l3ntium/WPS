#!/bin/bash

# Запуск всех экземпляров WPS

set -e

COMPOSE_FILE="docker-compose-multi.yml"
INSTANCES=("africa" "irak" "asia")

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}WPS Multi-Instance Startup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

for instance in "${INSTANCES[@]}"; do
    ENV_FILE=".env.$instance"

    # Проверить что .env файл существует
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${RED}❌ Missing: $ENV_FILE${NC}"
        echo "   Create it with: cp .env.docker $ENV_FILE"
        continue
    fi

    echo -e "${BLUE}🚀 Starting: $instance${NC}"

    # Запустить контейнеры
    WPS_INSTANCE=$instance docker-compose -f $COMPOSE_FILE --env-file $ENV_FILE up -d --build

    echo -e "${GREEN}✅ $instance started${NC}"
    echo ""
done

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}All instances started!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Access at:"
for instance in "${INSTANCES[@]}"; do
    echo -e "  ${GREEN}http://$instance.wps.test${NC}"
done
echo ""
echo "Check status with: ./status-all.sh"
echo "Stop all with: ./stop-all.sh"
