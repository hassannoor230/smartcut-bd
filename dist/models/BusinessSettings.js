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
exports.BusinessSettings = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const BusinessSettingsSchema = new mongoose_1.Schema({
    businessName: { type: String, required: true, default: 'Smartcut – Rahwali Gujranwala' },
    category: { type: String, default: "Men's Hair Salon / Men's Hair & Grooming" },
    phone: { type: String, required: true, default: '+92 321 1115925' },
    whatsapp: { type: String },
    email: { type: String },
    address: {
        type: String,
        required: true,
        default: 'Rahwali, GT Road, opposite DC Colony Gate, Gujranwala, Pakistan',
    },
    city: { type: String, default: 'Gujranwala' },
    country: { type: String, default: 'Pakistan' },
    googleRating: { type: Number, default: 4.7 },
    googleReviewCount: { type: Number, default: 493 },
    googleMapsUrl: { type: String },
    googleMapsEmbedUrl: { type: String },
    websiteUrl: { type: String },
    logoUrl: { type: String },
    faviconUrl: { type: String },
    aboutText: { type: String },
    announcementText: { type: String },
    announcementEnabled: { type: Boolean, default: false },
    whatsappEnabled: { type: Boolean, default: false },
    bookingEnabled: { type: Boolean, default: true },
    instagramUrl: { type: String },
    facebookUrl: { type: String },
}, { timestamps: true });
exports.BusinessSettings = mongoose_1.default.model('BusinessSettings', BusinessSettingsSchema);
//# sourceMappingURL=BusinessSettings.js.map