import mongoose, { Document } from 'mongoose';
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
export declare const Review: mongoose.Model<IReview, {}, {}, {}, mongoose.Document<unknown, {}, IReview, {}, {}> & IReview & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Review.d.ts.map