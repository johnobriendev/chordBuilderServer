import express, { Request, Response } from 'express';
import { requireAuth } from '../middleware/auth';
import prisma from '../lib/prisma';

const router = express.Router();

// Get all sheets for current user
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const auth0UserId = req.auth?.payload.sub;
    
    // Find user first
    const user = await prisma.user.findUnique({
      where: { auth0UserId }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get user's sheets with chord counts
    const sheets = await prisma.chordSheet.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: { chords: true }
        }
      }
    });

    res.json({ sheets });
  } catch (error) {
    console.error('Error fetching sheets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new sheet
router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const auth0UserId = req.auth?.payload.sub;
    const { title, description, gridType, gridRows, gridCols, chords } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { auth0UserId }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Create sheet with chords in a transaction
    const sheet = await prisma.chordSheet.create({
      data: {
        userId: user.id,
        title,
        description,
        gridType,
        gridRows,
        gridCols,
        chords: {
          create: chords?.map((chord: any, index: number) => ({
            title: chord.title,
            positionInSheet: index,
            numStrings: chord.numStrings,
            numFrets: chord.numFrets,
            fretNumbers: chord.fretNumbers,
            notes: chord.notes,
            openStrings: chord.openStrings
          })) || []
        }
      },
      include: {
        chords: true,
        _count: {
          select: { chords: true }
        }
      }
    });

    res.status(201).json({ sheet });
  } catch (error) {
    console.error('Error creating sheet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific sheet with all chords
router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const auth0UserId = req.auth?.payload.sub;
    const { id } = req.params;

    // Find user
    const user = await prisma.user.findUnique({
      where: { auth0UserId }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Get sheet with chords
    const sheet = await prisma.chordSheet.findFirst({
      where: { 
        id,
        userId: user.id 
      },
      include: {
        chords: {
          orderBy: { positionInSheet: 'asc' }
        }
      }
    });

    if (!sheet) {
      res.status(404).json({ error: 'Sheet not found' });
      return;
    }

    res.json({ sheet });
  } catch (error) {
    console.error('Error fetching sheet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;