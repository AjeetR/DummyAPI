const express = require('express');
const res = require('express/lib/response');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')

//Swagger Options
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee API',
            version: '1.0.0',
            description: 'API for employee data',
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
    },
    apis: ['./routes/*.js']
}

//Initilizing swagger JS Docs
const specs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

const Route = require('./routes/route')
require('./connectMongoDB')
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/', Route)

app.get('/', (req, res) => {
    res.send(' Home ')
})

app.listen(3000)