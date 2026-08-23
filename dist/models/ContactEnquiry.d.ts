import mongoose, { Document } from 'mongoose';
export type EnquiryStatus = 'new' | 'read' | 'replied' | 'archived';
export interface IContactEnquiry extends Document {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    message: string;
    status: EnquiryStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ContactEnquiry: mongoose.Model<IContactEnquiry, {}, {}, {}, mongoose.Document<unknown, {}, IContactEnquiry, {}, {}> & IContactEnquiry & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=ContactEnquiry.d.ts.map