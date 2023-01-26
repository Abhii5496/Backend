

const cookieParser = require('cookie-parser')
const express = require('express')

require('dotenv').config()
const app =express()

// require middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// cooki middleware
app.use(cookieParser())


const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')

app.use('/api', userRouter)
app.use('/api', postRouter)

app.get('/', (req,res) => {
    res.send("Hello")
})

app.listen(5000,() => {
    console.log("Server is Running on 5000 Port");
})