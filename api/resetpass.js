var express=require('express')
const router=express.Router()


var DAO=require('../test')
const dotenv=require('dotenv').config()

var userController=require('../controllers/userController')




router.post('/reset-password/:email',userController.resetPassword)
router.put('/reset-change-password/:token', userController.resetChangePass)
module.exports=router