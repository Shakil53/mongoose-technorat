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
router.patch(
    '/update-enrolled-course-marks',
    auth('faculty'),
    validateRequest(EnrollerCourseValidation.updateEnrolledCourseMarksValidationSchema),
    EnrolledCourseController.updateEnrolledCourseMarks,
)

export const EnrolledCourseRoutes = router;