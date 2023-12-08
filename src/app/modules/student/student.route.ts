import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router()

// will call controller function

// router.post('/create-student', StudentControllers.createStudent)

router.get('/:studentId', StudentControllers.getSingleStudent)

router.patch('/:studentId',
    validateRequest(updateStudentValidationSchema), 
    StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents)

router.delete('/:studentId',StudentControllers.deleteStudent)

export const StudentRoutes = router;