/**
 * POST localhost:8000/user_login_signup/api/v1/auth/signup
 * 
 * I need to intercept this
 */
const userController = require("../controllers/user.controller")
const userMW = require("../middlewares/user.middleware")


module.exports = (app)=>{
    app.post("/user_login_signup/api/v1/auth/signup",[userMW.verifySignUpBody], userController.signup)

    /**
     * route for
     * POST localhost:8000/user_login_signup/api/v1/auth/signin
     */
    app.post("/user_login_signup/api/v1/auth/signin",[userMW.verifySignInBody],userController.signin)

    /**
     * GET
     * localhost:8000/user_login_signup/api/v1/user_model
     */
    app.get("/user_login_signup/api/v1/user_model",userController.getAllUser_model)
}