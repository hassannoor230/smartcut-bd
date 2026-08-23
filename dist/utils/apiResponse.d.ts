import { Response } from 'express';
export declare function successResponse(res: Response, data?: unknown, message?: string, statusCode?: number): Response<any, Record<string, any>>;
export declare function errorResponse(res: Response, message?: string, statusCode?: number, errors?: unknown[]): Response<any, Record<string, any>>;
//# sourceMappingURL=apiResponse.d.ts.map