import { z } from 'zod';
export declare const phoneSchema: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const appointmentSchema: z.ZodObject<{
    customerName: z.ZodString;
    phone: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    serviceId: z.ZodOptional<z.ZodString>;
    serviceName: z.ZodOptional<z.ZodString>;
    preferredDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    preferredTime: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    phone: string;
    customerName: string;
    preferredDate: string | Date;
    message?: string | undefined;
    serviceId?: string | undefined;
    serviceName?: string | undefined;
    preferredTime?: string | undefined;
}, {
    phone: string;
    customerName: string;
    preferredDate: string | Date;
    message?: string | undefined;
    serviceId?: string | undefined;
    serviceName?: string | undefined;
    preferredTime?: string | undefined;
}>;
export declare const contactSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    service: z.ZodOptional<z.ZodString>;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    message: string;
    phone: string;
    email?: string | undefined;
    service?: string | undefined;
}, {
    name: string;
    message: string;
    phone: string;
    email?: string | undefined;
    service?: string | undefined;
}>;
export declare const serviceSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    duration: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    category: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
    featured: z.ZodOptional<z.ZodBoolean>;
    active: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    category: string;
    description?: string | undefined;
    price?: number | null | undefined;
    duration?: number | null | undefined;
    image?: string | undefined;
    featured?: boolean | undefined;
    active?: boolean | undefined;
    sortOrder?: number | undefined;
}, {
    name: string;
    category: string;
    description?: string | undefined;
    price?: number | null | undefined;
    duration?: number | null | undefined;
    image?: string | undefined;
    featured?: boolean | undefined;
    active?: boolean | undefined;
    sortOrder?: number | undefined;
}>;
export declare const gallerySchema: z.ZodObject<{
    title: z.ZodString;
    imageUrl: z.ZodUnion<[z.ZodString, z.ZodString]>;
    thumbnailUrl: z.ZodOptional<z.ZodString>;
    publicId: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    altText: z.ZodOptional<z.ZodString>;
    featured: z.ZodOptional<z.ZodBoolean>;
    active: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    title: string;
    imageUrl: string;
    category?: string | undefined;
    featured?: boolean | undefined;
    active?: boolean | undefined;
    sortOrder?: number | undefined;
    thumbnailUrl?: string | undefined;
    publicId?: string | undefined;
    altText?: string | undefined;
}, {
    title: string;
    imageUrl: string;
    category?: string | undefined;
    featured?: boolean | undefined;
    active?: boolean | undefined;
    sortOrder?: number | undefined;
    thumbnailUrl?: string | undefined;
    publicId?: string | undefined;
    altText?: string | undefined;
}>;
export declare const reviewSchema: z.ZodObject<{
    author: z.ZodString;
    rating: z.ZodNumber;
    text: z.ZodString;
    date: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodDate]>>;
    source: z.ZodOptional<z.ZodString>;
    verified: z.ZodOptional<z.ZodBoolean>;
    featured: z.ZodOptional<z.ZodBoolean>;
    active: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    text: string;
    author: string;
    rating: number;
    featured?: boolean | undefined;
    active?: boolean | undefined;
    date?: string | Date | undefined;
    source?: string | undefined;
    verified?: boolean | undefined;
}, {
    text: string;
    author: string;
    rating: number;
    featured?: boolean | undefined;
    active?: boolean | undefined;
    date?: string | Date | undefined;
    source?: string | undefined;
    verified?: boolean | undefined;
}>;
export declare const faqSchema: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodString;
    active: z.ZodOptional<z.ZodBoolean>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    question: string;
    answer: string;
    active?: boolean | undefined;
    sortOrder?: number | undefined;
}, {
    question: string;
    answer: string;
    active?: boolean | undefined;
    sortOrder?: number | undefined;
}>;
export declare const businessSettingsSchema: z.ZodObject<{
    businessName: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    whatsapp: z.ZodOptional<z.ZodString>;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    googleRating: z.ZodOptional<z.ZodNumber>;
    googleReviewCount: z.ZodOptional<z.ZodNumber>;
    googleMapsUrl: z.ZodOptional<z.ZodString>;
    googleMapsEmbedUrl: z.ZodOptional<z.ZodString>;
    websiteUrl: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    faviconUrl: z.ZodOptional<z.ZodString>;
    aboutText: z.ZodOptional<z.ZodString>;
    announcementText: z.ZodOptional<z.ZodString>;
    announcementEnabled: z.ZodOptional<z.ZodBoolean>;
    whatsappEnabled: z.ZodOptional<z.ZodBoolean>;
    bookingEnabled: z.ZodOptional<z.ZodBoolean>;
    instagramUrl: z.ZodOptional<z.ZodString>;
    facebookUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    category?: string | undefined;
    businessName?: string | undefined;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    googleRating?: number | undefined;
    googleReviewCount?: number | undefined;
    googleMapsUrl?: string | undefined;
    googleMapsEmbedUrl?: string | undefined;
    websiteUrl?: string | undefined;
    logoUrl?: string | undefined;
    faviconUrl?: string | undefined;
    aboutText?: string | undefined;
    announcementText?: string | undefined;
    announcementEnabled?: boolean | undefined;
    whatsappEnabled?: boolean | undefined;
    bookingEnabled?: boolean | undefined;
    instagramUrl?: string | undefined;
    facebookUrl?: string | undefined;
}, {
    category?: string | undefined;
    businessName?: string | undefined;
    phone?: string | undefined;
    whatsapp?: string | undefined;
    email?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    country?: string | undefined;
    googleRating?: number | undefined;
    googleReviewCount?: number | undefined;
    googleMapsUrl?: string | undefined;
    googleMapsEmbedUrl?: string | undefined;
    websiteUrl?: string | undefined;
    logoUrl?: string | undefined;
    faviconUrl?: string | undefined;
    aboutText?: string | undefined;
    announcementText?: string | undefined;
    announcementEnabled?: boolean | undefined;
    whatsappEnabled?: boolean | undefined;
    bookingEnabled?: boolean | undefined;
    instagramUrl?: string | undefined;
    facebookUrl?: string | undefined;
}>;
export declare const openingHoursSchema: z.ZodObject<{
    monday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    tuesday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    wednesday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    thursday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    friday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    saturday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    sunday: z.ZodOptional<z.ZodObject<{
        isOpen: z.ZodBoolean;
        openTime: z.ZodOptional<z.ZodString>;
        closeTime: z.ZodOptional<z.ZodString>;
        is24Hours: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }, {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    }>>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    monday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    tuesday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    wednesday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    thursday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    friday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    saturday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    sunday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    note?: string | undefined;
}, {
    monday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    tuesday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    wednesday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    thursday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    friday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    saturday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    sunday?: {
        isOpen: boolean;
        openTime?: string | undefined;
        closeTime?: string | undefined;
        is24Hours?: boolean | undefined;
    } | undefined;
    note?: string | undefined;
}>;
//# sourceMappingURL=index.d.ts.map