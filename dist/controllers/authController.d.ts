import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare function login(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function logout(_req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function me(req: AuthRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authController.d.ts.map