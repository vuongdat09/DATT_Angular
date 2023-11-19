import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    gender: {
        type: String,
        enum: ['Nam', 'Nữ', 'Khác']
    },
    dateOfBirth: {
        type: Date
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"member",
    }
},
{timestamps:true, vesionkey:false},
)

export default mongoose.model('User',userSchema);