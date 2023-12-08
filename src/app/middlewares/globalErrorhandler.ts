/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import  { ErrorRequestHandler, NextFunction, Request, Response} from 'express';
import { ZodError,ZodIssue } from 'zod';
import { TErrorSources } from '../interface/Error.interface';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handelCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';


const globalErrorhandler: ErrorRequestHandler = (err, req, res, next) => {

  //setting default values


    let statusCode = 500;
  let message = err.message || 'something went wrong!';

  

  let errorSources: TErrorSources = [{
    path: '',
    message: 'something went wrong!'
  }]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    // console.log(simplifiedError);
  }
  else if (err?.name === 'validationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode,
      message = simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
  }
  else if (err?.name === 'CastError') {
    const simplifiedError = handelCastError(err)
    statusCode = simplifiedError?.statusCode,
      message = simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
  }
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode,
      message = simplifiedError?.message,
      errorSources = simplifiedError?.errorSources
  }
    return res.status(statusCode).json({
      success:false,
      message,
      errorSources,
      stack: config.NODE_ENV ==='development'? err?.stack : null,
  
    })
}
  
export default globalErrorhandler;