# Top Africa News

A full-stack news platform with a Next.js frontend and an Express backend.

## Project Structure

- `frontend/`: Next.js public-facing news app
- `backend/`: Express REST API with MongoDB integration
- `docker-compose.yml`: Local service orchestration

## Prerequisites

- Node.js 16+ and npm
- MongoDB (or use MongoDB Memory Server for development)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd top-africa-news
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Copy the example environment file and update it:
```bash
cp .env.example .env
```

**Edit `backend/.env`** and set your configuration:
```
MONGODB_URI=mongodb://localhost:27017/topafricanews
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Copy the example environment file:
```bash
cp .env.example .env.local
```

**No edits needed** - `NEXT_PUBLIC_API_URL=http://127.0.0.1:5000` should work for local development.

## Running the Application

### Option 1: Run in Two Terminals (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://127.0.0.1:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

### Option 2: Using Docker Compose

```bash
docker-compose up
```

## Default Test Credentials

Once the application is running, use these credentials to test:

### Reporter Account
- Email: `reporter@topafrica.news`
- Password: `reporter123`
- Access: Reporter Dashboard at `http://localhost:3000/reporter/dashboard`

### Admin Account
- Email: `admin@topafrica.news`
- Password: `admin123`
- Access: Admin Dashboard at `http://localhost:3000/admin/dashboard`

## Features

- **Reporter Dashboard**: Create, edit, and upload articles
- **Admin Dashboard**: Approve submissions, manage content, and oversee reporters
- **Article Management**: Full CRUD operations for news articles
- **Category Management**: Organize content by news categories
- **Authentication**: JWT-based auth with role-based access control
- **Trending Articles**: Automatic trending content detection
- **Dark Mode**: Built-in dark mode support

## Troubleshooting

### "Failed to fetch" Error
1. Make sure backend is running on `http://127.0.0.1:5000`
2. Verify frontend can reach backend - check browser console for network errors
3. Ensure `NEXT_PUBLIC_API_URL` is set correctly in `frontend/.env.local`

### Login Not Working
1. Ensure both servers are running
2. Check that `.env.local` exists in the `frontend/` directory
3. Clear browser localStorage and refresh

### MongoDB Connection Issues
- If local MongoDB isn't running, the app uses an in-memory database for development
- In production, set `MONGODB_URI` to your actual MongoDB connection string

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article (reporter/admin)
- `GET /api/articles/:slug` - Get single article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `GET /api/categories` - Get all categories
- `GET /api/trending` - Get trending articles

