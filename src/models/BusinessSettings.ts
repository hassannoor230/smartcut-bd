import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessSettings extends Document {
  businessName: string;
  category: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  city: string;
  country: string;
  googleRating: number;
  googleReviewCount: number;
  googleMapsUrl?: string;
  googleMapsEmbedUrl?: string;
  websiteUrl?: string;
  logoUrl?: string;
  faviconUrl?: string;
  aboutText?: string;
  announcementText?: string;
  announcementEnabled: boolean;
  whatsappEnabled: boolean;
  bookingEnabled: boolean;
  instagramUrl?: string;
  facebookUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BusinessSettingsSchema = new Schema<IBusinessSettings>(
  {
    businessName: { type: String, required: true, default: 'Smartcut – Rahwali Gujranwala' },
    category: { type: String, default: "Men's Hair Salon / Men's Hair & Grooming" },
    phone: { type: String, required: true, default: '+92 321 1115925' },
    whatsapp: { type: String },
    email: { type: String },
    address: {
      type: String,
      required: true,
      default: 'Rahwali, GT Road, opposite DC Colony Gate, Gujranwala, Pakistan',
    },
    city: { type: String, default: 'Gujranwala' },
    country: { type: String, default: 'Pakistan' },
    googleRating: { type: Number, default: 4.7 },
    googleReviewCount: { type: Number, default: 493 },
    googleMapsUrl: { type: String },
    googleMapsEmbedUrl: { type: String },
    websiteUrl: { type: String },
    logoUrl: { type: String },
    faviconUrl: { type: String },
    aboutText: { type: String },
    announcementText: { type: String },
    announcementEnabled: { type: Boolean, default: false },
    whatsappEnabled: { type: Boolean, default: false },
    bookingEnabled: { type: Boolean, default: true },
    instagramUrl: { type: String },
    facebookUrl: { type: String },
  },
  { timestamps: true }
);

export const BusinessSettings = mongoose.model<IBusinessSettings>('BusinessSettings', BusinessSettingsSchema);
