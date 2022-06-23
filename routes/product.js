var express=require('express')
var router=express.Router();
var productQuery=require('../DAO/productquery')
const dotenv=require('dotenv').config()

router.get('/',async function(req,res){

    res.render('category')
})


router.get('/:id',async function(req,res){
    
        res.render('single-product')
    })
   

  

module.exports=router;
