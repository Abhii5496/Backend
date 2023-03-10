const express = require('express')
const fileUpload = require('express-fileupload')
const cloudinary = require("cloudinary").v2

const app = express();

cloudinary.config({
    cloud_name:"duzisv8sp",
    api_key:"916695129559396",
    api_secret:"op27iqS6yP_eCkXU7PhK65wM18A"
})

app.set("view engine", "ejs" )

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))



app.get('/myget', (req,res) =>{
    console.log(req.body);
    res.send(req.body)
})

app.post('/mypost',async (req,res) =>{
    console.log(req.body);
    console.log(req.files);
    

    let result;
    let imgArray= []

    //case - multiple images

    if(req.files){
        for (let index = 0; index < req.files.samplefile.length; index++) {
           let result= await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath,{
                folder:'users'
            })
            
            imgArray.push({
                public_id:result.public_id ,
                secure_url:result.secure_url 
            })
        }
    }

    // case - for single image 

    // let file= req.files.samplefile

    // result = await cloudinary.uploader.upload(file.tempFilePath,{
    //     folder:'users'
    // })

    console.log(result);

    details={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result,
        imgArray,
    }
    console.log(details);
    // res.send(details)
})

app.get('/mygetForm', (req,res) =>{
   
    res.render('getForm')
})

app.get('/mypostForm', (req,res) =>{
   
    res.render('postForm')
})



app.listen(4000, (req,res) => console.log('Server is running at port 4000 '))