const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const AdminSchema = new Schema({
    username:String,
    email:String,
    password:String,
})

let Admin = mongoose.model('Admin',AdminSchema)
module.exports = Admin;