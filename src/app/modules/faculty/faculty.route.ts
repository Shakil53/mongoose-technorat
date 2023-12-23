
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';
import auth from '../../middlewares/auth';


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
router.get( '/', auth(), FacultyController.getAllFaculties
)


export const FacultyRoute = router;