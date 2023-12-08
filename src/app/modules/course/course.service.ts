import { TCourse, TCourseFaculty } from "./course.interface";
import { Course, CourseFaculty } from "./course.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourse.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    
    const result = await courseQuery.modelQuery;
    return result;
    
}

const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourse.course')
    return result;
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourse, ...courseRemainingData } = payload;
    const session = await mongoose.startSession()
    try {
        session.startTransaction();

        //step1: basic course info update
        const updateBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session,
            }
        )
        if (!updateBasicCourseInfo) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course')

        }
        //check if there is any pre requisite courses to update
        if (preRequisiteCourse && preRequisiteCourse.length > 0) {
            //filter out the deleted fields
            const deletedPreRequisite = preRequisiteCourse.filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            const deletedPreRequisiteCourse = await Course.findByIdAndRemove(
                id,
                {
                  $pull: {
                    preRequisiteCourse: { course: { $in: deletedPreRequisite } },
                  },
                },
                // {
                //     new: true,
                //     runValidators: true,
                //     session,
                // }
            );
            if (!deletedPreRequisiteCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
            }
            
            //filter out the new course fields
            const newPreRequisites = preRequisiteCourse?.filter(
                (el) => el.course && !el.isDeleted,
            );

            const newPreRequisiteCourse = await Course.findByIdAndUpdate(
                id,
                {
                  $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
                },
                {
                  new: true,
                  runValidators: true,
                  session,
                },
              );
            

            if (!newPreRequisiteCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
            }
            const result = await Course.findById(id).populate('preRequisiteCourse.course')
            return result;
        }
        await session.commitTransaction();
        await session.endSession();

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
}

const deletedCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
        },

    )
    return result;
}

const assignFacultiesWithCourseIntoDB = async (id: string,
    payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: {faculties: {$each: payload}},
        },
        {
            upsert: true,
            new: true,
        }
    )
    return result;
}

const removeFacultyFromCourseFromDB = async(
    id: string,
    payload: Partial<TCourseFaculty>,
) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: {faculties: {$in: payload}},
        },
        {
            new: true,

        },
        )
        return result;
}


export const CourseService = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    updateCourseIntoDB,
    deletedCourseFromDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultyFromCourseFromDB,






}