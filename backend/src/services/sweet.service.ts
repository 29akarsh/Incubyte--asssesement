import SweetModel, { ISweet } from '../models/sweet.model';
import { Sweet } from '../types';

interface CreateSweetData {
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
}

interface UpdateSweetData {
  name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  description?: string;
}

interface SearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export class SweetService {
  async createSweet(data: CreateSweetData): Promise<Sweet> {
    const { name, category, price, quantity, description } = data;

    if (!name || !category || price === undefined || quantity === undefined) {
      throw new Error('Name, category, price, and quantity are required');
    }

    if (price < 0 || quantity < 0) {
      throw new Error('Price and quantity must be non-negative');
    }

    // store price in paise to avoid floating point issues
    const pricePaise = Math.round(price * 100);
    const created = await SweetModel.create({ name, category, price_paise: pricePaise, quantity, description });
    return {
      id: created._id.toString() as any,
      name: created.name,
      category: created.category,
      // convert back to rupees for API
      price: created.price_paise / 100,
      quantity: created.quantity,
      description: created.description,
      created_at: created.created_at,
      updated_at: created.updated_at
    };
  }

  async getAllSweets(): Promise<Sweet[]> {
    const docs = await SweetModel.find().sort({ created_at: -1 }).lean();
    return docs.map(d => ({
      id: d._id.toString() as any,
      name: d.name,
      category: d.category,
      price: (d as any).price_paise / 100,
      quantity: d.quantity,
      description: d.description,
      created_at: d.created_at,
      updated_at: d.updated_at
    }));
  }

  async getSweetById(id: string | number): Promise<Sweet | null> {
    const doc = await SweetModel.findById(id as any).lean();
    if (!doc) return null;
    return {
      id: doc._id.toString() as any,
      name: doc.name,
      category: doc.category,
      price: (doc as any).price_paise / 100,
      quantity: doc.quantity,
      description: doc.description,
      created_at: doc.created_at,
      updated_at: doc.updated_at
    };
  }

  async searchSweets(params: SearchParams): Promise<Sweet[]> {
    const { name, category, minPrice, maxPrice } = params;
    const filter: any = {};
    if (name) filter.$text = { $search: name };
    if (category) filter.category = category;
    if (minPrice !== undefined || maxPrice !== undefined) {
      // convert rupees to paise for querying
      filter.price_paise = {} as any;
      if (minPrice !== undefined) filter.price_paise.$gte = Math.round(minPrice * 100);
      if (maxPrice !== undefined) filter.price_paise.$lte = Math.round(maxPrice * 100);
    }

    const docs = await SweetModel.find(filter).sort({ created_at: -1 }).lean();
    return docs.map(d => ({
      id: d._id.toString() as any,
      name: d.name,
      category: d.category,
      price: (d as any).price_paise / 100,
      quantity: d.quantity,
      description: d.description,
      created_at: d.created_at,
      updated_at: d.updated_at
    }));
  }

  async updateSweet(id: string | number, data: UpdateSweetData): Promise<Sweet> {
    const updatePayload: any = { ...data, updated_at: new Date() };
    if (data.price !== undefined) {
      updatePayload.price_paise = Math.round((data.price as number) * 100);
      delete updatePayload.price;
    }
    const updated = await SweetModel.findByIdAndUpdate(id as any, updatePayload, { new: true }).lean();
    if (!updated) throw new Error('Sweet not found');
    return {
      id: updated._id.toString() as any,
      name: updated.name,
      category: updated.category,
      price: (updated as any).price_paise / 100,
      quantity: updated.quantity,
      description: updated.description,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    };
  }

  async deleteSweet(id: string | number): Promise<void> {
    const res = await SweetModel.findByIdAndDelete(id as any).lean();
    if (!res) throw new Error('Sweet not found');
  }

  async purchaseSweet(id: string | number, quantity: number): Promise<Sweet> {
    if (quantity <= 0) {
      throw new Error('Purchase quantity must be positive');
    }

    // Use transaction-like approach with findOneAndUpdate and $inc
    const doc = await SweetModel.findOne({ _id: id as any }).lean();
    if (!doc) throw new Error('Sweet not found');
    if (doc.quantity < quantity) throw new Error('Insufficient quantity in stock');

    const updated = await SweetModel.findByIdAndUpdate(
      id as any,
      { $inc: { quantity: -quantity }, updated_at: new Date() },
      { new: true }
    ).lean();

    if (!updated) throw new Error('Sweet not found after update');

    return {
      id: updated._id.toString() as any,
      name: updated.name,
      category: updated.category,
      price: (updated as any).price_paise / 100,
      quantity: updated.quantity,
      description: updated.description,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    };
  }

  async restockSweet(id: string | number, quantity: number): Promise<Sweet> {
    if (quantity <= 0) {
      throw new Error('Restock quantity must be positive');
    }

    const updated = await SweetModel.findByIdAndUpdate(
      id as any,
      { $inc: { quantity }, updated_at: new Date() },
      { new: true }
    ).lean();

    if (!updated) throw new Error('Sweet not found');

    return {
      id: updated._id.toString() as any,
      name: updated.name,
      category: updated.category,
      price: (updated as any).price_paise / 100,
      quantity: updated.quantity,
      description: updated.description,
      created_at: updated.created_at,
      updated_at: updated.updated_at
    };
  }
}
