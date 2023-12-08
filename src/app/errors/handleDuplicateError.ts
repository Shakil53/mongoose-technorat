import mongoose from "mongoose";
import { TErrorSources, TGenericErrorRespose } from "../interface/Error.interface";


const handleDuplicateError = (err: any): TGenericErrorRespose => {
    //Extract value within double qoutes using regex
    const match = err.message.match(/"([^"]*)"/);

    //The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];




    const errorSources: TErrorSources = [
        {
            path:'',
            message: extractedMessage,
        }
    ]
    const statusCode = 400;
    return {
        statusCode,
        message: `${extractedMessage} is already exists`,
        errorSources

    }
}

export default handleDuplicateError;