import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";


//army
const auth = (...requiredRoles: TUserRole[]) =>{
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
        console.log(req.headers.authorization);

        const token = (req.headers.authorization);
        
        //if the token is sent from the client
    if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Unathorized')
    }
//checking if the given token is valid
        
const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
          
    // decoded undefined
    console.log(decoded);
          
        const { role, userId, iat } = decoded;
      
    
    //checking if the user is exist
    const user = await User.isUserExistByCustomId(userId.id)
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
    
        if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }




        
      if (requiredRoles && requiredRoles.includes(role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
            }

            req.user = decoded as JwtPayload;
            next();

        
            
          });

        
  
}


export default auth;