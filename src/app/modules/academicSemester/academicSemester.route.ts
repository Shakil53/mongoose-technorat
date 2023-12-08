import express from 'express'

import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemesterValidation';

const router = express.Router();

router.post('/create-accademic-semester',
    validateRequest(
        AcademicSemesterValidations.createAcademicSemesterValidationSchema
),
    AcademicSemesterController.createAcademicSemester)


export const AcademicSemesterRoutes = router;