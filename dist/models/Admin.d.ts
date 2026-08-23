import mongoose, { Document } from 'mongoose';
export type AdminRole = 'superadmin' | 'admin';
export interface IAdmin extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: AdminRole;
    active: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Admin: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Admin.d.ts.map