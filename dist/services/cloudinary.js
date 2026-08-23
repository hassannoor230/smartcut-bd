"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCloudinaryConfigured = exports.cloudinary = void 0;
exports.uploadImage = uploadImage;
exports.deleteImage = deleteImage;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const env_js_1 = require("../config/env.js");
const isConfigured = !!env_js_1.env.CLOUDINARY_CLOUD_NAME &&
    !!env_js_1.env.CLOUDINARY_API_KEY &&
    !!env_js_1.env.CLOUDINARY_API_SECRET;
exports.isCloudinaryConfigured = isConfigured;
if (isConfigured) {
    cloudinary_1.v2.config({
        cloud_name: env_js_1.env.CLOUDINARY_CLOUD_NAME,
        api_key: env_js_1.env.CLOUDINARY_API_KEY,
        api_secret: env_js_1.env.CLOUDINARY_API_SECRET,
    });
}
async function uploadImage(buffer, folder = 'smartcut') {
    if (!isConfigured) {
        console.warn('Cloudinary not configured');
        return null;
    }
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder,
            resource_type: 'image',
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        }, (error, result) => {
            if (error || !result) {
                reject(error || new Error('Upload failed'));
                return;
            }
            resolve({
                url: result.secure_url,
                publicId: result.public_id,
            });
        });
        stream.end(buffer);
    });
}
async function deleteImage(publicId) {
    if (!isConfigured || !publicId)
        return false;
    try {
        await cloudinary_1.v2.uploader.destroy(publicId);
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=cloudinary.js.map