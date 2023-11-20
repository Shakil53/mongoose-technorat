import { Student } from "../student.model";
import { TStudent } from "./student.interface";

// create document
const createStudentIntoDB = async (studentData: TStudent) => {

    // const result = await StudentModel.create(student) // built in static method

    // instance
    const student = new Student(studentData);
    if (await student.isUserExists(studentData.id)) {
        throw Error('User already exists')
    }
    

    const result = await student.save() // built in instance method in mongoose



    return result;
    
}
// get document
const getAllStudentFromDB = async () => {
    const result = await Student.find();
    return result;
}

// get signle data
const getSingleStudentDB = async (id: string) => {
    const result = await Student.findOne({id})
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentDB,
}