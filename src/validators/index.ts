import { z } from 'zod';

const phoneRegex = /^(\+92|0)?3\d{9}$/;

export const phoneSchema = z
  .string()
  .min(10)
  .transform((val) => val.replace(/[\s\-]/g, ''))
  .refine((val) => phoneRegex.test(val) || val.length >= 10, {
    message: 'Invalid Pakistan phone number',
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const appointmentSchema = z.object({
  customerName: z.string().min(2).max(100),
  phone: phoneSchema,
  customerEmail: z.string().email().optional().or(z.literal('')),
  serviceId: z.string().optional(),
  serviceName: z.string().optional(),
  preferredDate: z.string().or(z.date()),
  preferredTime: z.string().optional(),
  message: z.string().max(1000).optional(),
  paymentMethod: z.enum(['cash', 'jazzcash', 'easypaisa', 'card']).optional(),
  paymentReceipt: z.string().optional(),
  paymentReceiptPublicId: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  phone: phoneSchema,
  email: z.string().email().optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(5).max(2000),
});

export const serviceSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  price: z.number().nullable().optional(),
  duration: z.number().nullable().optional(),
  category: z.string().min(1),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const gallerySchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().url().or(z.string().min(1)),
  thumbnailUrl: z.string().optional(),
  publicId: z.string().optional(),
  category: z.string().optional(),
  altText: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const reviewSchema = z.object({
  author: z.string().min(1),
  rating: z.number().min(1).max(5),
  text: z.string().min(1),
  date: z.string().or(z.date()).optional(),
  source: z.string().optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  active: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const businessSettingsSchema = z.object({
  businessName: z.string().optional(),
  category: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  googleRating: z.number().min(0).max(5).optional(),
  googleReviewCount: z.number().min(0).optional(),
  googleMapsUrl: z.string().optional(),
  googleMapsEmbedUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  aboutText: z.string().optional(),
  announcementText: z.string().optional(),
  announcementEnabled: z.boolean().optional(),
  whatsappEnabled: z.boolean().optional(),
  bookingEnabled: z.boolean().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
});

export const openingHoursSchema = z.object({
  monday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  tuesday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  wednesday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  thursday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  friday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  saturday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  sunday: z.object({
    isOpen: z.boolean(),
    openTime: z.string().optional(),
    closeTime: z.string().optional(),
    is24Hours: z.boolean().optional(),
  }).optional(),
  note: z.string().optional(),
});
