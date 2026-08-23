import mongoose, { Document, Schema } from 'mongoose';

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

const ContactEnquirySchema = new Schema<IContactEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    service: { type: String, trim: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

ContactEnquirySchema.index({ status: 1 });
ContactEnquirySchema.index({ createdAt: -1 });

export const ContactEnquiry = mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
