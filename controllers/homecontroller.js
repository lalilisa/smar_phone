const dotenv=require('dotenv').config()
const Account = require('../data/Account');
var Register=require('../data/Register')
var DAO=require('../test')
var jwt=require('jsonwebtoken')
var checkLogin=async function(req,res,next){  
     if(req.headers.authorization!=undefined){
         let token =req.headers.authorization.split(" ")[1]
         console.log(token)
         var username=jwt.verify(token,process.env.JWT_SECRET_KEY);
         var user=await DAO.checkUsername(username.username);
         if(user!=null){
            req.user=user
            next();
         }
         else{
                   res.redirect('/')
         }
     }
     else{
        //  res.redirect('/')
         res.redirect('/')
     }

}
var checkAdmin= function(req,res,next){  
        try{
        if( req.user[0].role===1)
            next();
        else
             res.redirect('/')
        }
        catch(err){
            res.redirect('/')
        }
    }

var showUsername=function(req,res,next){
    if(req.cookies.Username!==undefined){
       let token=req.cookies.Username;
       try{
        let detoken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        res.locals.username=detoken.username;
       }
       catch(err){
           res.locals.username=null;
           console.log(err);
       }
       
    }
    else
      res.locals.username=null;
     next();
}
var Logout=function(req,res){
    res.clearCookie("Username");
    res.redirect('/')
 }
var homePage=function (req, res) {
    res.render('index')
    // if(req.user.length>0)
    //   res.render('index',{"username":req.user[0].Username});
    //  else
    //     res.render('index',{"username":null});
  }
module.exports={
    checkLogin,
    checkAdmin,
    showUsername,
    Logout,
    homePage,
}