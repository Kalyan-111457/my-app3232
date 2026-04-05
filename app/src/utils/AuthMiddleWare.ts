import { ExpressMiddlewareInterface } from "routing-controllers";
import { JWTPAYLOAD } from "./JwtModel";
import { Request, Response, NextFunction } from "express";
import { VerifyToken } from "./Jwt";

interface AuthenticatedRequest extends Request {
    user?: JWTPAYLOAD;
}

export class AuthMiddleWare implements ExpressMiddlewareInterface{
    use(request: AuthenticatedRequest, response: Response, next:NextFunction):void {

        const authheaders=request.headers.authorization;

        if(!authheaders){
            response.status(401).send("No Token");
            return;
        }

        const token=authheaders.split(" ")[1];

        if (!token) {
            response.status(401).send("Invalid Token");
            return;
        }

        try{
            const decoded = VerifyToken(token) as JWTPAYLOAD;
            request.user=decoded;
            next();
        }
        catch{
            response.status(401).send("Invalid Token");
        }

    }
}
