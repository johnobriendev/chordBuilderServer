import express, { Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get or create current user
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const auth0UserId = req.auth?.payload.sub;
    
    if (!auth0UserId) {
      res.status(400).json({ error: 'User ID not found' });
      return;
    }

    // Find existing user or create new one
    let user = await prisma.user.findUnique({
      where: { auth0UserId }
    });

    if (!user) {
      // Create new user - be explicit about string conversion
      const name = req.auth?.payload.name;
      const email = req.auth?.payload.email;
      
      const displayName = (typeof name === 'string' && name) || 
                         (typeof email === 'string' && email) || 
                         'User';

      user = await prisma.user.create({
        data: {
          auth0UserId,
          displayName
        }
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error with user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;