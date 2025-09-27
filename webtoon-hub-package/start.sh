#!/bin/bash

echo "🚀 Starting Webtoon Hub..."

# Function to kill processes on exit
cleanup() {
    echo "\n🛑 Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️ MongoDB not running. Please start it with: mongod"
    echo "Or use MongoDB Atlas (cloud) by updating backend/.env"
    exit 1
fi

# Start Backend
echo "🐍 Starting backend..."
cd backend
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start Frontend
echo "⚛️ Starting frontend..."
cd frontend
yarn start &
FRONTEND_PID=$!
cd ..

echo ""
echo "🎉 Webtoon Hub is starting!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8001/api/"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for processes
wait