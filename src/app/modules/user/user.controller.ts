
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendRes";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";



const createStudent = catchAsync(async(req, res) => {
    
   
        const {password, student: studentData } = req.body;
        
    
        const result = await UserServices.createStudentIntoDB(password, studentData)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        });
   
})
const createAdmin = catchAsync(async(req, res) => {
    
   
        const {password, student: studentData } = req.body;
        
    
        const result = await UserServices.createStudentIntoDB(password, studentData)

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Student created successfully',
            data: result
        });
   
})

export const UsersControllers = {
    createStudent,
    createAdmin,
}