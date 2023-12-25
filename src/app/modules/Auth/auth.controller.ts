import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRes";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
    const result =await AuthServices.loginUser(req.body)
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    })
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User is logged in successfully!',
            data: {
                accessToken,
                needsPasswordChange,
                result
            },
        })
})
const changePassword = catchAsync(async (req, res) => {
    
    const { ...passwordData } = req.body;
    const result =await AuthServices.changePassword(req.user, passwordData)
        
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Password is updated successfully!',
            data: result,
        })
})


export const AuthControllers = {
    loginUser,
    changePassword,
}