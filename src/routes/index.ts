import { Router } from 'express';
import * as publicCtrl from '../controllers/publicController.js';
import * as authCtrl from '../controllers/authController.js';
import * as adminCtrl from '../controllers/adminController.js';
import { requireAuth } from '../middleware/auth.js';
import { loginLimiter, formLimiter } from '../middleware/rateLimit.js';
import { uploadReceipt, handleUploadReceipt } from '../controllers/uploadController.js';

const router = Router();

// API root
router.get('/', publicCtrl.apiRoot);

// Health
router.get('/health', publicCtrl.health);

// Public
router.get('/services', publicCtrl.getServices);
router.get('/services/:slug', publicCtrl.getServiceBySlug);
router.get('/gallery', publicCtrl.getGallery);
router.get('/reviews', publicCtrl.getReviews);
router.get('/faqs', publicCtrl.getFaqs);
router.get('/business', publicCtrl.getBusiness);
router.get('/opening-hours', publicCtrl.getOpeningHours);
router.post('/appointments', formLimiter, publicCtrl.createAppointment);
router.post('/contact', formLimiter, publicCtrl.createContact);
router.post('/upload-receipt', formLimiter, uploadReceipt, handleUploadReceipt);

// Auth
router.post('/admin/login', loginLimiter, authCtrl.login);
router.post('/admin/logout', authCtrl.logout);
router.get('/admin/me', requireAuth, authCtrl.me);

// Admin protected
router.get('/admin/dashboard', requireAuth, adminCtrl.getDashboardStats);

router.get('/admin/appointments', requireAuth, adminCtrl.getAppointments);
router.patch('/admin/appointments/:id', requireAuth, adminCtrl.updateAppointment);

router.get('/admin/enquiries', requireAuth, adminCtrl.getEnquiries);
router.patch('/admin/enquiries/:id', requireAuth, adminCtrl.updateEnquiry);
router.delete('/admin/enquiries/:id', requireAuth, adminCtrl.deleteEnquiry);

router.get('/admin/services', requireAuth, adminCtrl.getAdminServices);
router.post('/admin/services', requireAuth, adminCtrl.createService);
router.patch('/admin/services/:id', requireAuth, adminCtrl.updateService);
router.delete('/admin/services/:id', requireAuth, adminCtrl.deleteService);

router.get('/admin/gallery', requireAuth, adminCtrl.getAdminGallery);
router.post('/admin/gallery', requireAuth, adminCtrl.createGalleryItem);
router.patch('/admin/gallery/:id', requireAuth, adminCtrl.updateGalleryItem);
router.delete('/admin/gallery/:id', requireAuth, adminCtrl.deleteGalleryItem);

router.get('/admin/reviews', requireAuth, adminCtrl.getAdminReviews);
router.post('/admin/reviews', requireAuth, adminCtrl.createReview);
router.patch('/admin/reviews/:id', requireAuth, adminCtrl.updateReview);
router.delete('/admin/reviews/:id', requireAuth, adminCtrl.deleteReview);

router.get('/admin/faqs', requireAuth, adminCtrl.getAdminFaqs);
router.post('/admin/faqs', requireAuth, adminCtrl.createFaq);
router.patch('/admin/faqs/:id', requireAuth, adminCtrl.updateFaq);
router.delete('/admin/faqs/:id', requireAuth, adminCtrl.deleteFaq);

router.get('/admin/business', requireAuth, adminCtrl.getAdminBusiness);
router.patch('/admin/business', requireAuth, adminCtrl.updateBusiness);

router.get('/admin/opening-hours', requireAuth, adminCtrl.getAdminOpeningHours);
router.patch('/admin/opening-hours', requireAuth, adminCtrl.updateOpeningHours);

export default router;
