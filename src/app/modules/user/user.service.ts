/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status"
import config from "../../config"
import AppError from "../../errors/AppError"
import { Student } from "../student.model"
import { TStudent } from "../student/student.interface"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import mongoose from 'mongoose'
import { TFaculty } from "../faculty/faculty.interface"
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model"
import { Faculty } from "../faculty/faculty.model"
import { Admin } from "../admin/admin.model"
import { TAdmin } from "../admin/admin.interface"
import { sendImageToCludinary } from "../../utils/sendImageToCloudinary"




const createStudentIntoDB = async (file: any, password: string, studentData: TStudent) => {
    //create a user object
    const userData: Partial<TUser> = {}

    //if password is not given, use default password
    userData.password = password || (config.default_password as string)

    //set student role
    userData.role = 'student';
    userData.email = studentData.email;

//year Semester Code
    // const generateStudentId = (payload: TAcademicSemester) => {
        
    // }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        //set manually generated id
      userData.id = await generateStudentId(admissionSemester);

      const path = file?.path;
      const imageName = `${userData.id}${studentData?.name?.firstName}`
      //send image to cloudinary
      sendImageToCludinary(imageName, path)

      

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
  userData.role = 'faculty';
  //set faculty email
  userData.email = payload.email;
  
    // find academic department info
    const academicDepartment = await AcademicDepartment.findById(
      payload.academicDepartment,
    );
  
    if (!academicDepartment) {
      throw new AppError(400, 'Academic department not found');
    }
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateFacultyId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session }); // array
  
      //create a faculty
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a faculty (transaction-2)
  
      const newFaculty = await Faculty.create([payload], { session });
  
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newFaculty;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };


  const createAdminIntoDB = async (password: string, payload: TAdmin) => {
    // create a user object
    const userData: Partial<TUser> = {};
  
    //if password is not given , use deafult password
    userData.password = password || (config.default_password as string);
  
    //set student role
    userData.role = 'admin';
    //set admin email
    userData.email = payload.email;
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //set  generated id
      userData.id = await generateAdminId();
  
      // create a user (transaction-1)
      const newUser = await User.create([userData], { session });
  
      //create a admin
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id
  
      // create a admin (transaction-2)
      const newAdmin = await Admin.create([payload], { session });
  
      if (!newAdmin.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newAdmin;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

const getMe = async (userId:string, role:string) => {
  
  // const decoded = verifyToken(token, config.jwt_access_secret as string)
  
  // const { userId, role } = decoded;
  // console.log(userId, role);

  let result = null
  if (role === 'student') {
    result = await Student.findOne({id:userId}).populate('user')
  }
  if (role === 'admin') {
    result = await Admin.findOne({id:userId}).populate('user')
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({id:userId}).populate('user')
  }


  return result
}
  
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true, });
  return result;
}



export const UserServices = {
    createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
  


   


}
