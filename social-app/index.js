
const express = require('express')
const format = require('date-format')

const app = express()

// swagger 

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = 5000 || process.env.PORT

app.get('/' , ( req, res) => {
    res.send("<h1>Hello from Abhishek..</h1>")
})

app.get('/api/v1/instagram', (req,res) => {
    const instaSocial = {
        user:"abhii.online",
        follower:300,
        follows:200,
        date:format.asString("dd:MM hh:mm:ss" ,new Date())
    }

    res.status(200).json(instaSocial)
})



app.get('/api/v1/facebook', (req, res) =>{
    const fbSocial ={
        user:"abhii",
        follower:500,
        follows:400,
        date:format(new Date())
    }
    res.status(200).json(fbSocial)
})

app.get('/api/v1/:id' ,( req, res) => {
    // console.log(req.params.id)
    res.status(200).json( {params:req.params.id})
})

app.listen(PORT, ( ) => {
    console.log(`Server is running at ${PORT}`);
})