import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { EnrolledCourseService } from "./enrolledCourse.service";



const createEnrolledCourse = catchAsync(async (req, res) => {
    const userId = req.user.userId;
    const result = await EnrolledCourseService.createEnrolledCourseIntoDB(userId, req.body)


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is enrolled succesfully',
            data: result,
    })
})

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  
    const facultyId = req.user.id;
    const result = await EnrolledCourseService.updateEnrolledCourseMarksIntoDB(facultyId,req.body)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is created Successfully',
        data: result,
    })
})


export const EnrolledCourseController = {
    createEnrolledCourse,
    updateEnrolledCourseMarks,
}