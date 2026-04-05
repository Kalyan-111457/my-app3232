import { JWTPAYLOAD } from "../utils/JwtModel";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPAYLOAD;
        }
    }
}

export {};
