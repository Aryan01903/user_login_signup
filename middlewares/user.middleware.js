const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")



const verifySignUpBody = async (req, res, next)=>{

    try{

        //Check for the name
        if(!req.body.username){
            return res.status(400).send({
                message : "Failed ! User Name was not provied in request body"
            })
        }

        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! Email was not provied in request body"
            })
        }
        

        //Check if the user with the same username is already present
        const user = await user_model.findOne({username : req.body.username})

        if(user){
            return res.status(400).send({
                message : "Failed ! user with same username is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message :"Error while validating the request body"
        })
    }
}


const verifySignInBody = async (req, res, next)=>{

    if(!req.body.username){
        return res.status(400).send({
            message : "username is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }
    next()
}

const verifyToken = (req , res, next)=>{
    //Check if the token is present in the header
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message : "No token found : UnAuthorized"
        })
    }

    //If it's the valid token
    jwt.verify(token,auth_config.secret ,async (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            })
        }
        const user = await user_model.findOne({username : decoded.name})
        if(!user){
            return res.status(400).send({
                message : "UnAuthorized, this user for this token doesn't exist"
            })
        }
        //Set the user info in the req body
        req.user = user
        next()
    } )

    

    //Then move to the next step
}


module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
}