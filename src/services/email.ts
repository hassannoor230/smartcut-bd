import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: env.SMTP_USER
    ? {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      }
    : undefined,
});

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<boolean> {
  if (!env.SMTP_HOST || !env.SMTP_USER) {
    console.warn('SMTP not configured. Email not sent.');
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"Smartcut" <${env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}

export async function sendAppointmentNotification(data: {
  customerName: string;
  phone: string;
  customerEmail?: string;
  serviceName?: string;
  preferredDate: string;
  preferredTime?: string;
  message?: string;
  paymentMethod?: string;
  paymentReceipt?: string;
}) {
  if (!env.ADMIN_EMAIL) return false;

  const html = `
    <h2>New Smartcut Appointment Request</h2>
    <p><strong>Customer:</strong> ${data.customerName}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.customerEmail || 'Not provided'}</p>
    <p><strong>Service:</strong> ${data.serviceName || 'Not specified'}</p>
    <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
    <p><strong>Preferred Time:</strong> ${data.preferredTime || 'Not specified'}</p>
    <p><strong>Payment Method:</strong> ${data.paymentMethod || 'Not specified'}</p>
    ${data.paymentReceipt ? `<p><strong>Payment Receipt:</strong> <a href="${data.paymentReceipt}">View Receipt</a></p>` : ''}
    <p><strong>Message:</strong> ${data.message || '—'}</p>
  `;

  return sendEmail({
    to: env.ADMIN_EMAIL,
    subject: 'New Smartcut Appointment Request',
    html,
  });
}

export async function sendAppointmentConfirmation(data: {
  customerName: string;
  phone: string;
  customerEmail?: string;
  serviceName?: string;
  preferredDate: string;
  preferredTime?: string;
  paymentMethod?: string;
}) {
  if (!data.customerEmail) return false;

  const businessName = 'Smartcut – Rahwali Gujranwala';
  const html = `
    <h2>Appointment Request Received!</h2>
    <p>Dear ${data.customerName},</p>
    <p>Thank you for booking with <strong>${businessName}</strong>. Your appointment request has been received.</p>
    <h3>Appointment Details</h3>
    <p><strong>Service:</strong> ${data.serviceName || 'Not specified'}</p>
    <p><strong>Date:</strong> ${data.preferredDate}</p>
    <p><strong>Time:</strong> ${data.preferredTime || 'Not specified'}</p>
    <p><strong>Payment Method:</strong> ${data.paymentMethod ? data.paymentMethod.toUpperCase() : 'Not specified'}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p>We will confirm your appointment shortly. If you need to make changes, please call us at +92 321 1115925.</p>
    <p>Thank you for choosing ${businessName}!</p>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: 'Appointment Confirmation - Smartcut Rahwali',
    html,
  });
}

export async function sendContactNotification(data: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message: string;
}) {
  if (!env.ADMIN_EMAIL) return false;

  const html = `
    <h2>New Smartcut Contact Enquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Email:</strong> ${data.email || '—'}</p>
    <p><strong>Service:</strong> ${data.service || '—'}</p>
    <p><strong>Message:</strong> ${data.message}</p>
  `;

  return sendEmail({
    to: env.ADMIN_EMAIL,
    subject: 'New Smartcut Contact Enquiry',
    html,
  });
}
