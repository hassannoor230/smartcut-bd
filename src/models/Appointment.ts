import mongoose, { Document, Schema, Types } from 'mongoose';

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';

export interface IAppointment extends Document {
  customerName: string;
  phone: string;
  customerEmail?: string;
  serviceId?: Types.ObjectId;
  serviceName?: string;
  preferredDate: Date;
  preferredTime?: string;
  message?: string;
  paymentMethod?: 'cash' | 'jazzcash' | 'easypaisa' | 'card';
  paymentReceipt?: string;
  paymentReceiptPublicId?: string;
  status: AppointmentStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    customerEmail: { type: String, trim: true },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
    serviceName: { type: String },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String },
    message: { type: String },
    paymentMethod: {
      type: String,
      enum: ['cash', 'jazzcash', 'easypaisa', 'card'],
    },
    paymentReceipt: { type: String },
    paymentReceiptPublicId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'],
      default: 'pending',
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

AppointmentSchema.index({ status: 1 });
AppointmentSchema.index({ preferredDate: 1 });
AppointmentSchema.index({ createdAt: -1 });

export const Appointment =
  mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
