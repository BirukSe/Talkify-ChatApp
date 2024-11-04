import mongoose from "mongoose";
const usersSchema=new mongoose.Schema(
    {
        firstName: {
            type: String,
            
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        }
    }, {timestamps: true}
);
const User=mongoose.model("User", usersSchema);
export default User;