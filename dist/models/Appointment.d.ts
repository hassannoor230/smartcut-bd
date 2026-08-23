import mongoose, { Document, Types } from 'mongoose';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';
export interface IAppointment extends Document {
    customerName: string;
    phone: string;
    serviceId?: Types.ObjectId;
    serviceName?: string;
    preferredDate: Date;
    preferredTime?: string;
    message?: string;
    status: AppointmentStatus;
    adminNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Appointment: mongoose.Model<IAppointment, {}, {}, {}, mongoose.Document<unknown, {}, IAppointment, {}, {}> & IAppointment & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Appointment.d.ts.map