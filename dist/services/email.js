"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
exports.sendAppointmentNotification = sendAppointmentNotification;
exports.sendContactNotification = sendContactNotification;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_js_1 = require("../config/env.js");
const transporter = nodemailer_1.default.createTransport({
    host: env_js_1.env.SMTP_HOST,
    port: env_js_1.env.SMTP_PORT,
    secure: env_js_1.env.SMTP_PORT === 465,
    auth: env_js_1.env.SMTP_USER
        ? {
            user: env_js_1.env.SMTP_USER,
            pass: env_js_1.env.SMTP_PASSWORD,
        }
        : undefined,
});
async function sendEmail(options) {
    if (!env_js_1.env.SMTP_HOST || !env_js_1.env.SMTP_USER) {
        console.warn('SMTP not configured. Email not sent.');
        return false;
    }
    try {
        await transporter.sendMail({
            from: `"Smartcut" <${env_js_1.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });
        return true;
    }
    catch (error) {
        console.error('Email send failed:', error);
        return false;
    }
}
async function sendAppointmentNotification(data) {
    if (!env_js_1.env.ADMIN_EMAIL)
        return false;
    const html = `
    <h2>New Smartcut Appointment Request</h2>
    <p><strong>Customer:</strong> ${data.customerName}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Service:</strong> ${data.serviceName || 'Not specified'}</p>
    <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
    <p><strong>Preferred Time:</strong> ${data.preferredTime || 'Not specified'}</p>
    <p><strong>Message:</strong> ${data.message || '—'}</p>
  `;
    return sendEmail({
        to: env_js_1.env.ADMIN_EMAIL,
        subject: 'New Smartcut Appointment Request',
        html,
    });
}
async function sendContactNotification(data) {
    if (!env_js_1.env.ADMIN_EMAIL)
        return false;
    const html = `
    <h2>New Smartcut Contact Enquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email || '—'}</p>
    <p><strong>Service:</strong> ${data.service || '—'}</p>
    <p><strong>Message:</strong> ${data.message}</p>
  `;
    return sendEmail({
        to: env_js_1.env.ADMIN_EMAIL,
        subject: 'New Smartcut Contact Enquiry',
        html,
    });
}
//# sourceMappingURL=email.js.map