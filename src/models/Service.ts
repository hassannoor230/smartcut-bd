import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  name: string;
  slug: string;
  description: string;
  price: number | null;
  duration: number | null;
  category: string;
  image?: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  isPlaceholder: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    price: { type: Number, default: null },
    duration: { type: Number, default: null },
    category: { type: String, required: true, trim: true },
    image: { type: String },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    isPlaceholder: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ServiceSchema.index({ active: 1, sortOrder: 1 });
ServiceSchema.index({ featured: 1 });

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
