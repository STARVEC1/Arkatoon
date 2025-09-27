@echo off
echo 🚀 Starting Webtoon Hub...

REM Check if MongoDB is running
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo ⚠️  MongoDB not running. Please start it with: mongod
    echo    Or use MongoDB Atlas (cloud) by updating backend\.env
    pause
    exit /b 1
)

echo 🐍 Starting backend...
start "Webtoon Hub Backend" cmd /k "cd backend && python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload"

REM Wait a bit for backend to start
timeout /t 5 /nobreak >nul

echo ⚛️ Starting frontend...
start "Webtoon Hub Frontend" cmd /k "cd frontend && yarn start"

echo.
echo 🎉 Webtoon Hub is starting!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8001/api/
echo.
echo 💡 Close the terminal windows to stop the services
echo Press any key to continue...
pause >nul