import { Schema, model } from "mongoose";
import { TCourseReview, TDetails, TTags } from "./courseReview.interface";

const tagsSchema = new Schema<TTags>({
    name: {
        type: String,
    
    },
    isDeleted: {
        type: Boolean
    }
})

const detailsSchema = new Schema<TDetails>({
    level: String,
    description: String,
})

const courseReviewSchema = new Schema<TCourseReview>({

    _id: {
        type: Schema.Types.ObjectId,

    },
    title: {
        type: String,
    },
    instructor: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,

    },
    tags: [tagsSchema],
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    language: {
        type: String,
    },
    provider: {
        type: String,
    },
    durationInWeeks: {
        type: Number
    },
    details: {
        type: detailsSchema
    }

})


//model create over the courseReview Schema

export const courseReview = model<TCourseReview>('CourseReview', courseReviewSchema)