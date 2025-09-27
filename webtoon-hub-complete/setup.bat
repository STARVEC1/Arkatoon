@echo off
echo 🎯 Setting up Webtoon Hub...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install from https://python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if yarn is installed, if not install it
yarn --version >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing yarn...
    npm install -g yarn
    if errorlevel 1 (
        echo ❌ Failed to install yarn
        pause
        exit /b 1
    )
)

REM Setup Backend
echo 🐍 Setting up backend...
cd backend
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
cd ..

REM Setup Frontend
echo ⚛️ Setting up frontend...
cd frontend
yarn install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
cd ..

echo.
echo 🎉 Setup complete!
echo.
echo 🚀 To start the app:
echo 1. Start MongoDB: mongod
echo 2. Start backend: cd backend ^&^& python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
echo 3. Start frontend: cd frontend ^&^& yarn start
echo 4. Open http://localhost:3000
echo.
echo 💡 Tip: You can also use start.bat to start everything automatically
pause