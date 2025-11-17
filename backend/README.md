# Catálogo de Carros - Backend API

## Description
Backend REST API for car catalog application with vehicle listing, details viewing, and contact form functionality.

## Features
- Vehicle listing with filtering and sorting
- Detailed vehicle information
- Contact form submission

## Technology Stack
- Node.js
- TypeScript
- Express.js
- In-memory data storage (no database)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd catalogo-carros-backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```

4. Start development server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## API Documentation

### Base URL
```
Development: http://localhost:3000/api/v1
Production: https://api.yourdomain.com/api/v1
```

### Health Check
```
GET /health
```

### API Endpoints

Endpoints will be added as features are implemented:
- Vehicle listing
- Vehicle details
- Contact form submission

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
└── server.ts              # Application entry point
```

## Development Guidelines

- Follow TypeScript strict mode
- Use camelCase for file names
- Implement proper error handling
- Add TSDoc comments for functions
- Keep business logic in services
- Use in-memory storage (arrays/Maps)

## License
ISC
