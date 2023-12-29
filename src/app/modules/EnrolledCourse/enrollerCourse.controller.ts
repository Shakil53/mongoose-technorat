import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";



const createEnrolledCourse = catchAsync(async (req, res) => {
    const result = await EnrolledCourseController.createEnrolledCourse



        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student is enrolled succesfully',
            data: result,
    })
})


export const EnrolledCourseController = {
    createEnrolledCourse,
}