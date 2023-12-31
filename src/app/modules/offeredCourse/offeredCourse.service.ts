import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { FacaltyModel} from "../faculty/faculty.model";
import { hasTimeConflict } from "../../utils/offeredCourse.utilies";



const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {

    //check if the semester id is Exist
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime } = payload;

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration)
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This semester Registration not found')
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty)
    if (!isAcademicFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic Faculty is not found')
    }
    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment)
    if (!isAcademicDepartmentExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic Department is not found')
    }
    const isCourseExists = await Course.findById(course)
    if (!isCourseExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This course is not found')
    }
    const isFacultyExists = await FacaltyModel.findById(faculty)
    if (!isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This faculty is not found')
    }

    //check if the department is belong to the faculty
    const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
        _id: academicDepartment,
         academicFaculty
    })
    if (!isDepartmentBelongToFaculty) {
        throw new AppError(httpStatus.BAD_REQUEST,`This ${isAcademicDepartmentExists.name} is not belong to this ${isAcademicFacultyExists.name}`)
    }

    //check if the same offered course same section in same registered semester exists
    const isSameOfferedCourseExistsWithSameRegisteredWithSameSection = await OfferedCourse.findOne({
        semesterRegistration,course, section
    })
    if (isSameOfferedCourseExistsWithSameRegisteredWithSameSection) {
        throw new AppError(httpStatus.BAD_REQUEST,`offered course with same section is already exists`)
    }

    //get the schedules of the faculties
    const assignedSchedules = await OfferedCourse.find({
        semesterRegistration,
        faculty,
        days: {$in: days}
    }).select('days startTime endTime')
    
    const newSchedules = {
        days,
        startTime,
        endTime,
    }

    if (hasTimeConflict(assignedSchedules, newSchedules)) {
        throw new AppError(
            httpStatus.CONFLICT,
            `This faculty is not available at that time! choose other time or day`
        )
    };
   







    const result = await OfferedCourse.create({...payload, academicSemester})
    
    return result;

} 


// const updateOfferedCourseIntoDB = async(
//     id: string,
//     payload: Partial<TOfferedCourse>,
// ) => {
    

//     const isOfferedCourseExists = await OfferedCourse.findById(id);
// }
// if (!isOfferedCourseExists) {
//         throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found!')
//     }

// const isFacultyExists = await Faculty.findById(faculty)




export const OfferedCourseService = {
    createOfferedCourseIntoDB,

}