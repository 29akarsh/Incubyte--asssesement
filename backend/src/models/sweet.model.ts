import { Schema, model, Document } from 'mongoose';

export interface ISweet extends Document {
  name: string;
  category: string;
  // price stored in paise (integer) to avoid floating point issues
  price_paise: number;
  quantity: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

const sweetSchema = new Schema<ISweet>({
  name: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  // store price as integer paise
  price_paise: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Update `updated_at` on save
sweetSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

// Indexes to speed up searches
// index on price_paise for range queries
sweetSchema.index({ name: 'text', category: 1, price_paise: 1 });

const Sweet = model<ISweet>('Sweet', sweetSchema);

export default Sweet;
