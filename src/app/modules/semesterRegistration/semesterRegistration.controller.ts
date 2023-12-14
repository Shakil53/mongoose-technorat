import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import httpStatus from "http-status";
import { SemesterRegistrationService } from "./semsterRegistraion.service";


const createSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body)


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is created successfully!',
            data: result,
    })
})



export const SemesterRegistrationController = {
    createSemesterRegistration,
}