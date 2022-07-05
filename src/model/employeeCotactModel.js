const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    employeeId: { type: Number, required : true},
    phoneNumber: { type: Number, required : true },
    email: { type: String, required : true },
    address: {
            houseNumber: { type: Number },
            area: { type: String, required : true },
            city: { type: String, required : true },
            state: { type: String, required : true },
            pin: { type: Number, required : true }
        },
    metaData : {type : Object}
}, { versionKey: false })

module.exports=mongoose.model('employee_Contacts', postSchema )