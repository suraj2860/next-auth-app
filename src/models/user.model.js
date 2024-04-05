import moongoose from 'mongoose';

const userSchema = new moongoose.Schema(
    { 
         username: {
            type: String,
            required: [true, "Please provide a username"],
            unique: true
         },
         email: {
            type: String,
            required: [true, "Please provide a email"],
            unique: true
         },
         password: {
            type: String,
            required: [true, "Please provide a password"],
         },
         isVerified: {
            type: Boolean,
            default: false
         },
         isAdmin: {
            type: Boolean,
            default: false
         },
         forgotPasswordToken: String,
         forgotPasswordTokenExpiry: Date,
         verifyToken: String,
         verifyTokenExpiry: Date
    }
);

const User = moongoose.models.users || moongoose.model("users", userSchema);

export default User;
