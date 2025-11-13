@echo off
echo ====================================
echo ConvertPulse Setup Script
echo ====================================
echo.

echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed: 
node --version
echo.

echo [2/5] Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend dependency installation failed!
    pause
    exit /b 1
)
cd ..
echo Backend dependencies installed successfully!
echo.

echo [3/5] Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend dependency installation failed!
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo [4/5] Setting up environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env - Please edit with your MongoDB URI and JWT secret
) else (
    echo backend\.env already exists
)

if not exist frontend\.env.local (
    copy frontend\.env.local.example frontend\.env.local
    echo Created frontend\.env.local
) else (
    echo frontend\.env.local already exists
)
echo.

echo [5/5] Setup complete!
echo.
echo ====================================
echo Next Steps:
echo ====================================
echo 1. Edit backend\.env with your MongoDB URI and JWT secret
echo 2. Make sure MongoDB is running
echo 3. Open TWO terminal windows:
echo.
echo    Terminal 1 (Backend):
echo    cd backend
echo    npm run dev
echo.
echo    Terminal 2 (Frontend):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:3000 in your browser
echo 5. Create an account and start tracking!
echo.
echo For detailed instructions, see QUICKSTART.md
echo ====================================
pause
