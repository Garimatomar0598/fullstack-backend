# Backend - Full-Stack Intern Assignment

This is the backend part of the Full-Stack Intern Assignment. It is built with Node.js, Express, TypeScript, and Prisma.

## Features

- User authentication (signup, login, logout)
- JWT-based authentication
- Prisma ORM for database operations
- TypeScript for type safety
- Error handling middleware
- Input validation with Zod

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the backend directory:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Setup the database:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The server will run at http://localhost:5000 by default.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Then, you can start the production server:

```bash
npm run start
# or
yarn start
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
  - Request body: `{ email: string, password: string }`
  - Response: `{ id: string, email: string, createdAt: string, updatedAt: string }`

- `POST /api/auth/login` - Login user
  - Request body: `{ email: string, password: string }`
  - Response: `{ token: string, user: { id: string, email: string, createdAt: string, updatedAt: string } }`

- `GET /api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ id: string, email: string, createdAt: string, updatedAt: string }`

- `POST /api/auth/logout` - Logout user (requires authentication)
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ message: string }`

## Project Structure

- `src/controllers/`: Business logic for handling requests
- `src/middleware/`: Middleware functions for request processing
- `src/routes/`: API endpoint definitions
- `src/schemas/`: Zod validation schemas
- `prisma/`: Prisma schema and migrations

## Technologies Used

- Node.js
- Express
- TypeScript
- Prisma ORM
- JSON Web Tokens (JWT)
- Zod
- bcrypt#   f u l l s t a c k - b a c k e n d  
 #   f u l l s t a c k - b a c k e n d  
 