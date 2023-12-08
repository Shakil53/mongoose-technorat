import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

// create academic faculty using model
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {

    const result = await AcademicFaculty.create(payload);
    return result;
}

//get all faculties 
const getAllAcademicFacultiesFromDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

//get single faculties
const getSingleAcademicFacultyFromDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

//update Academic Faculty 
const updateAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
) => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
}

export const AcademicFacultyService = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyIntoDB



}