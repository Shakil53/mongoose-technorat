import { semesterRegistration } from "./semesterRegistration.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"


const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    
    const academicSemester = payload?.academicSemester;
     //check if the semester is exist
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)
    
     if (!isAcademicSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester not found')
    }
    //check if the semester is already registered
    const isSemesterRegistrationExists = await semesterRegistration.findOne({academicSemester})
    
    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, 'This semester is already Registered!')
    }
    
    const result = await semesterRegistration.create(payload)

    return result;
   
}






export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
}