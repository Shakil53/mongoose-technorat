import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"
import catchAsync from "../utils/catchAsync";

//army
const validateRequest = (schema: AnyZodObject) =>{
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
       
    //validation check
   //if everything all right then next()=> controller
  await schema.parseAsync({
     body: req.body,
     cookies: req.cookies,

})
   next()

  
})
}

export default validateRequest;