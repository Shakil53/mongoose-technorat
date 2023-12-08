import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

//army
const validateRequest = (schema: AnyZodObject) =>{
    return async (req: Request, res: Response, next: NextFunction) => {
    
        try {
             //validation check
        //if everything all right then next()=> controller
       await schema.parseAsync({
        body: req.body,
   
})
        next()
    
        } catch(err) {
            next(err)
        }      
}
}

export default validateRequest;