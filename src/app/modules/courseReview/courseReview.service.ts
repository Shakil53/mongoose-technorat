import { TCourseReview } from "./courseReview.interface";
import {  CourseReview } from "./courseReview.model";





const createCourseReviewIntoDB = async (payload: TCourseReview) => {
    const result = await CourseReview.create(payload);
    return result;
}


const getAllAcademicCourseReview = async () => {
    const result = await CourseReview.find();
    return result;
}

const getSingleCourseReview = async (id: string) => {
    const result = await CourseReview.findById(id);
    return result;
}


const updateCourseReviewIntoDB = async (id: string,
    payload: Partial<TCourseReview>) => {
    const result = await CourseReview.findOneAndUpdate(
        {
            _id: id
        },
        payload,
        {
            new: true,
        },
    ) 
    return result;
}


export const CourseReviewService = {
    createCourseReviewIntoDB,
    getAllAcademicCourseReview,
    getSingleCourseReview,
    updateCourseReviewIntoDB


}