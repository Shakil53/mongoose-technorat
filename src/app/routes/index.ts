import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';
import { CourseRoutes } from '../modules/course/course.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import EnrolledCourse from '../modules/EnrolledCourse/enrolledCourse.model';
import { EnrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.route';


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
        path: '/faculties',
        route: FacultyRoute,
    },
    {
        path: '/admins',
        route: AdminRoutes,
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
    },
    {
        path: 'semester-registration',
        route: SemesterRegistrationRoute
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/enrolled-courses',
        route: EnrolledCourseRoutes,
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);





export default router;