

import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { updateFacultyValidationSchema } from '../faculty/faculty.validation';


const router = express.Router();


router.post(
    '/create-semester-registration',
    validateRequest(
        semesterRegistrationValidations.createSemesterRegistrationValidationSchema,
    ),
    SemesterRegistrationController.createSemesterRegistration,
)

router.get('/',
        SemesterRegistrationController.getAllSemesterRegistrations,
        )

router.get(
    '/:id',
    SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch('/:id',
    validateRequest(semesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
    SemesterRegistrationController.updateSemesterRegistration);

export const SemesterRegistrationRoute = router;