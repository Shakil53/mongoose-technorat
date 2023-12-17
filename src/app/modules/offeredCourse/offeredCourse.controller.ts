import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import httpStatus from "http-status";
import { OfferedCourseService } from "./offeredCourse.service";


const createOfferedCouse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Offered Course is created successfully',
            data: result,
    })
})


// const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
//     const result = 


//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Offered courses are retrive successfully',
//             data: result
//     })
// })



export const OfferedCourseController = {
    createOfferedCouse,
}