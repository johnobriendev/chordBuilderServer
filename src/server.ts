import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and logging middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

//db test route
app.get('/api/db-test', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1 as test`;
    res.json({ 
      database: 'connected', 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      database: 'disconnected', 
      error: 'Connection failed' 
    });
  }
});


//api routes
app.use('/api/auth', authRoutes);


// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});