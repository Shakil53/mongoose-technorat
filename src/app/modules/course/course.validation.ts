import { z } from 'zod';

const preRequisiteValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credite: z.number(),
        preRequisiteCourse: z.array(preRequisiteValidationSchema).optional(),
        isDeleted: z.boolean().optional(),
    }),
});

const updatePerRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credite: z.number().optional(),
        preRequisiteCourse: z.array(updatePerRequisiteCourseValidationSchema).optional(),
        isDeleted: z.boolean().optional(),
    })
})

const facultyWithCourseValidationSchema = z.object({
    body: z.object({
        faculties: z.array(z.string()),
    })
})


export const CourseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultyWithCourseValidationSchema,
}