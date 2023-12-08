import express from 'express';
import { UsersControllers } from './user.controller';

import { studenValidations} from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';





const router = express.Router();





router.post('/create-users',validateRequest(studenValidations), UsersControllers.createStudent)

export const UserRoutes = router;