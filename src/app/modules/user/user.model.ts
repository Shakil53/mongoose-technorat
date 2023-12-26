import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';



const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
     password: {
        type: String,
        required: true,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
   
}, {
    timestamps: true
},
);
userSchema.pre('save', async function (next) {
    // console.log(this, 'pre hook : we will save our data');
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // hashing password and save into db using bcrypt
    user.password = await bcrypt.hash(user.password, Number(config.bycrypt_salt_rounds))

    next()

});

// set '' after saving password
userSchema.post('save', function (doc,next) {
    doc.password =''
    // console.log(this, 'post hook : we save our data');
    next()
})

//static method for checking user exist
userSchema.statics.isUserExistByCustomId = async function (id:string) {
  return await User.findOne({id}).select('+password')
}
//static method for password checking
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return bcrypt.compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp: Date, jwtIssuedTimestamp: number) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
 console.log(passwordChangedTime > jwtIssuedTimestamp);
 return(passwordChangedTime > jwtIssuedTimestamp);
   
}

//crate model
export const User = model<TUser, UserModel>('User', userSchema);