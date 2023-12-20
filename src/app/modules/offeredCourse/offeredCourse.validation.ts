import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeStringSchema =  z.string().refine((time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time)

},{ message: 'invalide time formate, expected "HH:MM" in 24 hours format'})

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
        startTime:timeStringSchema,
        endTime: timeStringSchema,

    }).refine(( body ) => {
        //startTime: 10:30 => 1970-01-01T10:30
        //endTime: 12:30    => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start;
    }, { message: 'Start Time should be before end time'})
})


const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z.number().optional(),
        days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,

    }).refine(( body ) => {
        //startTime: 10:30 => 1970-01-01T10:30
        //endTime: 12:30    => 1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`)
        const end = new Date(`1970-01-01T${body.endTime}:00`)
        return end > start;
    }, { message: 'Start Time should be before end time'})
    })


export const OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
}