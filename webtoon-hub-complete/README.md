# 🎯 Webtoon Hub - Quick Setup Package

This package contains everything you need to run the Webtoon Hub app locally!

## 🚀 Quick Start (3 Steps)

### Step 1: Install Prerequisites
- **Node.js** (v16+): https://nodejs.org/
- **Python** (3.8+): https://python.org/
- **MongoDB**: https://www.mongodb.com/try/download/community
- **Yarn**: `npm install -g yarn`

### Step 2: Run Setup
```bash
# Windows
setup.bat

# Mac/Linux
./setup.sh
```

### Step 3: Start the App
```bash
# Terminal 1 - Start MongoDB
mongod

# Terminal 2 - Start Backend
cd backend
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Terminal 3 - Start Frontend
cd frontend
yarn start
```

**🎉 Open your browser:** http://localhost:3000

## 📁 Package Contents

- `backend/` - FastAPI backend with MongoDB
- `frontend/` - React frontend with Tailwind CSS
- `setup.sh` / `setup.bat` - Automated setup scripts
- `start.sh` / `start.bat` - Quick start scripts

## ✨ Features

- ✅ Track webtoon reading progress
- ✅ NEW tag system (appears after 7+ days, excludes paused)
- ✅ Add/Edit/Delete webtoons
- ✅ Search & filter by genre, status
- ✅ Modern responsive UI
- ✅ Persistent MongoDB storage

## 🔧 Troubleshooting

**MongoDB connection error:**
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas (cloud): Update `backend/.env` with Atlas connection string

**Port already in use:**
- Kill existing processes or change ports in the scripts

**Dependencies error:**
- Delete `node_modules` and run `yarn install` again
- For Python: `pip install -r requirements.txt`

Enjoy your Webtoon Hub! 🎉