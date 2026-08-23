import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  author: string;
  rating: number;
  text: string;
  date: Date;
  source: string;
  verified: boolean;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    source: { type: String, default: 'Google' },
    verified: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ReviewSchema.index({ active: 1, featured: 1 });

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
