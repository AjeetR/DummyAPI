const express = require('express');
const _route = express.Router();
const EmployeeData = require('../model/employee')
const employeeContactModel = require('../model/employeeCotactModel');
require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * components :
 *      schemas:
 *      employees:
 *          type:object
 *          required:
 *              - e_id
 *              - email
 *              - password
 *              - firstName
 *              - lastName
 *          properties:
 *          e_id:
 *              type : number
 *             description : user Id
 *          email :
 *              type : string
 *              description : Email ide as username
 *          firstName : 
 *                 type : string
 *                  descriotion : Employee first name
 *          lastName : 
 *                  type : string
 *                  description : Employee last name 
 *          example : 
 *              e_id: 1
                email: Tiger@gmail.com
                password: Riger123
                firstName: Tiger
                lastName: A
 *  
 * 
 */

//POST request for login
_route.post('/login', async (req, res) => {
    const employee = {
        _email: req.body.email,
        _password: req.body.password
    }
    try {
        const token = jwt.sign(employee, 'SecretKey');
        const employeeData = await EmployeeData.findOne({ email: employee._email });
        if (!employeeData)
            res.send({ code: 404, message: 'Employee not found' });

        if (await bcrypt.compare(employee._password, employeeData.password)) {
            res.send({ Employee: employeeData, token: token })
        } else {
            res.send({ message: 'Email ID or Password is incorrect' })
        }
    } catch (error) {
        res.send({ code: 400, message: error.message })
    }
})


//POST request to add new employee 
_route.post('/addEmployees', verifyToken, async (req, res) => {
    const addEmployeeData = req.body;
    if (!addEmployeeData)
        res.send('No data in the body')
    try {
        const SALT = parseInt(process.env.SALT_VALUE)
        const hashPassword = await bcrypt.hash(addEmployeeData.password, SALT)
        const newUser = new EmployeeData({
            e_id: addEmployeeData.e_id,
            email: addEmployeeData.email,
            password: hashPassword,
            firstName: addEmployeeData.firstName,
            lastName: addEmployeeData.lastName
        });

        if (await EmployeeData.exists({ email: newUser.email })) {
            res.send({ code: 400, message: 'Email already exist! please try using different one. ' })
        }
        await newUser.save();
        res.status(200).send('Employee added! ' + newUser)
    } catch (error) {
        console.log(error)
        res.send({ code: 400, message: error.message })
    }
})

//Update Employee Data
_route.patch('/updateEmployee/:email', (req, res) => {
    const _email = req.params.email;
    
    res.send(_email)
})

//GET request to get employee details on ID
_route.get('/employee/:employeeId',verifyToken, async (req, res) => {
    const _id = req.params.employeeId;
    try {
        const employeeDetails = await EmployeeData.findOne({ e_id: _id })
        if (!employeeDetails)
            res.send(`No data found for this ID : ${_id}`)

        res.status(200).send(employeeDetails);
    } catch (error) {
        res.send(error.message)
    }
})

//GET request to get all employee details
_route.get('/employee', verifyToken, async (req, res) => {
    try {
        const allEmployeeData = await EmployeeData.find();
        res.send({ code: 200, Message: 'All Employees Data ', allEmployeeData })
    } catch (error) {
        res.send(error.message)
    }
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, 'secretKey', (error, authData) => {
            if(error){
                res.status(403)
            }else{
                console.log(authData)
                res.status(200)
            }
        })
        next();
    }else{
        res.status(403).send('Invalid token')
    }
}

module.exports = _route;
