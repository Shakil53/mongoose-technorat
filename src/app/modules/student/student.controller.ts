import { Request, Response } from "express";
import { StudentServices } from "./student.service";
// import studentValidationSchema from "./student.validation";

import studenValidationSchema from "./student.validation";


const createStudent = async(req: Request, res: Response) => {
    
    try {
        const { student: studentData } = req.body;
        
        // // joi validation
        // const { error, value } = studentValidationSchema.validate(studentData)
        // // console.log(error, value);

        // creating a schema validation using Zod
        const zodParsedData = studenValidationSchema.parse(studentData)


        const result = await StudentServices.createStudentIntoDB(zodParsedData)

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something went worng',
        //         error: error.details
        //     })
        // }
            
        res.status(200).json({
        success: true,
        message: 'Student is created successfully',
        data: result
    })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went worng',
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
        const { studentId } = req.params
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