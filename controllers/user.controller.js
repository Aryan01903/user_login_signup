const bcrypt=require("bcrypt")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../configs/user.config")
exports.signup= async (req,res)=>{
    /**
     * logic to create user
     */
    const req_body=req.body //read the request body
    const userObj={
        username : req_body.username,
        email : req_body.email,
        password : bcrypt.hashSync(req_body.password,8)

    }
    try{
        const user_created=await user_model.create(userObj)
        const res_obj={
            username : user_created.username,
            email : user_created.email,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updateAt
    }
    res.status(201).send(res_obj)
    }catch(err){
        console.log("Error occured while creating",err)
        res.status(500).send({
            message : "some error while registering user"
        })
    }
}

exports.signin=async(req,res)=>{
    const user= await user_model.findOne({username:req.body.username})
    if (user==null){
        return(400).send({
            message : "username is not valid or present in database"
        })
    }
    //Password is correct 
   const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
   if(!isPasswordValid){
    return res.status(401).send({
        message : 'Wrong password passed'
    })
   }
   // using jwt we will create the acces token with a given TTL and return
   const token = jwt.sign({id : user.userId}, secret.secret,{
    expiresIn : 120 
   })

   res.status(200).send({
    username : user.username,
    email : user.email,
    accessToken : token 
   })


}


exports.getAllUser_model=(req,res)=>{
    res.status(200).send(JSON.stringify(user_model))
}