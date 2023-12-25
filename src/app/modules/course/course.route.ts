import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router()

router.post(
    '/create-course',
    auth(USER_ROLE.admin),
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseControllers.createCourse,
)

router.delete('/:id', CourseControllers.deleteCourse);



router.delete(
    '/:courseId/remove-faculties',
    auth('admin'),
    validateRequest(CourseValidation.facultyWithCourseValidationSchema),
    CourseControllers.removeFacultiesFromCourse,
    )
    
router.put(
        '/:courseId/assign-faculties',
        validateRequest(CourseValidation.facultyWithCourseValidationSchema),
        CourseControllers.updateCourse,
    )

router.get('/', auth('student', 'faculty', 'admin'), CourseControllers.getSingleCourse);
router.get('/:id', CourseControllers.getSingleCourse)

router.patch(
    '/:id', 
    auth('admin'),
    validateRequest(
        CourseValidation.updateCourseValidationSchema
    ),
    CourseControllers.updateCourse
)


export const CourseRoutes = router;