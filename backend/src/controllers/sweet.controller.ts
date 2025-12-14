import { Response } from 'express';
import { SweetService } from '../services/sweet.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class SweetController {
  private sweetService: SweetService;

  constructor() {
    this.sweetService = new SweetService();
  }

  createSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name, category, price, quantity, description } = req.body;

      if (!name || !category || price === undefined || quantity === undefined) {
        res.status(400).json({ error: 'Name, category, price, and quantity are required' });
        return;
      }

      const sweet = await this.sweetService.createSweet({
        name,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        description
      });

      res.status(201).json(sweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllSweets = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const sweets = await this.sweetService.getAllSweets();
      res.status(200).json(sweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  searchSweets = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name, category, minPrice, maxPrice } = req.query;

      const searchParams: any = {};
      if (name) searchParams.name = name as string;
      if (category) searchParams.category = category as string;
      if (minPrice) searchParams.minPrice = parseFloat(minPrice as string);
      if (maxPrice) searchParams.maxPrice = parseFloat(maxPrice as string);

      const sweets = await this.sweetService.searchSweets(searchParams);
      res.status(200).json(sweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
  const id = req.params.id;
      const updateData: any = {};

      if (req.body.name) updateData.name = req.body.name;
      if (req.body.category) updateData.category = req.body.category;
  if (req.body.price !== undefined) updateData.price = parseFloat(req.body.price);
  if (req.body.quantity !== undefined) updateData.quantity = parseInt(req.body.quantity, 10);
      if (req.body.description !== undefined) updateData.description = req.body.description;

      const sweet = await this.sweetService.updateSweet(id, updateData);
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
  const id = req.params.id;
  await this.sweetService.deleteSweet(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  purchaseSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
  const id = req.params.id;
  const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        res.status(400).json({ error: 'Valid quantity is required' });
        return;
      }

  const sweet = await this.sweetService.purchaseSweet(id, parseInt(quantity, 10));
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('Insufficient')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  restockSweet = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
  const id = req.params.id;
  const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        res.status(400).json({ error: 'Valid quantity is required' });
        return;
      }

  const sweet = await this.sweetService.restockSweet(id, parseInt(quantity, 10));
      res.status(200).json(sweet);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
}

