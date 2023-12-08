
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';


const router = express.Router();



router.get(
    '/:id',
    FacultyController.getSingleFaculty
)


router.patch(
    '/:id',
    validateRequest(
        FacultyValidation.updateFacultyValidationSchema,
    ),
    FacultyController.updateFaculty
)

router.delete('/:id', FacultyController.deleteFaculty)


router.get(
    '/',
    FacultyController.getSingleFaculty
)


export const FacultyRoute = router;