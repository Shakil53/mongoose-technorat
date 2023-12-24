import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";


export interface TUser  {
    id: string;
    password: string;
    passwordChangedAt?: Date;
    needsPasswordChange: boolean;
    role: 'admin' | 'student' | 'faculty',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean;
  

}


export interface UserModel extends Model<TUser> {
    isUserExistByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp: Date, jwtIssuedTimestamp: number): boolean;
  
  }


  export type TUserRole = keyof typeof USER_ROLE;