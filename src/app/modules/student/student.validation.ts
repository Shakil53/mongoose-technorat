import { z } from "zod";



// Zod validation schema for UserName
const createUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).trim(),
    middleName: z.string(),
    lastName: z.string().min(1).trim(),
  });
  
  // Zod validation schema for Guardian
  const createGuardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
  });
  
  // Zod validation schema for LocalGuardian
  const CreateLocalguardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
  });
  
  // Zod validation schema for Student
export const createStudenValidationSchema = z.object({
  body:
  z.object({
    
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.date().optional(),
      email: z.string().email(),
    contactNo: z.string(),
    emergencyNo: z.string(),
    bloodGroup: z.enum(['A', 'B', 'AB', 'O', 'A+', 'B+', 'AB+', 'O+']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: createGuardianValidationSchema,
    localGuardian: CreateLocalguardianValidationSchema,
    admissionSemester:z. string(),
      profileImg: z.string(),
    })
   
  }),
  
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional()
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional()
});
export const updateStudentValidationSchema = z.object({
  body: z.object({
    studnet: z.object({
      name: updateUserNameValidationSchema,
      gerder: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB-', ')O-', 'O+',]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateLocalGuardianValidationSchema.optional(),
      localGuardinan: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional()


    })
  })
})
  
export const studenValidations = {
  createStudenValidationSchema,
  updateStudentValidationSchema,
  };