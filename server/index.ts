import express, { Response, Request } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import apiRouter from './router/api'

// Load environment variables from .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL parser

// Recommended logging middleware for development

// ROUTERs
app.use('/api', apiRouter); // endpoints and databases stored in api.ts




// // ENDPOINTS 
// root endpoint to guide users
app.get('/', function (req: Request, res: Response) {
  res.json({
    message: 'React Native Expense Tracker API', // API purpose message
    version: '1.0.0', 
    status: 'running',
    endpoints: {
      // login basics
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      users: {
        // profile basics
        profile: 'GET /api/users/profile',
        updateProfile: 'PUT /api/users/profile'
      },
      friends: {
        // friends basics
        list: 'GET /api/friends',
        add: 'POST /api/friends/request',
        delete: 'DELETE /api/friends/:friendId'
      },
      events: {
        // events basics
        list: 'GET /api/events',
        get: 'GET /api/events/:eventId',
        create: 'POST /api/events',
        update: 'PUT /api/events/:eventId',
        delete: 'DELETE /api/events/:eventId',
        shared: 'GET /api/events/shared/:friendId',
        summary: 'GET /api/events/summary'
      },
      // debugging flag
      health: 'GET /api/health'
    },
    // hardcoded sample users
    sampleUsers: [
      { username: 'anonuser', password: 'password123' },
      { username: 'einstein', password: 'password123' },
      { username: 'newton', password: 'password123' }
    ]
  });
});


// 404 handler for unknown routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found', 
    availableRoutes: [
      'GET /',
      'GET /api/health',
      'POST /api/auth/login',
      'POST /api/auth/register'
    ]
  });
});

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});


// Start server
app.listen(PORT, () => {
  console.log('🚀 React Native Expense Tracker API Server');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📱 Ready for React Native app connections`);
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔧 Environment: Development');
    console.log('🔐 Sample login - Username: anonuser, Password: password123');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  process.exit(0);
});