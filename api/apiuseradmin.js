var express=require('express')
var router=express.Router()
var homecontroller=require('../controllers/homecontroller')

var DAO=require('../test')
const dotenv=require('dotenv').config()
var adminQuery=require('../DAO/adminquery')
var productQuery=require("../DAO/productquery")
const upload = require('../storageimg')
var registerController=require('../controllers/registerController')
var profileController=require('../controllers/profilecontroller')
var userController=require('../controllers/userAdminController')


router.get("/",userController.getAllUser)
router.get('/:username',userController.getUserbyUsername)

router.put('/:username', userController.updateProfile)
router.delete('/:username',userController.deleteUser)



module.exports=router