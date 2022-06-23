

const express =require('express');
const { appendFile } = require('fs-extra');
const axios=require('axios');
const checkoutsQuery=require('../DAO/checkoutsQuery')
const cartQuery=require('../DAO/cartQuery')
const router =express.Router();
const jwt=require('jsonwebtoken')
var i=1;
router.get('/',async function(req,res){

        // res.render('checkout')
    try{
        let code=req.query.hash;
        let username=jwt.verify(req.cookies.Username,process.env.JWT_SECRET_KEY).username;
        let id_cart=await cartQuery.getIDCartByUsername(username);
        let id_cartchk=await checkoutsQuery.getIdCartByToken(code);

        if(id_cart===id_cartchk){
             res.render('checkout')
            }
        else{
            res.redirect('http://localhost:8080/cart')
        }

    }
    catch(err){
        console.log(err)
    }

})


module.exports=router