import mongoose, { Document } from 'mongoose';
export interface IFAQ extends Document {
    question: string;
    answer: string;
    active: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const FAQ: mongoose.Model<IFAQ, {}, {}, {}, mongoose.Document<unknown, {}, IFAQ, {}, {}> & IFAQ & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=FAQ.d.ts.map