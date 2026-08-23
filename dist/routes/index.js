"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publicCtrl = __importStar(require("../controllers/publicController.js"));
const authCtrl = __importStar(require("../controllers/authController.js"));
const adminCtrl = __importStar(require("../controllers/adminController.js"));
const auth_js_1 = require("../middleware/auth.js");
const rateLimit_js_1 = require("../middleware/rateLimit.js");
const router = (0, express_1.Router)();
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
router.post('/appointments', rateLimit_js_1.formLimiter, publicCtrl.createAppointment);
router.post('/contact', rateLimit_js_1.formLimiter, publicCtrl.createContact);
// Auth
router.post('/admin/login', rateLimit_js_1.loginLimiter, authCtrl.login);
router.post('/admin/logout', authCtrl.logout);
router.get('/admin/me', auth_js_1.requireAuth, authCtrl.me);
// Admin protected
router.get('/admin/dashboard', auth_js_1.requireAuth, adminCtrl.getDashboardStats);
router.get('/admin/appointments', auth_js_1.requireAuth, adminCtrl.getAppointments);
router.patch('/admin/appointments/:id', auth_js_1.requireAuth, adminCtrl.updateAppointment);
router.get('/admin/enquiries', auth_js_1.requireAuth, adminCtrl.getEnquiries);
router.patch('/admin/enquiries/:id', auth_js_1.requireAuth, adminCtrl.updateEnquiry);
router.delete('/admin/enquiries/:id', auth_js_1.requireAuth, adminCtrl.deleteEnquiry);
router.get('/admin/services', auth_js_1.requireAuth, adminCtrl.getAdminServices);
router.post('/admin/services', auth_js_1.requireAuth, adminCtrl.createService);
router.patch('/admin/services/:id', auth_js_1.requireAuth, adminCtrl.updateService);
router.delete('/admin/services/:id', auth_js_1.requireAuth, adminCtrl.deleteService);
router.get('/admin/gallery', auth_js_1.requireAuth, adminCtrl.getAdminGallery);
router.post('/admin/gallery', auth_js_1.requireAuth, adminCtrl.createGalleryItem);
router.patch('/admin/gallery/:id', auth_js_1.requireAuth, adminCtrl.updateGalleryItem);
router.delete('/admin/gallery/:id', auth_js_1.requireAuth, adminCtrl.deleteGalleryItem);
router.get('/admin/reviews', auth_js_1.requireAuth, adminCtrl.getAdminReviews);
router.post('/admin/reviews', auth_js_1.requireAuth, adminCtrl.createReview);
router.patch('/admin/reviews/:id', auth_js_1.requireAuth, adminCtrl.updateReview);
router.delete('/admin/reviews/:id', auth_js_1.requireAuth, adminCtrl.deleteReview);
router.get('/admin/faqs', auth_js_1.requireAuth, adminCtrl.getAdminFaqs);
router.post('/admin/faqs', auth_js_1.requireAuth, adminCtrl.createFaq);
router.patch('/admin/faqs/:id', auth_js_1.requireAuth, adminCtrl.updateFaq);
router.delete('/admin/faqs/:id', auth_js_1.requireAuth, adminCtrl.deleteFaq);
router.get('/admin/business', auth_js_1.requireAuth, adminCtrl.getAdminBusiness);
router.patch('/admin/business', auth_js_1.requireAuth, adminCtrl.updateBusiness);
router.get('/admin/opening-hours', auth_js_1.requireAuth, adminCtrl.getAdminOpeningHours);
router.patch('/admin/opening-hours', auth_js_1.requireAuth, adminCtrl.updateOpeningHours);
exports.default = router;
//# sourceMappingURL=index.js.map