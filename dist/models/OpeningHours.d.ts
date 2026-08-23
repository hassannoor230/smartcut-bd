import mongoose, { Document } from 'mongoose';
export interface DayHours {
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
    is24Hours?: boolean;
}
export interface IOpeningHours extends Document {
    monday: DayHours;
    tuesday: DayHours;
    wednesday: DayHours;
    thursday: DayHours;
    friday: DayHours;
    saturday: DayHours;
    sunday: DayHours;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const OpeningHours: mongoose.Model<IOpeningHours, {}, {}, {}, mongoose.Document<unknown, {}, IOpeningHours, {}, {}> & IOpeningHours & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=OpeningHours.d.ts.map