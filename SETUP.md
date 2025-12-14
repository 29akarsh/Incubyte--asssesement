# Quick Setup Guide

## Prerequisites Check

Before starting, verify you have:
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm v9+ installed (`npm --version`)
- [ ] A MongoDB instance or MongoDB Atlas cluster and connection URI
- [ ] Git installed

## Step-by-Step Setup

### 1. Database (MongoDB Atlas) Setup

Follow these steps to configure MongoDB Atlas (or use any MongoDB URI):

1. Create a free cluster at https://www.mongodb.com/cloud/atlas (or use your existing cluster).
2. Create a database user and password.
3. Allow your development IP address or 0.0.0.0/0 for quick testing (not recommended for production).
4. Copy the connection string and update the `backend/.env` file with:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sweet_shop?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```

Make sure to URL-encode special characters in the password.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
# Edit backend/.env and add your `MONGO_URI` and `JWT_SECRET`

# Seed with sample data (also migrates legacy float prices to paise)
npm run db:seed

# Start backend server
npm run dev
```

Backend should now be running on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

Frontend should now be running on `http://localhost:5173`

### 4. Access the Application

Open your browser and go to: `http://localhost:5173`

Use these demo credentials:
- **Admin**: admin@sweetshop.com / admin123
- **User**: user@sweetshop.com / user123

## Troubleshooting

### Database Connection Issues

If you get database connection errors:
If you get database connection errors with MongoDB Atlas or your MongoDB instance:

1. Verify `MONGO_URI` in `backend/.env` is correct and URL-encoded for special characters in the password.
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sweet_shop?retryWrites=true&w=majority
   JWT_SECRET=your_secret_key
   ```

2. Check Atlas network access: ensure your dev IP is whitelisted or 0.0.0.0/0 (for quick testing).

3. Test connection from your machine (Node script):
   ```bash
   node -e "require('mongoose').connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sweet_shop').then(()=>console.log('ok')).catch(e=>console.error(e))"
   ```

### Port Already in Use

If port 3000 or 5173 is already in use:

1. Change backend port in `backend/.env`:
   ```
   PORT=3001
   ```

2. Update frontend API URL in `frontend/.env`:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Test Coverage

```bash
cd backend
npm run test:coverage
```

## Next Steps

1. Try logging in with demo credentials
2. Browse the sweets catalog
3. Try searching and filtering
4. Purchase some sweets (as user)
5. Login as admin and try adding/editing sweets
6. Test the restock functionality

Enjoy exploring the Sweet Shop! 🍬

