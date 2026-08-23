import mongoose, { Document, Schema } from 'mongoose';

export interface DayHours {
  isOpen: boolean;
  openTime?: string; // HH:mm
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
  note?: string; // e.g. [CONFIRM OPENING HOURS]
  createdAt: Date;
  updatedAt: Date;
}

const DayHoursSchema = new Schema(
  {
    isOpen: { type: Boolean, default: false },
    openTime: { type: String },
    closeTime: { type: String },
    is24Hours: { type: Boolean, default: false },
  },
  { _id: false }
);

const OpeningHoursSchema = new Schema<IOpeningHours>(
  {
    monday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    tuesday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    wednesday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    thursday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    friday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    saturday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    sunday: { type: DayHoursSchema, default: () => ({ isOpen: false }) },
    note: { type: String, default: '[CONFIRM OPENING HOURS]' },
  },
  { timestamps: true }
);

export const OpeningHours = mongoose.model<IOpeningHours>('OpeningHours', OpeningHoursSchema);
