#!/bin/bash

# Webtoon Hub - Local Setup Script
echo "🎯 Setting up Webtoon Hub locally..."

# Create project structure
echo "📁 Creating project structure..."
mkdir -p webtoon-hub/backend
mkdir -p webtoon-hub/frontend

# Setup Backend
echo "🐍 Setting up backend..."
cd webtoon-hub/backend

# Create requirements.txt
cat > requirements.txt << 'EOF'
fastapi==0.110.1
uvicorn==0.25.0
motor==3.3.1
python-dotenv>=1.0.1
pymongo==4.5.0
pydantic>=2.6.4
python-multipart>=0.0.9
EOF

# Create backend .env
cat > .env << 'EOF'
MONGO_URL=mongodb://127.0.0.1:27017
DB_NAME=webtoon_hub
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
EOF

echo "Installing Python dependencies..."
pip install -r requirements.txt

# Setup Frontend
echo "⚛️ Setting up frontend..."
cd ../
npx create-react-app frontend
cd frontend

# Create frontend .env
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

echo "Installing Node.js dependencies..."
yarn add axios react-router-dom lucide-react tailwindcss class-variance-authority clsx tailwind-merge react-hook-form @hookform/resolvers zod sonner @craco/craco

# Install Radix UI components
yarn add @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

# Install dev dependencies
yarn add -D @craco/craco autoprefixer postcss tailwindcss

# Initialize Tailwind
npx tailwindcss init -p

echo "✅ Basic setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Copy the source files from the running app"
echo "2. Start MongoDB: mongod"
echo "3. Start backend: cd backend && uvicorn server:app --host 0.0.0.0 --port 8001 --reload"
echo "4. Start frontend: cd frontend && yarn start"
echo "5. Open http://localhost:3000"