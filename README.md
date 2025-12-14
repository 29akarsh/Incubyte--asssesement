# 🍬 Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with modern technologies and following Test-Driven Development (TDD) principles.

## 📋 Table of Contents

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

## ✨ Features

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

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## 🚀 Installation

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

## 🏃 Running the Application

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

## 🧪 Testing

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

## 📚 API Documentation

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

## 🤖 My AI Usage

### AI Tools Used

I used **Augment AI Agent** (powered by Claude Sonnet 4.5 by Anthropic) throughout this project to accelerate development while maintaining code quality and following TDD principles.

### How I Used AI

#### 1. Project Architecture & Planning
- **What I did**: Asked the AI to help design the overall architecture, including the separation of concerns between backend and frontend, database schema design, and API endpoint structure.
- **Impact**: Saved significant time in the planning phase and ensured I followed industry best practices for a full-stack application.

#### 2. Test-Driven Development (TDD)
- **What I did**: Used AI to help write comprehensive test cases BEFORE implementing the actual functionality. This included:
  - Unit tests for authentication service (registration, login, password hashing)
  - Unit tests for sweet management service (CRUD operations, purchase, restock)
  - Edge cases and error handling scenarios
- **Impact**: The AI helped me think through all possible test scenarios, ensuring high code coverage and robust error handling. This is evident in the test files where tests were written first, then implementation followed.

#### 3. Boilerplate Code Generation
- **What I did**: Used AI to generate initial boilerplate for:
  - TypeScript configuration files (tsconfig.json, jest.config.js)
  - Express server setup with middleware
  - Database connection and initialization scripts
  - React component structure
- **Impact**: Reduced repetitive coding tasks by approximately 40%, allowing me to focus on business logic and user experience.

#### 4. Database Schema & Migrations
- **What I did**: Collaborated with AI to design MongoDB document models (Mongoose) with proper indexes, constraints, and migrations.
  - Implemented paise-based price storage to avoid floating point rounding issues.
- **Impact**: Ensured optimal database performance with proper indexing on searchable fields (name, category, price_paise).

#### 5. Frontend Component Development
- **What I did**: Used AI to help create React components with TypeScript, including:
  - Authentication context and hooks
  - Reusable components (SweetCard, SearchBar, SweetForm)
  - Routing and protected routes
- **Impact**: Maintained consistent code patterns and TypeScript type safety throughout the frontend.

#### 6. Styling & UX
- **What I did**: Asked AI for modern CSS styling patterns and responsive design suggestions.
- **Impact**: Created a visually appealing, professional-looking interface with smooth transitions and intuitive user experience.

#### 7. Error Handling & Validation
- **What I did**: Used AI to identify potential error scenarios and implement comprehensive validation on both frontend and backend.
- **Impact**: The application handles edge cases gracefully with user-friendly error messages.

#### 8. Documentation
- **What I did**: Collaborated with AI to create comprehensive README documentation, API documentation, and inline code comments.
- **Impact**: Produced clear, professional documentation that makes the project easy to understand and maintain.

### Reflection on AI Impact

**Positive Impacts:**
- **Speed**: Development time was reduced by approximately 50-60% compared to coding everything manually.
- **Quality**: AI helped maintain consistent code quality, proper TypeScript typing, and comprehensive test coverage.
- **Learning**: I learned new patterns and best practices by reviewing AI-generated code and understanding the reasoning behind certain implementations.
- **Focus**: By automating boilerplate and repetitive tasks, I could focus more on business logic, user experience, and architecture decisions.

**Challenges & Learnings:**
- **Code Review**: I had to carefully review all AI-generated code to ensure it met the specific requirements and followed the project's patterns.
- **Context Understanding**: Sometimes the AI needed clarification on specific requirements, teaching me to be more precise in my requests.
- **Testing Validation**: While AI wrote tests, I had to verify they actually tested the right scenarios and weren't just passing trivially.

**Best Practices I Developed:**
1. Always review and understand AI-generated code before committing
2. Use AI for initial structure, then refine based on specific needs
3. Leverage AI for test case brainstorming to ensure comprehensive coverage
4. Ask AI to explain complex code patterns to deepen understanding

### Transparency

All code in this project was developed with AI assistance. The AI acted as a pair programming partner, helping with:
- Code generation
- Test writing
- Documentation
- Debugging
- Best practice recommendations

However, all final decisions on architecture, implementation details, and code quality were made by me after careful review and understanding of the AI's suggestions.

## 📁 Project Structure

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
![Login Page](screenshots/login.png)
*User-friendly login interface with demo credentials displayed*

### Dashboard - User View
![Dashboard User](screenshots/dashboard-user.png)
*Browse and purchase sweets with search and filter capabilities*

### Dashboard - Admin View
![Dashboard Admin](screenshots/dashboard-admin.png)
*Admin interface with additional controls for managing inventory*

### Add/Edit Sweet Form
![Sweet Form](screenshots/sweet-form.png)
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

