

const prisma = require('../prisma/index')
const cookieToken= require('../utils/cookieToken')

// User signup

exports.signup = async (req, res, next) =>{
    try {
        const {name, email, password} = req.body
        //check
        if(!name || !email || !password){
        throw new Error("Provide all details")
        }

        const user = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    })

    //send user a token
    cookieToken(user,res)

    } catch (error) {
        throw new Error(error)
    }
}

// login User

exports.login = async (req, res, next ) => {

    try {
        // take infor from user
        const {email, password} =req.body

        if (!email || !password){
            throw new Error("Please provide email or password")
        }

        // find the user 

        const user =await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            throw new Error("User not found")
        }

        // passowrd mismatch
        if(user.password !== password){
            throw new Error("Password is incorrect")
        }
        // user is there and validation
        cookieToken(user, res)
    } catch (error) {
        
    }
}

//logout user

exports.logout = async(req, res, next) => {
    try {
        res.clearCookie('token');
        res.json({
            success:true
        })
    } catch (error) {
        throw new Error(error)
    }
        

}



