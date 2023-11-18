import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will cal controller function

router.post('/create-student', StudentControllers.createStudent)



export const StudentRoutes = router;