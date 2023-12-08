/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendRes";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";
// import studentValidationSchema from "./student.validation";



// get data req, res controller
const getAllStudents= catchAsync(async (req, res) => {
    
    //   console.log(req.query);
        const result = await StudentServices.getAllStudentFromDB(req.query)


        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Students are retrieved created successfully',
            data: result
        });
       
    

});



const getSingleStudent = catchAsync(async(req, res, next) => {
   
        const { id } = req.params
        const result = await StudentServices.getSingleStudentFromDB(id)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student are retrieved successfully',
            data: result
        });
    
}) 
// update student data
const updateStudent = catchAsync(async (req, res, next) => {
    
    const { id } = req.params;
    const { student } = req.body;
        const result = await StudentServices.updateStudentIntoDB(id, student)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message:  'Student data update successfully',
            data: result
        });
        
   
})
// delete student data
const deleteStudent = catchAsync(async (req, res, next) => {
    
        const { id } = req.params
        const result = await StudentServices.deleteStudentFromDB(id)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message:  'Student data update successfully',
            data: result
        });
        
   
})


export const StudentControllers = {
   
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
    
}