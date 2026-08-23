"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_js_1 = require("../config/db.js");
const BusinessSettings_js_1 = require("../models/BusinessSettings.js");
const OpeningHours_js_1 = require("../models/OpeningHours.js");
const Service_js_1 = require("../models/Service.js");
const FAQ_js_1 = require("../models/FAQ.js");
const mongoose_1 = __importDefault(require("mongoose"));
async function seed() {
    await (0, db_js_1.connectDB)();
    // Business Settings
    const existingBusiness = await BusinessSettings_js_1.BusinessSettings.findOne();
    if (!existingBusiness) {
        await BusinessSettings_js_1.BusinessSettings.create({
            businessName: 'Smartcut – Rahwali Gujranwala',
            category: "Men's Hair Salon / Men's Hair & Grooming",
            phone: '+92 321 1115925',
            address: 'Rahwali, GT Road, opposite DC Colony Gate, Gujranwala, Pakistan',
            city: 'Gujranwala',
            country: 'Pakistan',
            googleRating: 4.7,
            googleReviewCount: 493,
            announcementEnabled: false,
            whatsappEnabled: false,
            bookingEnabled: true,
            aboutText: 'Smartcut is a modern men\'s hair and grooming studio located in Rahwali, Gujranwala on GT Road opposite DC Colony Gate. [ADD VERIFIED BUSINESS STORY]',
        });
        console.log('Business settings seeded.');
    }
    // Opening Hours - placeholder
    const existingHours = await OpeningHours_js_1.OpeningHours.findOne();
    if (!existingHours) {
        await OpeningHours_js_1.OpeningHours.create({
            note: '[CONFIRM OPENING HOURS]',
        });
        console.log('Opening hours placeholder seeded.');
    }
    // Placeholder services
    const serviceCount = await Service_js_1.Service.countDocuments();
    if (serviceCount === 0) {
        const placeholders = [
            {
                name: 'Classic Haircut',
                slug: 'classic-haircut',
                description: 'Professional men\'s haircut tailored to your style. [CONFIRM DETAILS]',
                price: null,
                duration: null,
                category: 'Haircut',
                featured: true,
                active: true,
                sortOrder: 1,
                isPlaceholder: true,
            },
            {
                name: 'Hair Styling',
                slug: 'hair-styling',
                description: 'Modern styling for a sharp, confident look. [CONFIRM DETAILS]',
                price: null,
                duration: null,
                category: 'Hair Styling',
                featured: true,
                active: true,
                sortOrder: 2,
                isPlaceholder: true,
            },
            {
                name: 'Beard Grooming',
                slug: 'beard-grooming',
                description: 'Precision beard trim and shaping. [CONFIRM DETAILS]',
                price: null,
                duration: null,
                category: 'Beard Grooming',
                featured: true,
                active: true,
                sortOrder: 3,
                isPlaceholder: true,
            },
            {
                name: 'Complete Grooming',
                slug: 'complete-grooming',
                description: 'Full hair and beard grooming package. [CONFIRM DETAILS]',
                price: null,
                duration: null,
                category: 'Complete Grooming',
                featured: true,
                active: true,
                sortOrder: 4,
                isPlaceholder: true,
            },
        ];
        await Service_js_1.Service.insertMany(placeholders);
        console.log('Placeholder services seeded.');
    }
    // Sample FAQs (generic, non-invented business claims)
    const faqCount = await FAQ_js_1.FAQ.countDocuments();
    if (faqCount === 0) {
        await FAQ_js_1.FAQ.insertMany([
            {
                question: 'How do I book an appointment?',
                answer: 'You can request an appointment through the Book Appointment page on our website or call us at +92 321 1115925. We will confirm availability.',
                active: true,
                sortOrder: 1,
            },
            {
                question: 'Where is Smartcut located?',
                answer: 'Smartcut is located in Rahwali, GT Road, opposite DC Colony Gate, Gujranwala, Pakistan.',
                active: true,
                sortOrder: 2,
            },
            {
                question: 'What services do you offer?',
                answer: 'We offer men\'s haircuts, styling, beard grooming and complete grooming services. Please check our Services page or contact us for the latest offerings.',
                active: true,
                sortOrder: 3,
            },
        ]);
        console.log('Sample FAQs seeded.');
    }
    console.log('\nSeed complete. No fake reviews were created.');
    await mongoose_1.default.disconnect();
    process.exit(0);
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map