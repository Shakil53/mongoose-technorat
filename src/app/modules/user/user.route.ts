import express from 'express';
import { UsersControllers } from './user.controller';

import { createStudenValidationSchema, } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';





const router = express.Router();





router.post('/create-users',validateRequest(createStudenValidationSchema), UsersControllers.createStudent)

export const UserRoutes = router;