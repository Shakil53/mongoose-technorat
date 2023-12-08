import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespose } from "../interface/Error.interface";


const handelCastError = (err: mongoose.Error.CastError): TGenericErrorRespose => {

    const errorSources: TErrorSources = [{
        path: err.path,
        message: err.message,

    }]
    
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    }
}

export default handelCastError;