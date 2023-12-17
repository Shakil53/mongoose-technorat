import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';


const router = express.Router()


router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
    OfferedCourseController.createOfferedCouse,
)