import jwt from "jsonwebtoken";
import { JWTPAYLOAD } from "./JwtModel";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const GenerateToken = (data: JWTPAYLOAD) => {
    return jwt.sign(data, SECRET, { expiresIn: "1d" });
};


export const VerifyToken=(token:string):JWTPAYLOAD=>{
    return jwt.verify(token,SECRET) as JWTPAYLOAD;
}
