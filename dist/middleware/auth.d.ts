import { Request, Response, NextFunction } from 'express';
import { IAdmin } from '../models/Admin.js';
export interface AuthRequest extends Request {
    admin?: IAdmin;
}
export declare function requireAuth(req: AuthRequest, _res: Response, next: NextFunction): Promise<void>;
export declare function requireRole(...roles: string[]): (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map