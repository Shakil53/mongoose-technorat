import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router()

// will call controller function

// router.post('/create-student', StudentControllers.createStudent)

router.get('/',
    auth('admin', 'faculty'),
    StudentControllers.getAllStudents)


router.get('/:id',
    auth('admin', 'faculty'),
    StudentControllers.getSingleStudent)

router.patch('/:id',
    validateRequest(updateStudentValidationSchema), 
    StudentControllers.deleteStudent);



router.delete('/:id',StudentControllers.deleteStudent)

export const StudentRoutes = router;