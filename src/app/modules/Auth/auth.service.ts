import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.ultils";



const loginUser = async (payload: TLoginUser) => {
    console.log(payload);

    //checking if the user is exist
    const user = await User.isUserExistByCustomId(payload.id)
        if (! user) {
        throw new AppError(httpStatus.NOT_FOUND,'This user is not exist')
    }


       //checking if the user is already deleted
       const isDeleted = user?.isDeleted
       if (isDeleted) {
           throw new AppError(httpStatus.FORBIDDEN,'This user is deleted')
       }
       //checking if the user is blocked
       const userStatus = user?.status;
       if (userStatus === 'blocked') {
           throw new AppError(httpStatus.FORBIDDEN,'This user is blocked')
    }
    


    //checking if the password is correct
    if (! await User.isPasswordMatched(payload.password, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN,'Password do not matched')
    }

    
    //create jwt token and sent to the client
    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expire_in as string)
    
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expire_in as string)

    

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange
    };
};
const changePassword = async (userData: JwtPayload, payload: {oldPassword: string, newPassword: string})=>{
     
    //checking if the user is exist
    const user = await User.isUserExistByCustomId(userData.userId)
        if (! user) {
        throw new AppError(httpStatus.NOT_FOUND,'This user is not exist')
    }


       //checking if the user is already deleted
       const isDeleted = user?.isDeleted
       if (isDeleted) {
           throw new AppError(httpStatus.FORBIDDEN,'This user is deleted')
       }
       //checking if the user is blocked
       const userStatus = user?.status;
       if (userStatus === 'blocked') {
           throw new AppError(httpStatus.FORBIDDEN,'This user is blocked')
    }
    


    //checking if the password is correct
    if (! await User.isPasswordMatched(payload?. oldPassword, user?.password)) {
        throw new AppError(httpStatus.FORBIDDEN,'Password do not matched')
    }

      
    //hash new password
    const newHashedPassword = await bcrypt.hash(payload.newPassword,Number(config.bycrypt_salt_rounds))


    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role
    },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date()
            
        })
    return null
 }

export const AuthServices = {
    loginUser,
    changePassword,
}