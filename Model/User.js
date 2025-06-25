const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const UserSchema = new Schema({
    username:String,
    email:String,
    mobile_number:Number,
    password:String,
})

let Users = mongoose.model('Users',UserSchema)
module.exports = Users;