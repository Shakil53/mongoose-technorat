import { semesterRegistration } from "./semesterRegistration.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { AcademicSemester } from "../academicSemester/academicSemester.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import QueryBuilder from "../../builder/QueryBuilder"

//create semesterRegistration
const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    
    const academicSemester = payload?.academicSemester;

    //check if there any registered semester that is already "upcoming" | "ongoing"
    const isThereAnyUpcomingOrOngoingSemester = await semesterRegistration.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }]
        
    })

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} register semester!`
        )
    }







     //check if the semester is exist
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)
    
     if (!isAcademicSemesterExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic semester not found')
    }
    //check if the semester is already registered
    const isSemesterRegistrationExists = await semesterRegistration.findOne({academicSemester})
    
    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, 'This semester is already Registered!')
    }
    
    const result = await semesterRegistration.create(payload)

    return result;
   
}


//get semesterRegistration
const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
    
    const semesterRegistrationQuery = new QueryBuilder(
        semesterRegistration.find().populate('academicSemester'),
        query,
    ).filter().sort().paginate().fields()


    const result = await semesterRegistrationQuery.modelQuery;
    return result;
}


const getSingleSemesterRegistration = async (id: string) => {
   
    const result = await semesterRegistration.findById(id)

    return result;
}


const updateSemesterRegistration = async (id: string,
    payload: Partial<TSemesterRegistration>
) => {

    //check if the requested registered semester is exists
    const isSemesterRegistrationExists = await semesterRegistration.findById(id)

    if (!isSemesterRegistrationExists) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            `This semester is not created or registered!`
        )
    }
    
    //if the requested semester registration is ended, we will not update anything
    const requestedSemesterStatus = isSemesterRegistrationExists.status
    
    if (requestedSemesterStatus === 'ENDED') {
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${requestedSemesterStatus} ended`)
    }

}


export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistration,
    updateSemesterRegistration,


}