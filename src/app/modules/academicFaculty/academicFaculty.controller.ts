import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { AcademicFacultyService } from "./academicFaculty.service";

//create Academic faculty
const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is created Successfully',
        data: result,
    })
})

const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All academic Faculties',
        data: result,
    })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is retrieved successfully',
        data: result,
    })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
        facultyId,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty is retrieved successfully',
        data: result,
    })
})


export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty



}