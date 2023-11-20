import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

// create document
const createStudentIntoDB = async (studentData: Student) => {

    // const result = await StudentModel.create(student) // built in static method

    // instance
    const student = new StudentModel(studentData);
    const result = await student.save() // built in instance method in mongoose



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