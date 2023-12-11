import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { CourseReviewService } from "./courseReview.service";


const createCourseReview = catchAsync(async (req, res) => {
    const result = await CourseReviewService.createCourseReviewIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Review created successfully',
        data: result
    })
})

const getAllCourseReview = catchAsync(async (req, res) => {
    const result = await CourseReviewService.getAllAcademicCourseReview();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Reviews are here',
        data: result
    })
})


const getSingleCourseReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseReviewService.getSingleCourseReview(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Review is here',
        data: result
    })
})


const updateCourseReview = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseReviewService.updateCourseReviewIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course Review is updated successfully',
        data: result,
    })
})


export const CourseReviwController = {
    createCourseReview,
    getAllCourseReview,
    getSingleCourseReview,
    updateCourseReview



}