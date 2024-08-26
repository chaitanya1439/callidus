import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, address } = req.body;
  const userId = (req.user as any).id;

  const restaurant = await prisma.restaurant.create({
    data: {
      name,
      address,
      userId,
    },
  });

  return res.status(201).json({ message: 'Restaurant created successfully', restaurant });
};

export const getRestaurants = async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  const restaurants = await prisma.restaurant.findMany({
    where: { userId },
    include: { menu: true },
  });

  return res.status(200).json({ restaurants });
};

export const addMenuItem = async (req: Request, res: Response) => {
  const { restaurantId, name, description, price } = req.body;

  const menuItem = await prisma.menuItem.create({
    data: {
      name,
      description,
      price,
      restaurantId,
    },
  });

  return res.status(201).json({ message: 'Menu item added successfully', menuItem });
};

export const getMenuItems = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  const menuItems = await prisma.menuItem.findMany({
    where: { restaurantId: parseInt(restaurantId) },
  });

  return res.status(200).json({ menuItems });
};
