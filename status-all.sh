#!/bin/bash

# Статус всех экземпляров WPS

set -e

COMPOSE_FILE="docker-compose-multi.yml"
INSTANCES=("africa" "irak" "asia")

# Цвета
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}WPS Multi-Instance Status${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

for instance in "${INSTANCES[@]}"; do
    echo -e "${BLUE}📊 Status: $instance${NC}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    WPS_INSTANCE=$instance docker-compose -f $COMPOSE_FILE ps

    # Проверить доступность
    echo ""
    echo "Checking connectivity..."

    if curl -s -o /dev/null -w "%{http_code}" http://$instance.wps.test | grep -q "200\|301\|302"; then
        echo -e "${GREEN}✅ Frontend: http://$instance.wps.test${NC}"
    else
        echo -e "${RED}❌ Frontend: http://$instance.wps.test (not responding)${NC}"
    fi

    if curl -s -o /dev/null -w "%{http_code}" http://$instance.wps.test/api | grep -q "20\|30"; then
        echo -e "${GREEN}✅ API: http://$instance.wps.test/api${NC}"
    else
        echo -e "${RED}❌ API: http://$instance.wps.test/api (not responding)${NC}"
    fi

    echo ""
done

echo -e "${BLUE}========================================${NC}"
echo -e "${YELLOW}Legend:${NC}"
echo -e "  ${GREEN}✅${NC} = Running and healthy"
echo -e "  ${RED}❌${NC} = Not responding"
echo ""
