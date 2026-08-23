import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service.js';
import { Gallery } from '../models/Gallery.js';
import { Review } from '../models/Review.js';
import { FAQ } from '../models/FAQ.js';
import { BusinessSettings } from '../models/BusinessSettings.js';
import { OpeningHours } from '../models/OpeningHours.js';
import { Appointment } from '../models/Appointment.js';
import { ContactEnquiry } from '../models/ContactEnquiry.js';
import { appointmentSchema, contactSchema } from '../validators/index.js';
import { successResponse } from '../utils/apiResponse.js';
import { sendAppointmentNotification, sendAppointmentConfirmation, sendContactNotification } from '../services/email.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getServices(_req: Request, res: Response, next: NextFunction) {
  try {
    const services = await Service.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 });
    return successResponse(res, services);
  } catch (error) {
    next(error);
  }
}

export async function getServiceBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await Service.findOne({ slug: req.params.slug, active: true });
    if (!service) throw new AppError('Service not found', 404);
    return successResponse(res, service);
  } catch (error) {
    next(error);
  }
}

export async function getGallery(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await Gallery.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 });
    return successResponse(res, items);
  } catch (error) {
    next(error);
  }
}

export async function getReviews(_req: Request, res: Response, next: NextFunction) {
  try {
    const reviews = await Review.find({ active: true }).sort({ featured: -1, date: -1 });
    return successResponse(res, reviews);
  } catch (error) {
    next(error);
  }
}

export async function getFaqs(_req: Request, res: Response, next: NextFunction) {
  try {
    const faqs = await FAQ.find({ active: true }).sort({ sortOrder: 1 });
    return successResponse(res, faqs);
  } catch (error) {
    next(error);
  }
}

export async function getBusiness(_req: Request, res: Response, next: NextFunction) {
  try {
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({});
    }
    return successResponse(res, settings);
  } catch (error) {
    next(error);
  }
}

export async function getOpeningHours(_req: Request, res: Response, next: NextFunction) {
  try {
    let hours = await OpeningHours.findOne();
    if (!hours) {
      hours = await OpeningHours.create({});
    }
    return successResponse(res, hours);
  } catch (error) {
    next(error);
  }
}

export async function createAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    const data = appointmentSchema.parse(req.body);

    let serviceName = data.serviceName;
    if (data.serviceId) {
      const service = await Service.findById(data.serviceId);
      if (service) serviceName = service.name;
    }

    const appointment = await Appointment.create({
      customerName: data.customerName,
      phone: data.phone,
      customerEmail: data.customerEmail || undefined,
      serviceId: data.serviceId || undefined,
      serviceName,
      preferredDate: new Date(data.preferredDate),
      preferredTime: data.preferredTime,
      message: data.message,
      paymentMethod: data.paymentMethod,
      paymentReceipt: data.paymentReceipt,
      paymentReceiptPublicId: data.paymentReceiptPublicId,
      status: 'pending',
    });

    await sendAppointmentNotification({
      customerName: data.customerName,
      phone: data.phone,
      customerEmail: data.customerEmail,
      serviceName,
      preferredDate: new Date(data.preferredDate).toLocaleDateString(),
      preferredTime: data.preferredTime,
      message: data.message,
      paymentMethod: data.paymentMethod,
      paymentReceipt: data.paymentReceipt,
    });

    await sendAppointmentConfirmation({
      customerName: data.customerName,
      phone: data.phone,
      customerEmail: data.customerEmail,
      serviceName,
      preferredDate: new Date(data.preferredDate).toLocaleDateString(),
      preferredTime: data.preferredTime,
      paymentMethod: data.paymentMethod,
    });

    return successResponse(
      res,
      { id: appointment._id },
      'Request received. Smartcut will confirm availability.',
      201
    );
  } catch (error) {
    next(error);
  }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSchema.parse(req.body);

    const enquiry = await ContactEnquiry.create({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      service: data.service,
      message: data.message,
      status: 'new',
    });

    await sendContactNotification({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      message: data.message,
    });

    return successResponse(res, { id: enquiry._id }, 'Message sent successfully. We will get back to you soon.', 201);
  } catch (error) {
    next(error);
  }
}

export async function health(_req: Request, res: Response) {
  return successResponse(res, { status: 'ok' }, 'API is running');
}
