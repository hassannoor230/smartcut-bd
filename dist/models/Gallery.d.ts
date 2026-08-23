import mongoose, { Document } from 'mongoose';
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
export declare const Gallery: mongoose.Model<IGallery, {}, {}, {}, mongoose.Document<unknown, {}, IGallery, {}, {}> & IGallery & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Gallery.d.ts.map