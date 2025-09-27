/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    // res.status(httpStatus.CREATED).json({
    //     success: true,
    //     message: "User created successfully!",
    //     user
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User create successfully",
        data: user,
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users Retrieved Successfully",
    //     data: users
    // })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Users Retrieved Successfully",
        data: result.data,
        meta: result.meta
    })
})

const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload;

    const verifiedToken = req.user;

    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Updated Successfully",
        data: user
    })
})

/* 
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // throw new Error("Default error");
        // throw new AppError(httpStatus.BAD_REQUEST ,"Custom error")

        const user = await UserServices.createUser(req.body);

        res.status(httpStatus.CREATED).json({
            message: "User Created Successfully",
            user
        })
    } catch (err: any) {
        // console.log(error);
        // res.status(httpStatus.BAD_REQUEST).json({
        //     message: `Something Went Wrong!! ${err.message}`,
        //     err
        // })
        next(err)
    }
}
*/

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
}