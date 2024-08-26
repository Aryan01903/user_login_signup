const express=require("express")
const app=express()
const server_config=require("./configs/server.config")
const mongoose=require("mongoose")
const db_config=require("./configs/db.config")
const bcrypt=require("bcryptjs")
const user_model=require("./models/user.model")


app.use(express.json()) // middleware

// connecting to mongodb
mongoose.connect(db_config.DB_URL)
const db=mongoose.connection

db.on("error",()=>{
    console.log("Error while connecting to the mongodb")
})
db.once("open",()=>{
    console.log("Connected to Mongodb")
})

require("./routes/user.route")(app)

app.listen(server_config.PORT,()=>{
    console.log("Server started at port num : ",server_config.PORT)
})