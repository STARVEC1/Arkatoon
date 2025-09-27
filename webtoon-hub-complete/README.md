# 🎯 Webtoon Hub - Complete Application

**Full-stack webtoon tracking app with React + FastAPI + MongoDB**

## ✨ Features

- ✅ **Smart NEW Tag System** - Appears after 7+ days, excludes paused webtoons
- ✅ **Full CRUD Operations** - Add, edit, delete, and track webtoons
- ✅ **Advanced Filtering** - Search by name, filter by genre and status
- ✅ **Chapter Progress Tracking** - Keep track of your reading progress
- ✅ **Author Break Detection** - Identifies webtoons on extended breaks (42+ days)
- ✅ **Responsive Modern UI** - Built with Tailwind CSS and Radix UI components
- ✅ **Persistent Storage** - MongoDB integration for data persistence

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16+): https://nodejs.org/
- **Python** (3.8+): https://python.org/
- **MongoDB**: https://www.mongodb.com/try/download/community
- **Yarn**: `npm install -g yarn`

### Installation

1. **Install dependencies:**
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   yarn install
   ```

2. **Start MongoDB:**
   ```bash
   mongod
   ```

3. **Start the application:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   
   # Terminal 2 - Frontend
   cd frontend
   yarn start
   ```

4. **Open your browser:** http://localhost:3000

## 🔧 Configuration

### MongoDB Options

**Local MongoDB:**
- Default configuration in `backend/.env`
- Make sure MongoDB is running: `mongod`

**MongoDB Atlas (Cloud):**
1. Create account at https://www.mongodb.com/atlas/database
2. Create cluster and get connection string
3. Update `backend/.env`:
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

## 📁 Project Structure

```
webtoon-hub/
├── backend/                 # FastAPI backend
│   ├── server.py           # Main API server
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── frontend/               # React frontend
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/          # Utility functions
│   │   └── mock/         # Mock data
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies
│   └── .env             # Frontend config
└── README.md            # This file
```

## 🎮 Usage

1. **Add Webtoons** - Click "Add Webtoon" to add new series
2. **Track Progress** - Update chapter numbers as you read
3. **Use Filters** - Search by name, filter by genre/status
4. **NEW Tags** - Automatically shows on webtoons 7+ days old
5. **Manage Status** - Set webtoons as ongoing, completed, or paused

## 🛠️ Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `backend/.env`

**Port already in use:**
- Kill existing processes or change ports
- Backend: Change port in uvicorn command
- Frontend: Set PORT environment variable

**Dependencies error:**
- Delete `node_modules` and run `yarn install`
- For Python: `pip install -r requirements.txt`

## 🔄 Development

**Backend Development:**
- API endpoints are prefixed with `/api`
- Hot reload enabled with `--reload` flag
- Logs available in terminal

**Frontend Development:**
- Hot reload enabled by default
- Tailwind CSS for styling
- Components use Radix UI primitives

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Enjoy tracking your webtoons! 🎯**