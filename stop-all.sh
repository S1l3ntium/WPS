#!/bin/bash

# Остановка всех экземпляров WPS

set -e

COMPOSE_FILE="docker-compose-multi.yml"
INSTANCES=("africa" "irak" "asia")

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}WPS Multi-Instance Shutdown${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

for instance in "${INSTANCES[@]}"; do
    echo -e "${BLUE}⏹️  Stopping: $instance${NC}"

    WPS_INSTANCE=$instance docker-compose -f $COMPOSE_FILE down

    echo -e "${GREEN}✅ $instance stopped${NC}"
    echo ""
done

echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}All instances stopped!${NC}"
echo -e "${BLUE}========================================${NC}"
