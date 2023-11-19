


export type Guardian = {
    fatherName: string;
    fatherOccupation: string,
    fatherContactNo: string,
    motherName: string;
    motherOccupation: string,
    motherContactNo: string,


}
export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string
}
export type LocalGuardian = {
    name: string,
    occupation: string,
    contactNo: string,
    address: string
}

export type Student = {
    id: string,
    name: UserName,
    gender: "male" | "female" | "other",
    dateOfBirth?: string,
    email: string;
    contactNo: string,
    emergencyNo: string,
    bloodGroup?: "A" | "B" | "AB" | "O" | "A+" | "B+" | "AB+" | "O+"; 
    presentAddress: string,
    permanentAddress: string,
    guardian: Guardian,
    localGuardian: LocalGuardian,
    profileImg?: string,
    isActive: "active" | "blocked"
    
    
  }