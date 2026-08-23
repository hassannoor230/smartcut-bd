"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openingHoursSchema = exports.businessSettingsSchema = exports.faqSchema = exports.reviewSchema = exports.gallerySchema = exports.serviceSchema = exports.contactSchema = exports.appointmentSchema = exports.loginSchema = exports.phoneSchema = void 0;
const zod_1 = require("zod");
const phoneRegex = /^(\+92|0)?3\d{9}$/;
exports.phoneSchema = zod_1.z
    .string()
    .min(10)
    .transform((val) => val.replace(/[\s\-]/g, ''))
    .refine((val) => phoneRegex.test(val) || val.length >= 10, {
    message: 'Invalid Pakistan phone number',
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.appointmentSchema = zod_1.z.object({
    customerName: zod_1.z.string().min(2).max(100),
    phone: exports.phoneSchema,
    serviceId: zod_1.z.string().optional(),
    serviceName: zod_1.z.string().optional(),
    preferredDate: zod_1.z.string().or(zod_1.z.date()),
    preferredTime: zod_1.z.string().optional(),
    message: zod_1.z.string().max(1000).optional(),
});
exports.contactSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    phone: exports.phoneSchema,
    email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
    service: zod_1.z.string().optional(),
    message: zod_1.z.string().min(5).max(2000),
});
exports.serviceSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().nullable().optional(),
    duration: zod_1.z.number().nullable().optional(),
    category: zod_1.z.string().min(1),
    image: zod_1.z.string().optional(),
    featured: zod_1.z.boolean().optional(),
    active: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().optional(),
});
exports.gallerySchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    imageUrl: zod_1.z.string().url().or(zod_1.z.string().min(1)),
    thumbnailUrl: zod_1.z.string().optional(),
    publicId: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    altText: zod_1.z.string().optional(),
    featured: zod_1.z.boolean().optional(),
    active: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().optional(),
});
exports.reviewSchema = zod_1.z.object({
    author: zod_1.z.string().min(1),
    rating: zod_1.z.number().min(1).max(5),
    text: zod_1.z.string().min(1),
    date: zod_1.z.string().or(zod_1.z.date()).optional(),
    source: zod_1.z.string().optional(),
    verified: zod_1.z.boolean().optional(),
    featured: zod_1.z.boolean().optional(),
    active: zod_1.z.boolean().optional(),
});
exports.faqSchema = zod_1.z.object({
    question: zod_1.z.string().min(5),
    answer: zod_1.z.string().min(5),
    active: zod_1.z.boolean().optional(),
    sortOrder: zod_1.z.number().optional(),
});
exports.businessSettingsSchema = zod_1.z.object({
    businessName: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    whatsapp: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
    address: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    googleRating: zod_1.z.number().min(0).max(5).optional(),
    googleReviewCount: zod_1.z.number().min(0).optional(),
    googleMapsUrl: zod_1.z.string().optional(),
    googleMapsEmbedUrl: zod_1.z.string().optional(),
    websiteUrl: zod_1.z.string().optional(),
    logoUrl: zod_1.z.string().optional(),
    faviconUrl: zod_1.z.string().optional(),
    aboutText: zod_1.z.string().optional(),
    announcementText: zod_1.z.string().optional(),
    announcementEnabled: zod_1.z.boolean().optional(),
    whatsappEnabled: zod_1.z.boolean().optional(),
    bookingEnabled: zod_1.z.boolean().optional(),
    instagramUrl: zod_1.z.string().optional(),
    facebookUrl: zod_1.z.string().optional(),
});
exports.openingHoursSchema = zod_1.z.object({
    monday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    tuesday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    wednesday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    thursday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    friday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    saturday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    sunday: zod_1.z.object({
        isOpen: zod_1.z.boolean(),
        openTime: zod_1.z.string().optional(),
        closeTime: zod_1.z.string().optional(),
        is24Hours: zod_1.z.boolean().optional(),
    }).optional(),
    note: zod_1.z.string().optional(),
});
//# sourceMappingURL=index.js.map