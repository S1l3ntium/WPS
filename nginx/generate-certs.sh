#!/bin/bash
# Generate self-signed SSL certificates for local development

DOMAIN="${1:-wps.test}"
DAYS="${2:-365}"
CERT_DIR="$(cd "$(dirname "$0")" && pwd)/ssl"

echo "=========================================="
echo "Generating SSL Certificate"
echo "=========================================="
echo "Domain: $DOMAIN"
echo "Days: $DAYS"
echo "Location: $CERT_DIR"
echo ""

# Check if directory exists
if [ ! -d "$CERT_DIR" ]; then
    echo "✗ Certificate directory not found: $CERT_DIR"
    exit 1
fi

# Check if certificate already exists
if [ -f "$CERT_DIR/$DOMAIN.crt" ] && [ -f "$CERT_DIR/$DOMAIN.key" ]; then
    echo "⚠ Certificate already exists for $DOMAIN"
    read -p "Overwrite? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
fi

# Generate self-signed certificate
echo "Generating certificate..."
openssl req -x509 \
    -newkey rsa:2048 \
    -keyout "$CERT_DIR/$DOMAIN.key" \
    -out "$CERT_DIR/$DOMAIN.crt" \
    -days "$DAYS" \
    -nodes \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=WPS/CN=$DOMAIN" \
    2>&1 | grep -E "(Generating|writing)" || true

# Verify certificate
if [ -f "$CERT_DIR/$DOMAIN.crt" ] && [ -f "$CERT_DIR/$DOMAIN.key" ]; then
    echo "✓ Certificate generated successfully!"
    echo ""
    echo "Certificate info:"
    openssl x509 -in "$CERT_DIR/$DOMAIN.crt" -text -noout | grep -E "Subject:|Issuer:|Not Before|Not After"
    echo ""
    echo "Files created:"
    ls -lh "$CERT_DIR/$DOMAIN."* | awk '{print "  " $9 " (" $5 ")"}'
else
    echo "✗ Failed to generate certificate"
    exit 1
fi
