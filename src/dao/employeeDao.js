const employeeModel = require('../model/employeeCotactModel');
const employeeContactModel = require('../model/employeeCotactModel')

const employeeDao = {

    async getEmployeeDate(reqData) {
        return employeeModel.findOne({ employeeId: reqData })
    },

    async creataEmployeeContact(reqData) {

        const res = [];
        for (const iterator of reqData) {
           res.push(await new employeeContactModel(iterator).save()) 
        }

        return res;
        
        // for (let i = 0; i < reqData.length; i++) {
        //     return new employeeContactModel().save();
        // }
    }
}

module.exports = employeeDao;