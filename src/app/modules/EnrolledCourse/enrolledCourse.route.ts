import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrollerCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrollerCourse.controller';
import auth from '../../middlewares/auth';



const router = express.Router();


router.post(
    '/create-enrolled-course',
    auth('student'),
    validateRequest(EnrollerCourseValidation.createEnrolledCourseValidationSchema),
    EnrolledCourseController.createEnrolledCourse
)

export const EnrolledCourseRoutes = router;