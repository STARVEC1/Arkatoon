#!/bin/bash

echo "🎯 Setting up Webtoon Hub..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo -e "${RED}❌ Python is not installed. Please install from https://python.org/${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install from https://nodejs.org/${NC}"
    exit 1
fi

# Check if yarn is installed, if not install it
if ! command -v yarn &> /dev/null; then
    echo -e "${YELLOW}📦 Installing yarn...${NC}"
    npm install -g yarn
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install yarn${NC}"
        exit 1
    fi
fi

# Setup Backend
echo -e "${YELLOW}🐍 Setting up backend...${NC}"
cd backend

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

$PYTHON_CMD -m pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install Python dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend dependencies installed${NC}"
cd ..

# Setup Frontend
echo -e "${YELLOW}⚛️ Setting up frontend...${NC}"
cd frontend
yarn install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
cd ..

echo ""
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo -e "${YELLOW}🚀 To start the app:${NC}"
echo "1. Start MongoDB: mongod"
echo "2. Start backend: cd backend && $PYTHON_CMD -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload"
echo "3. Start frontend: cd frontend && yarn start"
echo "4. Open http://localhost:3000"
echo ""
echo -e "${YELLOW}💡 Tip: You can also use ./start.sh to start everything automatically${NC}"