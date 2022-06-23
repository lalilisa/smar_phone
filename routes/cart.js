var express=require('express')
var router=express.Router();
var jwt=require('jsonwebtoken')
var dotenv=require('dotenv').config()
var homeController=require('../controllers/homeController')
const axios=require('axios');
axios.defaults.withCredentials = true
var i=1;
router.get('/',async function(req,res){
 
      res.render('cart')
})




module.exports=router