import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.js';
import { Service } from '../models/Service.js';
import { Gallery } from '../models/Gallery.js';
import { Review } from '../models/Review.js';
import { FAQ } from '../models/FAQ.js';
import { Appointment } from '../models/Appointment.js';
import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { BusinessSettings } from '../models/BusinessSettings.js';
import { OpeningHours } from '../models/OpeningHours.js';
import {
  serviceSchema,
  gallerySchema,
  reviewSchema,
  faqSchema,
  businessSettingsSchema,
  openingHoursSchema,
} from '../validators/index.js';
import { successResponse } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';
import { deleteImage } from '../services/cloudinary.js';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Dashboard stats
export async function getDashboardStats(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const [pendingAppointments, confirmedAppointments, newEnquiries, activeServices] = await Promise.all([
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      ContactEnquiry.countDocuments({ status: 'new' }),
      Service.countDocuments({ active: true }),
    ]);

    return successResponse(res, {
      pendingAppointments,
      confirmedAppointments,
      newEnquiries,
      activeServices,
    });
  } catch (error) {
    next(error);
  }
}

// Appointments
export async function getAppointments(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('serviceId', 'name');

    return successResponse(res, {
      items: appointments,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointment(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status, adminNotes } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) throw new AppError('Appointment not found', 404);

    if (status) appointment.status = status;
    if (adminNotes !== undefined) appointment.adminNotes = adminNotes;
    await appointment.save();

    return successResponse(res, appointment, 'Appointment updated');
  } catch (error) {
    next(error);
  }
}

// Enquiries
export async function getEnquiries(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await ContactEnquiry.countDocuments(filter);
    const enquiries = await ContactEnquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return successResponse(res, {
      items: enquiries,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEnquiry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { status } = req.body;
    const enquiry = await ContactEnquiry.findById(req.params.id);
    if (!enquiry) throw new AppError('Enquiry not found', 404);

    if (status) enquiry.status = status;
    await enquiry.save();

    return successResponse(res, enquiry, 'Enquiry updated');
  } catch (error) {
    next(error);
  }
}

export async function deleteEnquiry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const enquiry = await ContactEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) throw new AppError('Enquiry not found', 404);
    return successResponse(res, null, 'Enquiry deleted');
  } catch (error) {
    next(error);
  }
}

// Services CRUD
export async function getAdminServices(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const services = await Service.find().sort({ sortOrder: 1, createdAt: -1 });
    return successResponse(res, services);
  } catch (error) {
    next(error);
  }
}

export async function createService(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = serviceSchema.parse(req.body);
    const slug = slugify(data.name);
    const existing = await Service.findOne({ slug });
    if (existing) throw new AppError('Service with this name already exists', 409);

    const service = await Service.create({ ...data, slug });
    return successResponse(res, service, 'Service created', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateService(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = serviceSchema.partial().parse(req.body);
    const service = await Service.findById(req.params.id);
    if (!service) throw new AppError('Service not found', 404);

    if (data.name && data.name !== service.name) {
      service.slug = slugify(data.name);
    }
    Object.assign(service, data);
    await service.save();

    return successResponse(res, service, 'Service updated');
  } catch (error) {
    next(error);
  }
}

export async function deleteService(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) throw new AppError('Service not found', 404);
    return successResponse(res, null, 'Service deleted');
  } catch (error) {
    next(error);
  }
}

// Gallery
export async function getAdminGallery(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const items = await Gallery.find().sort({ sortOrder: 1, createdAt: -1 });
    return successResponse(res, items);
  } catch (error) {
    next(error);
  }
}

export async function createGalleryItem(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = gallerySchema.parse(req.body);
    const item = await Gallery.create(data);
    return successResponse(res, item, 'Gallery item created', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateGalleryItem(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = gallerySchema.partial().parse(req.body);
    const item = await Gallery.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!item) throw new AppError('Gallery item not found', 404);
    return successResponse(res, item, 'Gallery item updated');
  } catch (error) {
    next(error);
  }
}

export async function deleteGalleryItem(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) throw new AppError('Gallery item not found', 404);
    if (item.publicId) await deleteImage(item.publicId);
    await item.deleteOne();
    return successResponse(res, null, 'Gallery item deleted');
  } catch (error) {
    next(error);
  }
}

// Reviews
export async function getAdminReviews(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    return successResponse(res, reviews);
  } catch (error) {
    next(error);
  }
}

export async function createReview(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = reviewSchema.parse(req.body);
    const review = await Review.create({
      ...data,
      date: data.date ? new Date(data.date) : new Date(),
    });
    return successResponse(res, review, 'Review created', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateReview(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = reviewSchema.partial().parse(req.body);
    const review = await Review.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!review) throw new AppError('Review not found', 404);
    return successResponse(res, review, 'Review updated');
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) throw new AppError('Review not found', 404);
    return successResponse(res, null, 'Review deleted');
  } catch (error) {
    next(error);
  }
}

// FAQs
export async function getAdminFaqs(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const faqs = await FAQ.find().sort({ sortOrder: 1 });
    return successResponse(res, faqs);
  } catch (error) {
    next(error);
  }
}

export async function createFaq(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = faqSchema.parse(req.body);
    const faq = await FAQ.create(data);
    return successResponse(res, faq, 'FAQ created', 201);
  } catch (error) {
    next(error);
  }
}

export async function updateFaq(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = faqSchema.partial().parse(req.body);
    const faq = await FAQ.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!faq) throw new AppError('FAQ not found', 404);
    return successResponse(res, faq, 'FAQ updated');
  } catch (error) {
    next(error);
  }
}

export async function deleteFaq(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) throw new AppError('FAQ not found', 404);
    return successResponse(res, null, 'FAQ deleted');
  } catch (error) {
    next(error);
  }
}

// Business Settings
export async function getAdminBusiness(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) settings = await BusinessSettings.create({});
    return successResponse(res, settings);
  } catch (error) {
    next(error);
  }
}

export async function updateBusiness(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = businessSettingsSchema.parse(req.body);
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create(data);
    } else {
      const update: Record<string, unknown> = {};
      for (const key of Object.keys(data) as (keyof typeof data)[]) {
        const value = data[key];
        if (value !== undefined && value !== '' && value !== null) {
          update[key] = value;
        }
      }
      Object.assign(settings, update);
      await settings.save();
    }
    return successResponse(res, settings, 'Business settings updated');
  } catch (error) {
    next(error);
  }
}

// Opening Hours
export async function getAdminOpeningHours(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    let hours = await OpeningHours.findOne();
    if (!hours) hours = await OpeningHours.create({});
    return successResponse(res, hours);
  } catch (error) {
    next(error);
  }
}

export async function updateOpeningHours(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = openingHoursSchema.parse(req.body);
    let hours = await OpeningHours.findOne();
    if (!hours) {
      hours = await OpeningHours.create(data);
    } else {
      Object.assign(hours, data);
      await hours.save();
    }
    return successResponse(res, hours, 'Opening hours updated');
  } catch (error) {
    next(error);
  }
}
