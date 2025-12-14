 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with modern technologies and following Test-Driven Development (TDD) principles📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [My AI Usage](#my-ai-usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
-
- ✨ Features

### User Features
- User registration and authentication with JWT tokens
- Browse all available sweets
- Search and filter sweets by name, category, and price range
- Purchase sweets (with quantity validation)
- View real-time stock availability

### Admin Features
- All user features
- Add new sweets to the inventory
- Update sweet details (name, category, price, quantity, description)
- Delete sweets from inventory
- Restock sweets

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Mongodb Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Testing**: Jest, Supertest
- **Development**: ts-node, nodemon

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript (with JSX)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 (Custom)

📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sweet-shop-management
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit `backend/.env` and set your MongoDB Atlas connection string (MONGO_URI)
# Example:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sweet_shop?retryWrites=true&w=majority
# JWT_SECRET=your_secret_key
```

### 3. Database (MongoDB Atlas) Setup

This project now uses MongoDB Atlas. You can use a managed Atlas cluster or any MongoDB instance reachable from your machine.

1. Create a MongoDB Atlas cluster (or use an existing MongoDB URI).
2. Create a database user and whitelist your IP (or allow access from your development IP).
3. Copy the connection string and put it in `backend/.env` as `MONGO_URI`.

Example connection string (replace placeholders and URL-encode special characters in password):

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sweet_shop?retryWrites=true&w=majority
```

Then seed the database (this also migrates any legacy price fields to paise):

```bash
cd backend
npm run db:seed
```

The backend will create necessary collections and indexes on startup. If you need to reset the database you can run the seed script after dropping collections in Atlas.

### 4. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```
🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

After seeding the database, you can use these credentials:

**Admin Account:**
- Email: `admin@sweetshop.com`
- Password: `admin123`

**Regular User Account:**
- Email: `user@sweetshop.com`
- Password: `user123`

🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

The test suite includes:
- Unit tests for authentication service
- Unit tests for sweet management service
- Integration tests for API endpoints
- Test coverage reports

### Test Coverage

The project maintains high test coverage with comprehensive tests for:
- User registration and login
- Password hashing and validation
- JWT token generation and verification
- CRUD operations for sweets
- Purchase and restock functionality
- Search and filter operations

📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Sweet Management Endpoints

All sweet endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Get All Sweets
```http
GET /api/sweets
```

#### Search Sweets
```http
GET /api/sweets/search?name=chocolate&category=Chocolate&minPrice=1&maxPrice=5
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Content-Type: application/json

{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity": 100,
  "description": "Delicious milk chocolate"
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 3.99
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Content-Type: application/json

{
  "quantity": 2
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Content-Type: application/json

{
  "quantity": 50
}
```

🤖 AI Usage

This project was developed using a combination of AI tools (including large language models such as ChatGPT and Claude, along with AI-powered code assistants) as productivity and pair-programming aids.

## How AI Was Used
 
1. Brainstorming and validating system architecture and API design

2. Drafting unit tests following a Test-Driven Development (TDD) approach

3. Accelerating boilerplate setup (TypeScript, Jest, Express, React)

4. Assisting with database schema design and indexing strategies

5. Providing suggestions for frontend components, styling, and UX improvements

6. Supporting documentation drafting and code comments

## Engineering Ownership

1. All architectural decisions, business logic, debugging, testing validation, and final code reviews were performed by me.
2. AI tools were used to speed up development and improve code quality, not to replace engineering judgment.

## Outcome
Using AI tools helped reduce repetitive work, maintain consistent code quality, and allowed greater focus on problem-solving, testing, and system design

 📁 Project Structure

```
sweet-shop-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── init-db.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── sweet.controller.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── sweet.routes.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── sweet.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── __tests__/
│   │   │   ├── auth.service.test.ts
│   │   │   └── sweet.service.test.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── scripts/
│   │   ├── setup-db.ts
│   │   └── seed-db.ts
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── SweetCard.tsx
│   │   │   ├── SweetForm.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── *.css
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tsconfig.json
└── README.md
```

## 📸 Screenshots

### Login Page
<img width="1871" height="929" alt="image" src="https://github.com/user-attachments/assets/50cfe376-d8ce-4834-aa21-25ec448577f1" />

*User-friendly login interface with demo credentials displayed*

### Dashboard - User View
<img width="1919" height="951" alt="image" src="https://github.com/user-attachments/assets/5048d8b0-affb-4d3a-9ba2-4b33fb52c752" />

*Browse and purchase sweets with search and filter capabilities*

### Dashboard - Admin View
<img width="1889" height="967" alt="image" src="https://github.com/user-attachments/assets/12907670-f0bb-49bc-bf43-a02fbcf464b7" />

*Admin interface with additional controls for managing inventory*

### Add/Edit Sweet Form
<img width="512" height="682" alt="image" src="https://github.com/user-attachments/assets/ea5172ce-470d-4e01-8d40-f13958901b2b" />

*Modal form for adding or editing sweet details*

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)

1. Create a new app on your platform
2. Configure a MongoDB Atlas connection and add the `MONGO_URI` environment variable to your platform's settings (or use a managed MongoDB addon)
3. Set `JWT_SECRET` and other secrets in the platform environment
4. Deploy using Git

### Frontend Deployment (Vercel/Netlify)

1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`

## 🤝 Contributing

This is a demonstration project for the Incubyte assessment. However, suggestions and feedback are welcome!

## 📄 License

This project is created for educational and assessment purposes.

## 👤 Author

Created as part of the Incubyte TDD Kata assessment.

---

**Note**: This project was developed following Test-Driven Development (TDD) principles with comprehensive test coverage. All commits include proper attribution for AI assistance as per the assessment requirements.

