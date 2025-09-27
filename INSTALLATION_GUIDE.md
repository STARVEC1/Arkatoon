# Webtoon Hub - Installation Guide

## Prerequisites

1. **Node.js** (v16+) - https://nodejs.org/
2. **Python** (3.8+) - https://python.org/
3. **MongoDB** - Local or Atlas cloud
4. **Yarn** - `npm install -g yarn`

## Installation Steps

### 1. Create Project Directory
```bash
mkdir webtoon-hub
cd webtoon-hub
```

### 2. Set up Backend
```bash
mkdir backend
cd backend

# Copy server.py and requirements.txt to this directory

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
echo "MONGO_URL=mongodb://127.0.0.1:27017" > .env
echo "DB_NAME=webtoon_hub" >> .env
echo "CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000" >> .env
```

### 3. Set up Frontend
```bash
cd ..
npx create-react-app frontend
cd frontend

# Install dependencies
yarn add axios react-router-dom @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip lucide-react tailwindcss autoprefixer postcss class-variance-authority clsx tailwind-merge react-hook-form @hookform/resolvers zod sonner @craco/craco date-fns embla-carousel-react input-otp next-themes react-day-picker react-resizable-panels tailwindcss-animate vaul

# Install dev dependencies
yarn add -D @craco/craco @eslint/js eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react globals

# Create .env file
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Copy all source files to src/ directory
# Copy configuration files (craco.config.js, tailwind.config.js, etc.)
```

### 4. Initialize Tailwind CSS
```bash
# In frontend directory
npx tailwindcss init -p
```

### 5. Start the Application

**Terminal 1 - Start MongoDB (if local):**
```bash
mongod
```

**Terminal 2 - Start Backend:**
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 3 - Start Frontend:**
```bash
cd frontend
yarn start
```

### 6. Access the App
Open your browser and go to: `http://localhost:3000`

## Configuration Options

### MongoDB Atlas (Cloud Database)
If using MongoDB Atlas instead of local MongoDB:
1. Create account at https://www.mongodb.com/atlas/database
2. Create a cluster and get connection string
3. Update backend/.env:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net
   ```

### Environment Variables

**Backend (.env):**
- `MONGO_URL` - MongoDB connection string
- `DB_NAME` - Database name (webtoon_hub)
- `CORS_ORIGINS` - Allowed frontend origins

**Frontend (.env):**
- `REACT_APP_BACKEND_URL` - Backend API URL

## Troubleshooting

1. **Port already in use:** Change ports in the commands
2. **MongoDB connection failed:** Check if MongoDB is running
3. **CORS errors:** Verify CORS_ORIGINS in backend .env
4. **Dependencies issues:** Clear node_modules and reinstall

## Features

- ✅ Track webtoon reading progress
- ✅ Smart NEW tag system (7+ days without update)
- ✅ Filter by status, genre, search
- ✅ Add/Edit/Delete webtoons
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

Enjoy your Webtoon Hub! 🎉