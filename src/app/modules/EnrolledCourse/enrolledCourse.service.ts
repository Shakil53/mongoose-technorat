import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../offeredCourse/offeredCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import EnrolledCourse from "./enrolledCourse.model";
import { Student } from "../student.model";



const createEnrolledCourseIntoDB = async (userId: string, payload: TEnrolledCourse) => {
    /**
     * Step1: Check if the offered course is exists
     * Stet2: Check if the student is already enrolled
     * Step3: Create an enrolled course
     */

    const { offeredCourse } = payload
    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

    if (!isOfferedCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!')
    }
    if (isOfferedCourseExists.maxCapacity <= 0) {
        throw new AppError(httpStatus.BAD_GATEWAY, 'Room is full')
    }

    const student = await Student.findOne({ id: userId }).select('id')
    if (!student) {
        throw new AppError(httpStatus.NOT_FOUND, 'Student not found!')
    }

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        offeredCourse,
        student: student._id
})

    
    if (isStudentAlreadyEnrolled) {
        throw new AppError(httpStatus.CONFLICT, 'student is already enrolled')
    }





}


export const EnrolledCourseService = {
    createEnrolledCourseIntoDB,
}