import mongoose, { Document } from 'mongoose';
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
export declare const Service: mongoose.Model<IService, {}, {}, {}, mongoose.Document<unknown, {}, IService, {}, {}> & IService & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Service.d.ts.map