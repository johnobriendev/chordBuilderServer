import express, { Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

// Public test route (no auth required)
router.get('/public', (req: Request, res: Response) => {
  res.json({ 
    message: 'This is a public route - no authentication required',
    timestamp: new Date().toISOString()
  });
});

// Protected test route (auth required)
router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.json({ 
    message: 'You are authenticated!',
    userId: req.auth?.payload.sub,
    userInfo: req.auth?.payload
  });
});

export default router;