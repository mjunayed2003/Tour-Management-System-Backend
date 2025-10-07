/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcrypt";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userTokens";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role
    // }

    // // generate access token
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);
    // // generate refresh token
    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES);

    const userTokens = createUserTokens(isUserExist);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }

}

const getNewAccessToken = async (refreshToken: string) => {
    // const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;

    // const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

    // if (!isUserExist) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User not found");
    // }
    // if (isUserExist.isActive === IsActive.INACTIVE || isUserExist.isActive === IsActive.BLOCKED) {
    //     throw new AppError(httpStatus.BAD_REQUEST, `User id ${isUserExist.isActive}`);
    // }
    // if (isUserExist.isDeleted) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
    // }

    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role
    // }

    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);

    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId);
    // console.log(user);

    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();


}



export const AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}