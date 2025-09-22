import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        // console.log(accessToken);

        if (!accessToken) {
            throw new AppError(403, "No Token Recieved");
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        // console.log(verifiedToken);

        // if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
        //     throw new AppError(403, "You ar not permitted to view this route!!!")
        // }

        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You ar not permitted to view this route!!!")
        }
        req.user = verifiedToken;
        next();
    } catch (error) {
        next(error)
    }
}