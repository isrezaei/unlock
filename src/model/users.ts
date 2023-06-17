import {Schema , model ,models} from "mongoose";


const usersSchema = new Schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const users = models.users || model("users" , usersSchema)
export default users