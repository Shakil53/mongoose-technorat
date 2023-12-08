import { Schema, model } from 'mongoose';

import { TAcademicSemester} from './academicSemester.interface';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.constant';



//schema design with TAcademicSemester generic
const acdemicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        required: true,
        enum: AcademicSemesterName
    },
    year: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        enum: AcademicSemesterCode
    },
    startMonth: {
        type: String,
        required: true,
       enum: Months
        
    },
    endMonth: {
        type: String,
        required: true,
        enum: Months
        
    }
   
}, {
    timestamps: true
},
);

//pre hook midleware
acdemicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })    
    if (isSemesterExists) {
        throw new Error('Semester is already exists')
    }
    next()
})



//created model here
export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', acdemicSemesterSchema)


