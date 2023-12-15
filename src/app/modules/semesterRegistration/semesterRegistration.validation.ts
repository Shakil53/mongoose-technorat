import { z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.constant';


const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...semesterRegistrationStatus as [string, ...string[]]]),
        startDate:z.date(),
        endDate: z.date(),
        minCredit: z.number(),
        maxCredit: z.number()
    })
})

const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z.enum([...semesterRegistrationStatus as [string, ...string[]]]).optional(),
        startDate:z.date().optional(),
        endDate: z.date().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional()
    })
})


export const semesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}