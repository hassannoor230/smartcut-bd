import mongoose, { Document } from 'mongoose';
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
export declare const BusinessSettings: mongoose.Model<IBusinessSettings, {}, {}, {}, mongoose.Document<unknown, {}, IBusinessSettings, {}, {}> & IBusinessSettings & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=BusinessSettings.d.ts.map