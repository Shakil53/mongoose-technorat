import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';
import { CourseRoutes } from '../modules/course/course.route';


const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-faculties',
        route: AcademicSemesterRoutes
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoute
    },
    {
        path: 'courses',
        route: CourseRoutes
    },
    {
        path: 'faculties',
        route: FacultyRoute
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);





export default router;