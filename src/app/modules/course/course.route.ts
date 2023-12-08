import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
const router = express.Router()

router.post(
    '/create-course',
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseControllers.createCourse,
)

router.delete('/:id', CourseControllers.deleteCourse);


router.put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidation.facultyWithCourseValidationSchema),
    CourseControllers.updateCourse,
)

router.delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidation.facultyWithCourseValidationSchema),
    CourseControllers.removeFacultiesFromCourse,
)


router.get('/', CourseControllers.getAllCourses);


export const CourseRoutes = router;