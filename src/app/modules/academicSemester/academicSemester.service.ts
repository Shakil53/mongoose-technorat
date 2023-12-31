import { academicSemesterNameCodeMapper } from "./academicSemester.controller"
import { TAcademicSemester} from "./academicSemester.interface"
import {  AcademicSemester } from "./academicSemester.model"



const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {

    //semester name => semester code

    //academicSemesterNameCodeMapper['Fall']
   if (academicSemesterNameCodeMapper[payload.name]! == payload.code) {
        throw new Error('invalid Semester Code')
    }

    const result = await AcademicSemester.create(payload)
    return result;
}



export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
}