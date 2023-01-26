
const express = require('express')


const app = express()

// swagger 

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = 5000 || process.env.PORT




let courses= [
    {
        id : "11",
        name: "Learn React",
        price: 399
    },
    {
        id : "12",
        name: "Learn Python",
        price: 399
    },
    {
        id : "13",
        name: "Learn Django",
        price: 399
    },

    ]

app.get('/' , ( req, res) => {
    res.send("<h1>Hello from Abhii..</h1>")
})

app.get('/api/v1/abhi' , ( req, res) => {
    res.send("Hello from abhi docs.")
})


app.listen(PORT, ( ) => {
    console.log(`Server is running at ${PORT}`);
})