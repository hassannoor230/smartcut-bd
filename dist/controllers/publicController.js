"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = getServices;
exports.getServiceBySlug = getServiceBySlug;
exports.getGallery = getGallery;
exports.getReviews = getReviews;
exports.getFaqs = getFaqs;
exports.getBusiness = getBusiness;
exports.getOpeningHours = getOpeningHours;
exports.createAppointment = createAppointment;
exports.createContact = createContact;
exports.health = health;
const Service_js_1 = require("../models/Service.js");
const Gallery_js_1 = require("../models/Gallery.js");
const Review_js_1 = require("../models/Review.js");
const FAQ_js_1 = require("../models/FAQ.js");
const BusinessSettings_js_1 = require("../models/BusinessSettings.js");
const OpeningHours_js_1 = require("../models/OpeningHours.js");
const Appointment_js_1 = require("../models/Appointment.js");
const ContactEnquiry_js_1 = require("../models/ContactEnquiry.js");
const index_js_1 = require("../validators/index.js");
const apiResponse_js_1 = require("../utils/apiResponse.js");
const email_js_1 = require("../services/email.js");
const errorHandler_js_1 = require("../middleware/errorHandler.js");
async function getServices(_req, res, next) {
    try {
        const services = await Service_js_1.Service.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 });
        return (0, apiResponse_js_1.successResponse)(res, services);
    }
    catch (error) {
        next(error);
    }
}
async function getServiceBySlug(req, res, next) {
    try {
        const service = await Service_js_1.Service.findOne({ slug: req.params.slug, active: true });
        if (!service)
            throw new errorHandler_js_1.AppError('Service not found', 404);
        return (0, apiResponse_js_1.successResponse)(res, service);
    }
    catch (error) {
        next(error);
    }
}
async function getGallery(_req, res, next) {
    try {
        const items = await Gallery_js_1.Gallery.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 });
        return (0, apiResponse_js_1.successResponse)(res, items);
    }
    catch (error) {
        next(error);
    }
}
async function getReviews(_req, res, next) {
    try {
        const reviews = await Review_js_1.Review.find({ active: true }).sort({ featured: -1, date: -1 });
        return (0, apiResponse_js_1.successResponse)(res, reviews);
    }
    catch (error) {
        next(error);
    }
}
async function getFaqs(_req, res, next) {
    try {
        const faqs = await FAQ_js_1.FAQ.find({ active: true }).sort({ sortOrder: 1 });
        return (0, apiResponse_js_1.successResponse)(res, faqs);
    }
    catch (error) {
        next(error);
    }
}
async function getBusiness(_req, res, next) {
    try {
        let settings = await BusinessSettings_js_1.BusinessSettings.findOne();
        if (!settings) {
            settings = await BusinessSettings_js_1.BusinessSettings.create({});
        }
        return (0, apiResponse_js_1.successResponse)(res, settings);
    }
    catch (error) {
        next(error);
    }
}
async function getOpeningHours(_req, res, next) {
    try {
        let hours = await OpeningHours_js_1.OpeningHours.findOne();
        if (!hours) {
            hours = await OpeningHours_js_1.OpeningHours.create({});
        }
        return (0, apiResponse_js_1.successResponse)(res, hours);
    }
    catch (error) {
        next(error);
    }
}
async function createAppointment(req, res, next) {
    try {
        const data = index_js_1.appointmentSchema.parse(req.body);
        let serviceName = data.serviceName;
        if (data.serviceId) {
            const service = await Service_js_1.Service.findById(data.serviceId);
            if (service)
                serviceName = service.name;
        }
        const appointment = await Appointment_js_1.Appointment.create({
            customerName: data.customerName,
            phone: data.phone,
            serviceId: data.serviceId || undefined,
            serviceName,
            preferredDate: new Date(data.preferredDate),
            preferredTime: data.preferredTime,
            message: data.message,
            status: 'pending',
        });
        await (0, email_js_1.sendAppointmentNotification)({
            customerName: data.customerName,
            phone: data.phone,
            serviceName,
            preferredDate: new Date(data.preferredDate).toLocaleDateString(),
            preferredTime: data.preferredTime,
            message: data.message,
        });
        return (0, apiResponse_js_1.successResponse)(res, { id: appointment._id }, 'Request received. Smartcut will confirm availability.', 201);
    }
    catch (error) {
        next(error);
    }
}
async function createContact(req, res, next) {
    try {
        const data = index_js_1.contactSchema.parse(req.body);
        const enquiry = await ContactEnquiry_js_1.ContactEnquiry.create({
            name: data.name,
            phone: data.phone,
            email: data.email || undefined,
            service: data.service,
            message: data.message,
            status: 'new',
        });
        await (0, email_js_1.sendContactNotification)({
            name: data.name,
            phone: data.phone,
            email: data.email,
            service: data.service,
            message: data.message,
        });
        return (0, apiResponse_js_1.successResponse)(res, { id: enquiry._id }, 'Message sent successfully. We will get back to you soon.', 201);
    }
    catch (error) {
        next(error);
    }
}
async function health(_req, res) {
    return (0, apiResponse_js_1.successResponse)(res, { status: 'ok' }, 'API is running');
}
//# sourceMappingURL=publicController.js.map