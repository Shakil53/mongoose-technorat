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

const getAllSemesterRegistrations = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is retrieved successfully',
            data: result,
        })
})

const getSingleSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SemesterRegistrationService.getSingleSemesterRegistration(id)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single Semester Registration here',
            data: result,
    })
})

const updateSemesterRegistration = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;

    const result = await SemesterRegistrationService.updateSemesterRegistration(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester Registration is updated',
        data: result,
    })
})


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,


}