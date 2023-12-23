import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
    '/create-academic-faculty',
    validateRequest(
        AcademicFacultyValidation.createAcademicFacultyValidationSchema
    ),
    AcademicFacultyController.createAcademicFaculty,
);

router.get(
    '/:facultyId', AcademicFacultyController.getSingleAcademicFaculty
)

router.patch(
    '/:semesterId',
    validateRequest(
        AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
    ),
    AcademicFacultyController.updateAcademicFaculty
)
router.get(
    '/',
    AcademicFacultyController.getSingleAcademicFaculty
)

router.get('/', auth(), AcademicFacultyController.getAllAcademicFaculties);


export const AcademicFacultyRoutes = router;