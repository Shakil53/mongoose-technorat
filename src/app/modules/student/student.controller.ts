import { Request, Response } from "express";
import { StudentServices } from "./student.service";


const createStudent = async(req: Request, res: Response) => {
    
    try {
        const {student: studentData} = req.body;
        const result = await StudentServices.createStudentIntoDB(studentData)
            
        res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result
    })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went worng',
            error: err
        })
    };
    
}

// get data req, res controller
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB()

        res.status(200).json({
            success: true,
            message: 'Students are retrieved created successfully',
            data: result
        })


    } catch (err) {
        console.log(err)
    }


}
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const {studentId} = req.params
        const result = await StudentServices.getSingleStudentDB(studentId)
        
        res.status(200).json({
            success: true,
            message: ' Student is receive successfully',
            data: result
        })
    } catch (err) {
        console.log(err);
    }
}


export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
}