import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { CoursService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
    const result = await CoursService.createCourseIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created succesfully',
        data: result,
        
    })
})

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CoursService.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course are retrieved successfully',
        data: result,
    })
})


const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CoursService.getSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single course is retrieved successfully',
        data: result,
    })
})

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CoursService.updateCourseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is updated successfully',
        data: result
    })
})


const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CoursService.deletedCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
      });
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CoursService.assignFacultiesWithCourseIntoDB(courseId, faculties)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
      });

})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const { faculties } = req.body;

    const result = await CoursService.removeFacultyFromCourseFromDB(courseId, faculties)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted succesfully',
        data: result,
      });
})


export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
    assignFacultiesWithCourse,
    removeFacultiesFromCourse,






}