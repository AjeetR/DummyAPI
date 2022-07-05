const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    e_id : {type : Number, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true}
},{ versionKey: false } )

module.exports = mongoose.model('employees', postSchema)

