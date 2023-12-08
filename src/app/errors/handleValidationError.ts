
import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespose } from "../interface/Error.interface";



const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorRespose => {
    const errorSources: TErrorSources = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message,
        }
    })

  

    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
       
    }
}

export default handleValidationError;