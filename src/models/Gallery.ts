import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  imageUrl: string;
  thumbnailUrl?: string;
  publicId?: string;
  category: string;
  altText: string;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    publicId: { type: String },
    category: { type: String, default: 'general', trim: true },
    altText: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

GallerySchema.index({ active: 1, sortOrder: 1 });
GallerySchema.index({ featured: 1 });

export const Gallery = mongoose.model<IGallery>('Gallery', GallerySchema);
