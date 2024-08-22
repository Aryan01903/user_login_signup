const express=require("express")
const app=express()
const server_config=require("./configs/server.config")

app.listen(server_config.PORT,()=>{
    console.log("Server started at port num : ",server_config.PORT)
})