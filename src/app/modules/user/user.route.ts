import express from 'express';
import { UsersControllers } from './user.controller';

import { createStudenValidationSchema, } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { UserValidation } from './user.validation';


const router = express.Router();


router.post('/create-users',
    auth(USER_ROLE.admin),
    validateRequest(createStudenValidationSchema), UsersControllers.createStudent)

router.post(
    '/create-faculty',
    auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    UsersControllers.createStudent,
)

router.post(
    '/create-admin',
    // auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    UsersControllers.createAdmin,
)
router.post(
    '/change-status/:id',
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.changeStatusValidationSchema),
    UsersControllers.changeStatus,
)

router.get(
    '/me',
    auth('student', 'faculty', 'admin'),
  UsersControllers.getMe,
)

export const UserRoutes = router;