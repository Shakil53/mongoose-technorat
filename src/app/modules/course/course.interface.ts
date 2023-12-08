import {Types} from 'mongoose'

export type TPerRequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean
};

export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted?: boolean;
    preRequisiteCourse: [TPerRequisiteCourse];
}

export type TCourseFaculty = {
    couse: Types.ObjectId;
    faculties: [Types.ObjectId];
}