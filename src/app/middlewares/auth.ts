import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

//army
const auth = () =>{
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
        console.log(req.headers.authorization);
        const token = (req.headers.authorization);
        

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Unathorized')
        }
        

        next();
  
})
}

export default auth;