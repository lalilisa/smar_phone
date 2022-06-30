var express=require('express')
const router=express.Router()
var homecontroller=require('../controllers/homecontroller')

var DAO=require('../test')
const dotenv=require('dotenv').config()
var adminQuery=require('../DAO/adminquery')
var productQuery=require("../DAO/productquery")
const upload = require('../storageimg')
var registerController=require('../controllers/registerController')
var profileController=require('../controllers/profilecontroller')
var userController=require('../controllers/userController')
const {Authentication,Authorization}=require('../controllers/auth')


router.post("/",userController.checkUserex,userController.resgister)



module.exports=router