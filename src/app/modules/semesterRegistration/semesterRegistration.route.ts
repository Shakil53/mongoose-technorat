

import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';


const router = express.Router();


router.post(
    '/create-semester-registration',
    validateRequest(
        semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
)



export const SemesterRegistrationRoute = router;