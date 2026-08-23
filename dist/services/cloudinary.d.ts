import { v2 as cloudinary } from 'cloudinary';
declare const isConfigured: boolean;
export { cloudinary, isConfigured as isCloudinaryConfigured };
export declare function uploadImage(buffer: Buffer, folder?: string): Promise<{
    url: string;
    publicId: string;
} | null>;
export declare function deleteImage(publicId: string): Promise<boolean>;
//# sourceMappingURL=cloudinary.d.ts.map