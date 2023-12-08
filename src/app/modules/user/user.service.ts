import httpStatus from "http-status"
import config from "../../config"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import { Student } from "../student.model"
import { TStudent } from "../student/student.interface"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import mongoose, {startSession} from 'mongoose'



const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    //create a user object
    const userData: Partial<TUser> = {}

    //if password is not given, use default password
    userData.password = password || (config.default_password as string)

    //set student role
    userData.role = 'student'

//year Semester Code
    // const generateStudentId = (payload: TAcademicSemester) => {
        
    // }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        //set manually generated id
    userData.id = '2023100001'

    //create a user transaction- 1
    const newUser = await User.create([userData], {session}) //array

    //create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
        }
        //set id, _id as user
        studentData.id = newUser[0].id;
        studentData.user = newUser[0]._id; //reference _id
// creat a student (transaction -2)
        const newStudent = await Student.create([studentData], { session });
        
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
        }

        await session.commitTransaction()
        await session.endSession()

        return newStudent;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
      }
    };
    
export const UserServices = {
    createStudentIntoDB
}
