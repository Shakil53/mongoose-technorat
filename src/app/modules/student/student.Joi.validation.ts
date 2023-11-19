
import Joi from 'joi'


        // creating a schema validation with Joi -----------------------------

        const userNameValidationSchema = Joi.object({
            firstName: Joi.string()
                .trim()
                .max(20)
                .required()
                .regex(/^[A-Z][a-z]*$/, { name: 'uppercase', invert: true })
                .messages({
                    'string.base': 'First name must be a string',
                    'string.empty': 'First name is required',
                    'string.max': 'First name cannot be more than {#limit} characters',
                    'string.pattern.base': 'First name must start with an uppercase letter',
                }),
            middleName: Joi.string().allow(''),
            lastName: Joi.string()
                .trim()
                .required()
                .regex(/^[A-Za-z]+$/, { name: 'alphabetical' })
                .messages({
                    'string.base': 'Last name must be a string',
                    'string.empty': 'Last name is required',
                    'string.pattern.base': 'Last name must contain only letters',
                }),
        });
        
        const guardianValidationSchema = Joi.object({
            fatherName: Joi.string().required(),
            fatherOccupation: Joi.string().required(),
            fatherContactNo: Joi.string().required(),
            motherName: Joi.string().required(),
            motherOccupation: Joi.string().required(),
            motherContactNo: Joi.string().required(),
        });
        
        const localguardianValidationSchema = Joi.object({
            name: Joi.string().required(),
            occupation: Joi.string().required(),
            contactNo: Joi.string().required(),
            address: Joi.string().required(),
        });
        
        const studentValidationSchema = Joi.object({
            id: Joi.string().required(),
            name: userNameValidationSchema.required(),
            gender: Joi.string()
                .valid('male', 'female', 'other')
                .required()
                .messages({
                    'string.base': 'Gender must be a string',
                    'string.empty': 'Gender is required',
                    'any.only': 'Gender must be one of {#valids}',
                }),
            dateOfBirth: Joi.string().allow(''),
            email: Joi.string()
                .email({ tlds: { allow: false } }) // Disable strict email TLD checking for simplicity
                .required()
                .messages({
                    'string.base': 'Email must be a string',
                    'string.empty': 'Email is required',
                    'string.email': 'Email must be a valid email address',
                }),
            emergencyNo: Joi.string().required(),
            bloodGroup: Joi.string().valid('A', 'B', 'AB', 'O', 'A+', 'B+', 'AB+', 'O+').allow(''),
            presentAddress: Joi.string().allow(''),
            permanentAddress: Joi.string().allow(''),
            guardian: guardianValidationSchema.required(),
            localGuardian: localguardianValidationSchema.required(),
            profileImg: Joi.string().allow(''),
            isActive: Joi.string().valid('active', 'blocked').default('active'),
        });  

// ----------------------------------------------------------------------
export default studentValidationSchema;