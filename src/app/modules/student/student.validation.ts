import { z } from "zod";



// Zod validation schema for UserName
const userNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).trim(),
    middleName: z.string(),
    lastName: z.string().min(1).trim(),
  });
  
  // Zod validation schema for Guardian
  const guardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
  });
  
  // Zod validation schema for LocalGuardian
  const LocalguardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
  });
  
  // Zod validation schema for Student
  const studenValidationSchema = z.object({
    id: z.string(),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string(),
      email: z.string().email(),
    contactNo: z.string(),
    emergencyNo: z.string(),
    bloodGroup: z.enum(['A', 'B', 'AB', 'O', 'A+', 'B+', 'AB+', 'O+']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: LocalguardianValidationSchema,
    profileImg: z.string(),
    isActive: z.enum(['active', 'blocked']).default('active'),
  });
  
  export default studenValidationSchema;
