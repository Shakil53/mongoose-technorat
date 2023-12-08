import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { AcademicDepartmentService } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic department is created successfully",
        data: result
    })
})

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic departments is created successfully",
        data: result
    })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.getSingleAcademicDepartment(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single Academic department is created successfully",
        data: result
    })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.updateAcademicDepartmentIntoDB(departmentId,
        req.body,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic faculty is updated successfully",
        data: result,
    });
    
});


export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}


