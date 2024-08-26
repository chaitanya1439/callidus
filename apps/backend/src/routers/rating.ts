import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitRating = async (req: Request, res: Response): Promise<void> => {
  const { rateeId, rating, comment } = req.body;
  const raterId = (req.user as any).id; // Assuming you have user authentication

  try {
    // Ensure rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: 'Rating must be between 1 and 5' });
      return;
    }

    const ratingEntry = await prisma.rating.create({
      data: {
        raterId,
        rateeId,
        rating,
        comment,
      },
    });

    res.status(201).json(ratingEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRatings = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const ratings = await prisma.rating.findMany({
      where: { rateeId: (userId) },
      include: {
        rater: true, // Include rater details if needed
      },
    });

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
