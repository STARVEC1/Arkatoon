#!/bin/bash

echo "🎯 Setting up Webtoon Hub..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required. Please install from https://python.org/"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Please install from https://nodejs.org/"
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "📦 Installing yarn..."
    npm install -g yarn
fi

# Setup Backend
echo "🐍 Setting up backend..."
cd backend
pip install -r requirements.txt
echo "✅ Backend dependencies installed"
cd ..

# Setup Frontend
echo "⚛️ Setting up frontend..."
cd frontend
yarn install
echo "✅ Frontend dependencies installed"
cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the app:"
echo "1. Start MongoDB: mongod"
echo "2. Start backend: cd backend && python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload"
echo "3. Start frontend: cd frontend && yarn start"
echo "4. Open http://localhost:3000"
echo ""
echo "Or use the start script: ./start.sh"