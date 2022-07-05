const EmployeeDao = require('../dao/employeeDao')
const axios = require('axios')

getEmployeeData = async (_id) => {

        try {
            if (!_id)
                return ({ statusCode: 400, message: 'Employee Id Not Found' })

                const employees = await axios.get(`http://dummy.restapiexample.com/api/v1/employee/${_id}`)
            return { statusCode: 200, message: employees.data }

        } catch (error) {
            return ({ statusCode: error.response.status, message: error.response.statusText })
        }
    }

    createData = async (employeeData) =>{
        console.log(employeeData) 
     
            // const dataCreated = await EmployeeDao.creataEmployeeContact(employeeData);
         
    }


module.exports = createData, getEmployeeData;