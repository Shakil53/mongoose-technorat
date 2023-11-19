import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student/student.interface';


const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxlength: [20, 'First name can not be more than 20 character'],
        trim: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    }
})

const guardianSchema = new Schema<Guardian>(
    {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: {type: String, required: true}
    }
)
const localGuardianSchema = new Schema<LocalGuardian>(
    {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: {type: String, required: true}
    }
)
// main Schema --------------
const studentSchema = new Schema<Student>({

    id: { type: String, required: true, unique: true },
    name: {
        type: userNameSchema,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: '{VALUE} is not valid gender'
        },
        required: true
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    emergencyNo: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A", "B", "AB", "O", "A+", "B+", "AB+", "O+"]
    },
    presentAddress: { type: String },
    permanentAddress: { type: String },
    guardian: {
        type: guardianSchema,
        required: true
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true
    },
    profileImg: { type: String },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'

    }

})


export const StudentModel = model<Student>('Student', studentSchema )