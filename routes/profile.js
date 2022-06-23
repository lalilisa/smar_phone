var express=require('express');
var router=express.Router();
var jwt=require('jsonwebtoken');
var profileController=require('../controllers/profilecontroller')
var DAO=require('../test')
const dotenv=require('dotenv').config()
const axios=require('axios')
var comparePara= function(req,res,next){
    try {
        var username =req.params.username;
        var token=req.cookies.Username; 
        var detoken =jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(username===detoken.username){
            next();
        }
        else
            {
                res.status(404)
                res.redirect('/')
  
            }
    } catch (error) {
        res.redirect('/')
    }
    
}
router.get('/:username',comparePara,profileController.showInforUser)
router.put('/:username',comparePara,profileController.UpdateProfile)

router.get('/changepass/:username',comparePara,profileController.pageChangPass)
router.post("/changepass/:username",comparePara ,profileController.checkCurrentPass)
router.put('/changepass/:username',comparePara,profileController.changPassword)


module.exports=router;
