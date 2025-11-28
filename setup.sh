#!/bin/bash

echo "🐾 Pawtopia Backend Setup Script"
echo "================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env already exists
if [ -f .env ]; then
    echo -e "${YELLOW}⚠️  .env dosyası zaten mevcut!${NC}"
    read -p "Üzerine yazmak ister misin? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ️  Setup iptal edildi. Mevcut .env korundu.${NC}"
        exit 0
    fi
fi

echo ""
echo -e "${BLUE}📝 MongoDB Connection String Girişi${NC}"
echo "-----------------------------------"
echo ""
echo "MongoDB Atlas'tan connection string almak için:"
echo "1. https://cloud.mongodb.com adresine git"
echo "2. Cluster'ına tıkla → Connect → Connect your application"
echo "3. Connection string'i kopyala"
echo ""
echo -e "${YELLOW}Örnek:${NC}"
echo "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pawtopia?retryWrites=true&w=majority"
echo ""
read -p "MongoDB URI: " MONGODB_URI

if [ -z "$MONGODB_URI" ]; then
    echo -e "${RED}❌ MongoDB URI boş olamaz!${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🔐 JWT Secret Key${NC}"
echo "----------------"
echo "Güvenli bir JWT secret key oluşturuluyor..."
JWT_SECRET=$(openssl rand -base64 32)
echo -e "${GREEN}✅ Generated: ${JWT_SECRET}${NC}"

echo ""
echo -e "${BLUE}🚪 Server Port${NC}"
echo "-------------"
read -p "Port (default: 8080): " PORT
PORT=${PORT:-8080}

echo ""
echo -e "${BLUE}🌍 Environment${NC}"
echo "-------------"
read -p "Environment (development/production) [development]: " NODE_ENV
NODE_ENV=${NODE_ENV:-development}

# Create .env file
cat > .env << EOF
# Pawtopia Backend Environment Variables
# Generated on $(date)

# MongoDB Connection
MONGODB_URI=$MONGODB_URI

# Server Port
PORT=$PORT

# JWT Secret Key
JWT_SECRET=$JWT_SECRET

# Node Environment
NODE_ENV=$NODE_ENV
EOF

echo ""
echo -e "${GREEN}✅ .env dosyası başarıyla oluşturuldu!${NC}"
echo ""
echo -e "${BLUE}📋 Oluşturulan Ayarlar:${NC}"
echo "  MongoDB URI: ${MONGODB_URI:0:50}..."
echo "  Port: $PORT"
echo "  JWT Secret: ${JWT_SECRET:0:20}..."
echo "  Environment: $NODE_ENV"
echo ""

# Ask to install dependencies
echo -e "${BLUE}📦 Bağımlılıkları yüklemek ister misin?${NC}"
read -p "npm install çalıştır? (Y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]] || [ -z $REPLY ]; then
    echo ""
    echo -e "${BLUE}📦 Paketler yükleniyor...${NC}"
    npm install
    echo ""
    echo -e "${GREEN}✅ Paketler yüklendi!${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Setup tamamlandı!${NC}"
echo ""
echo -e "${BLUE}🚀 Uygulamayı başlatmak için:${NC}"
echo "  npm run dev    # Development mode"
echo "  npm run build  # Production build"
echo "  npm start      # Production mode"
echo ""
