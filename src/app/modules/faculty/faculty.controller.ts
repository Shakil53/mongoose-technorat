import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { FacultyService } from "./faculty.service";




const getAllFaculties = catchAsync(async (req, res) => { 
    const result = await FacultyService.getSingleFacultyFromDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Faculty",
        data: result,
    })
})

const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyService.getSingleFacultyFromDB(id)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Single Faculty',
        data: result,
    })
})

const updateFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyService.updateFacultyIntoDB(id, faculty,);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrieved successfully',
        data: result,
    })
})

const deleteFaculty = catchAsync(async (req, res) => {
    const { id } = req.body;
    const result = await FacultyService.deleteFacultyFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is deleted successfully',
        data: result,
    })
})


export const FacultyController = {
    
    getAllFaculties,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,


}