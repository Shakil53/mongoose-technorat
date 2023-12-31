import { Schema, model } from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, StudentMethods, StudentModel, TUserName } from './student/student.interface';
// import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../config';





const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxlength: [20, 'First name can not be more than 20 character'],
        trim: true,
        // custom validation
        // validate: {
        //     validator: function (value) {
        //         const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        //         return firstNameStr === value;
        //     },
        //     message: '{VALUE}, is not in wrong format'
        // }
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        // custom vaidtation
        // validate: {
        //     validator: (value: string) => validator.isAlpha(value),
        //     message: '{VALUE} is not valid'
        // }
    }
})

const guardianSchema = new Schema<TGuardian>(
    {
        fatherName: { type: String, required: true },
        fatherOccupation: { type: String, required: true },
        fatherContactNo: { type: String, required: true },
        motherName: { type: String, required: true },
        motherOccupation: { type: String, required: true },
        motherContactNo: {type: String, required: true}
    }
)
const localGuardianSchema = new Schema<TLocalGuardian>(
    {
        name: { type: String, required: true },
        occupation: { type: String, required: true },
        contactNo: { type: String, required: true },
        address: {type: String, required: true}
    }
)
// main Schema --------------
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({

    id: { type: String, required: [true, 'ID is required'], unique: true },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        unique: true,
        ref: 'User'

    },
    
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
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: true,
        unique: true,
        // custom validation
        // validate: {
        //     validator: (value: string) => validator.isEmail(value),
        //     message: '{VALUE} is not a valid email'
        // }
    },
    contactNo: {
        type: String,
        required: true
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
    admissionSemester: { type: Schema.Types.ObjectId },
    

   
    isDeleted: {
        type: Boolean,
        default: false
    }

})
// pre save middleware or middleware hook : will work on create function
// studentSchema.pre('save', async function (next) {
//     // console.log(this, 'pre hook : we will save our data');
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const user = this;
//     // hashing password and save into db using bcrypt
// //   user.password = await  bcrypt.hash(user.password, Number(config.bycrypt_salt_rounds))

//     next()

// })
// // post save middleware or middleware hook
// studentSchema.post('save', function (doc,next) {
//     // doc.password =''
//     // console.log(this, 'post hook : we save our data');
//     next()

// })
// // query middleware
// studentSchema.pre('find', function (next) {
//     console.log();
    
//     next()
// })

studentSchema.methods.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id })
    
    return existingUser
    
}



export const Student = model<TStudent, StudentModel>('Student', studentSchema )