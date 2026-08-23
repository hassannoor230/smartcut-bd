"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = getDashboardStats;
exports.getAppointments = getAppointments;
exports.updateAppointment = updateAppointment;
exports.getEnquiries = getEnquiries;
exports.updateEnquiry = updateEnquiry;
exports.deleteEnquiry = deleteEnquiry;
exports.getAdminServices = getAdminServices;
exports.createService = createService;
exports.updateService = updateService;
exports.deleteService = deleteService;
exports.getAdminGallery = getAdminGallery;
exports.createGalleryItem = createGalleryItem;
exports.updateGalleryItem = updateGalleryItem;
exports.deleteGalleryItem = deleteGalleryItem;
exports.getAdminReviews = getAdminReviews;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
exports.getAdminFaqs = getAdminFaqs;
exports.createFaq = createFaq;
exports.updateFaq = updateFaq;
exports.deleteFaq = deleteFaq;
exports.getAdminBusiness = getAdminBusiness;
exports.updateBusiness = updateBusiness;
exports.getAdminOpeningHours = getAdminOpeningHours;
exports.updateOpeningHours = updateOpeningHours;
const Service_js_1 = require("../models/Service.js");
const Gallery_js_1 = require("../models/Gallery.js");
const Review_js_1 = require("../models/Review.js");
const FAQ_js_1 = require("../models/FAQ.js");
const Appointment_js_1 = require("../models/Appointment.js");
const ContactEnquiry_js_1 = require("../models/ContactEnquiry.js");
const BusinessSettings_js_1 = require("../models/BusinessSettings.js");
const OpeningHours_js_1 = require("../models/OpeningHours.js");
const index_js_1 = require("../validators/index.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const errorHandler_js_1 = require("../middleware/errorHandler.js");
const cloudinary_js_1 = require("../services/cloudinary.js");
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
// Dashboard stats
async function getDashboardStats(_req, res, next) {
    try {
        const [pendingAppointments, confirmedAppointments, newEnquiries, activeServices] = await Promise.all([
            Appointment_js_1.Appointment.countDocuments({ status: 'pending' }),
            Appointment_js_1.Appointment.countDocuments({ status: 'confirmed' }),
            ContactEnquiry_js_1.ContactEnquiry.countDocuments({ status: 'new' }),
            Service_js_1.Service.countDocuments({ active: true }),
        ]);
        return (0, apiResponse_js_1.successResponse)(res, {
            pendingAppointments,
            confirmedAppointments,
            newEnquiries,
            activeServices,
        });
    }
    catch (error) {
        next(error);
    }
}
// Appointments
async function getAppointments(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status;
        const search = req.query.search;
        const filter = {};
        if (status)
            filter.status = status;
        if (search) {
            filter.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
            ];
        }
        const total = await Appointment_js_1.Appointment.countDocuments(filter);
        const appointments = await Appointment_js_1.Appointment.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('serviceId', 'name');
        return (0, apiResponse_js_1.successResponse)(res, {
            items: appointments,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateAppointment(req, res, next) {
    try {
        const { status, adminNotes } = req.body;
        const appointment = await Appointment_js_1.Appointment.findById(req.params.id);
        if (!appointment)
            throw new errorHandler_js_1.AppError('Appointment not found', 404);
        if (status)
            appointment.status = status;
        if (adminNotes !== undefined)
            appointment.adminNotes = adminNotes;
        await appointment.save();
        return (0, apiResponse_js_1.successResponse)(res, appointment, 'Appointment updated');
    }
    catch (error) {
        next(error);
    }
}
// Enquiries
async function getEnquiries(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status;
        const search = req.query.search;
        const filter = {};
        if (status)
            filter.status = status;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        const total = await ContactEnquiry_js_1.ContactEnquiry.countDocuments(filter);
        const enquiries = await ContactEnquiry_js_1.ContactEnquiry.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return (0, apiResponse_js_1.successResponse)(res, {
            items: enquiries,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateEnquiry(req, res, next) {
    try {
        const { status } = req.body;
        const enquiry = await ContactEnquiry_js_1.ContactEnquiry.findById(req.params.id);
        if (!enquiry)
            throw new errorHandler_js_1.AppError('Enquiry not found', 404);
        if (status)
            enquiry.status = status;
        await enquiry.save();
        return (0, apiResponse_js_1.successResponse)(res, enquiry, 'Enquiry updated');
    }
    catch (error) {
        next(error);
    }
}
async function deleteEnquiry(req, res, next) {
    try {
        const enquiry = await ContactEnquiry_js_1.ContactEnquiry.findByIdAndDelete(req.params.id);
        if (!enquiry)
            throw new errorHandler_js_1.AppError('Enquiry not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, null, 'Enquiry deleted');
    }
    catch (error) {
        next(error);
    }
}
// Services CRUD
async function getAdminServices(_req, res, next) {
    try {
        const services = await Service_js_1.Service.find().sort({ sortOrder: 1, createdAt: -1 });
        return (0, apiResponse_js_1.successResponse)(res, services);
    }
    catch (error) {
        next(error);
    }
}
async function createService(req, res, next) {
    try {
        const data = index_js_1.serviceSchema.parse(req.body);
        const slug = slugify(data.name);
        const existing = await Service_js_1.Service.findOne({ slug });
        if (existing)
            throw new errorHandler_js_1.AppError('Service with this name already exists', 409);
        const service = await Service_js_1.Service.create({ ...data, slug });
        return (0, apiResponse_js_1.successResponse)(res, service, 'Service created', 201);
    }
    catch (error) {
        next(error);
    }
}
async function updateService(req, res, next) {
    try {
        const data = index_js_1.serviceSchema.partial().parse(req.body);
        const service = await Service_js_1.Service.findById(req.params.id);
        if (!service)
            throw new errorHandler_js_1.AppError('Service not found', 404);
        if (data.name && data.name !== service.name) {
            service.slug = slugify(data.name);
        }
        Object.assign(service, data);
        await service.save();
        return (0, apiResponse_js_1.successResponse)(res, service, 'Service updated');
    }
    catch (error) {
        next(error);
    }
}
async function deleteService(req, res, next) {
    try {
        const service = await Service_js_1.Service.findByIdAndDelete(req.params.id);
        if (!service)
            throw new errorHandler_js_1.AppError('Service not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, null, 'Service deleted');
    }
    catch (error) {
        next(error);
    }
}
// Gallery
async function getAdminGallery(_req, res, next) {
    try {
        const items = await Gallery_js_1.Gallery.find().sort({ sortOrder: 1, createdAt: -1 });
        return (0, apiResponse_js_1.successResponse)(res, items);
    }
    catch (error) {
        next(error);
    }
}
async function createGalleryItem(req, res, next) {
    try {
        const data = index_js_1.gallerySchema.parse(req.body);
        const item = await Gallery_js_1.Gallery.create(data);
        return (0, apiResponse_js_1.successResponse)(res, item, 'Gallery item created', 201);
    }
    catch (error) {
        next(error);
    }
}
async function updateGalleryItem(req, res, next) {
    try {
        const data = index_js_1.gallerySchema.partial().parse(req.body);
        const item = await Gallery_js_1.Gallery.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!item)
            throw new errorHandler_js_1.AppError('Gallery item not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, item, 'Gallery item updated');
    }
    catch (error) {
        next(error);
    }
}
async function deleteGalleryItem(req, res, next) {
    try {
        const item = await Gallery_js_1.Gallery.findById(req.params.id);
        if (!item)
            throw new errorHandler_js_1.AppError('Gallery item not found', 404);
        if (item.publicId)
            await (0, cloudinary_js_1.deleteImage)(item.publicId);
        await item.deleteOne();
        return (0, apiResponse_js_1.successResponse)(res, null, 'Gallery item deleted');
    }
    catch (error) {
        next(error);
    }
}
// Reviews
async function getAdminReviews(_req, res, next) {
    try {
        const reviews = await Review_js_1.Review.find().sort({ date: -1 });
        return (0, apiResponse_js_1.successResponse)(res, reviews);
    }
    catch (error) {
        next(error);
    }
}
async function createReview(req, res, next) {
    try {
        const data = index_js_1.reviewSchema.parse(req.body);
        const review = await Review_js_1.Review.create({
            ...data,
            date: data.date ? new Date(data.date) : new Date(),
        });
        return (0, apiResponse_js_1.successResponse)(res, review, 'Review created', 201);
    }
    catch (error) {
        next(error);
    }
}
async function updateReview(req, res, next) {
    try {
        const data = index_js_1.reviewSchema.partial().parse(req.body);
        const review = await Review_js_1.Review.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!review)
            throw new errorHandler_js_1.AppError('Review not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, review, 'Review updated');
    }
    catch (error) {
        next(error);
    }
}
async function deleteReview(req, res, next) {
    try {
        const review = await Review_js_1.Review.findByIdAndDelete(req.params.id);
        if (!review)
            throw new errorHandler_js_1.AppError('Review not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, null, 'Review deleted');
    }
    catch (error) {
        next(error);
    }
}
// FAQs
async function getAdminFaqs(_req, res, next) {
    try {
        const faqs = await FAQ_js_1.FAQ.find().sort({ sortOrder: 1 });
        return (0, apiResponse_js_1.successResponse)(res, faqs);
    }
    catch (error) {
        next(error);
    }
}
async function createFaq(req, res, next) {
    try {
        const data = index_js_1.faqSchema.parse(req.body);
        const faq = await FAQ_js_1.FAQ.create(data);
        return (0, apiResponse_js_1.successResponse)(res, faq, 'FAQ created', 201);
    }
    catch (error) {
        next(error);
    }
}
async function updateFaq(req, res, next) {
    try {
        const data = index_js_1.faqSchema.partial().parse(req.body);
        const faq = await FAQ_js_1.FAQ.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!faq)
            throw new errorHandler_js_1.AppError('FAQ not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, faq, 'FAQ updated');
    }
    catch (error) {
        next(error);
    }
}
async function deleteFaq(req, res, next) {
    try {
        const faq = await FAQ_js_1.FAQ.findByIdAndDelete(req.params.id);
        if (!faq)
            throw new errorHandler_js_1.AppError('FAQ not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, null, 'FAQ deleted');
    }
    catch (error) {
        next(error);
    }
}
// Business Settings
async function getAdminBusiness(_req, res, next) {
    try {
        let settings = await BusinessSettings_js_1.BusinessSettings.findOne();
        if (!settings)
            settings = await BusinessSettings_js_1.BusinessSettings.create({});
        return (0, apiResponse_js_1.successResponse)(res, settings);
    }
    catch (error) {
        next(error);
    }
}
async function updateBusiness(req, res, next) {
    try {
        const data = index_js_1.businessSettingsSchema.parse(req.body);
        let settings = await BusinessSettings_js_1.BusinessSettings.findOne();
        if (!settings) {
            settings = await BusinessSettings_js_1.BusinessSettings.create(data);
        }
        else {
            Object.assign(settings, data);
            await settings.save();
        }
        return (0, apiResponse_js_1.successResponse)(res, settings, 'Business settings updated');
    }
    catch (error) {
        next(error);
    }
}
// Opening Hours
async function getAdminOpeningHours(_req, res, next) {
    try {
        let hours = await OpeningHours_js_1.OpeningHours.findOne();
        if (!hours)
            hours = await OpeningHours_js_1.OpeningHours.create({});
        return (0, apiResponse_js_1.successResponse)(res, hours);
    }
    catch (error) {
        next(error);
    }
}
async function updateOpeningHours(req, res, next) {
    try {
        const data = index_js_1.openingHoursSchema.parse(req.body);
        let hours = await OpeningHours_js_1.OpeningHours.findOne();
        if (!hours) {
            hours = await OpeningHours_js_1.OpeningHours.create(data);
        }
        else {
            Object.assign(hours, data);
            await hours.save();
        }
        return (0, apiResponse_js_1.successResponse)(res, hours, 'Opening hours updated');
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=adminController.js.map