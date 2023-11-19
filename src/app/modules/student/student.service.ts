import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

// create document
const createStudentIntoDB = async (student: Student) => {

    const result = await StudentModel.create(student)
    return result;
    
}
// get document
const getAllStudentFromDB = async () => {
    const result = await StudentModel.find();
    return result;
}

// get signle data
const getSingleStudentDB = async (id: string) => {
    const result = await StudentModel.findOne({id})
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentDB,
}