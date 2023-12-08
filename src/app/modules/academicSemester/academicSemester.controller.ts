import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { AcademicSemesterServices } from "./academicSemester.service";
import { TAcademicSemesterCodeMapper } from "./academicSemester.interface";


const createAcademicSemester = catchAsync(async (req, res) => {

    
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic semester created successfully',
        data: result,
    })
})


export const AcademicSemesterController = {
    createAcademicSemester,
}

//semester name => semester Code
export const academicSemesterNameCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03'
}
