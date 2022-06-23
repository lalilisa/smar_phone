var express=require('express')
var router=express.Router();
var jwt=require('jsonwebtoken')
var dotenv=require('dotenv').config()
var DAO =require('../test')
var registerController=require('../controllers/registerController')
var loginController=require('../controllers/loginController')
var homecontroller=require('../controllers/homecontroller')


router.post("/api/checkuser", registerController.checkUserExist)
router.post( "/api/checkmail",registerController.checkEmailExist)
router.route('/login')
        .get(loginController.LoginPage)
        .post(loginController.checkAccount,loginController.LoginResponse)
        
router.route('/register')
        .get(registerController.resgisterPage)
        // .post(registerController.checkUserex,registerController.resgister)

router.get('/',homecontroller.homePage) 
router.get('/logout',homecontroller.Logout)


router.get('/reset-password',loginController.resetpass)


router.get('/change-password-reset/:token',loginController.changePassReset)





module.exports=router