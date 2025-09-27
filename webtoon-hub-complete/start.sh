#!/bin/bash

echo "🚀 Starting Webtoon Hub..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to kill processes on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping services...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    exit
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}⚠️  MongoDB not running. Please start it with: mongod${NC}"
    echo -e "${YELLOW}   Or use MongoDB Atlas (cloud) by updating backend/.env${NC}"
    exit 1
fi

# Determine Python command
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

# Start Backend
echo -e "${YELLOW}🐍 Starting backend...${NC}"
cd backend
$PYTHON_CMD -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Check if backend started successfully
if ! curl -s http://localhost:8001/api/ > /dev/null; then
    echo -e "${RED}❌ Backend failed to start${NC}"
    cleanup
fi

echo -e "${GREEN}✅ Backend started successfully${NC}"

# Start Frontend
echo -e "${YELLOW}⚛️ Starting frontend...${NC}"
cd frontend
yarn start &
FRONTEND_PID=$!
cd ..

echo ""
echo -e "${GREEN}🎉 Webtoon Hub is starting!${NC}"
echo -e "${GREEN}📱 Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}🔧 Backend API: http://localhost:8001/api/${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Wait for processes
wait