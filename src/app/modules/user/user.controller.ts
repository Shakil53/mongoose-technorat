
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendRes";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";




const createStudent = catchAsync(async (req, res) => {
    
    console.log(req.file, 'file');
    // console.log(req.body);

   
        const {password, student: studentData } = req.body;
        
    
        const result = await UserServices.createStudentIntoDB(req.file,password, studentData)

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
const getMe = catchAsync(async(req, res) => {
    
    // const token = req.headers.authorization
    // if (!token) {
    //     throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
    // }

    const { userId, role } = req.user;

    const result = await UserServices.getMe(userId, role
            

    )
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is retrived successfully',
        data: result
    });
   
})
const changeStatus = catchAsync(async(req, res) => {
    
    const id = req.params.id;
    

    const result = await UserServices.changeStatus(id,req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Status is updated successfully',
        data: result
    });

})
export const UsersControllers = {
    createStudent,
    createAdmin,
    getMe,
    changeStatus,
}