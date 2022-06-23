var DAO=require('../test');
var jwt=require('jsonwebtoken');
var Login=require('../data/Login');
var ChangPassword=require('../data/ChangePassword')
const axios=require('axios');
var showInforUser=function(req,res){
    res.render('profile')
   
}

var changPassword=async function(req,res){
    var data=req.body;
    console.log(data)
    data['username']=req.params.username;
    let changepass=new ChangPassword(data.username,data.currentpass,data.newpass)
    if(await DAO.updatePass(changepass)!=undefined){
            res.json(1)
    }
    else{
        res.json(0)
    }
}
var checkCurrentPass=async function (req,res){
    if(req.headers.authorization && req.headers.authorization.split(" ")[0]==="Bearer"){
         var token=req.headers.authorization.split(" ")[1];
         console.log(token)
         var detoken=jwt.verify(token,process.env.JWT_SECRET_KEY)
         var data=req.body;
         console.log(data)
         var user=new Login(detoken.username,data.currentpass)
         var checkpass=await DAO.AuthenLogin(user);
         console.log(checkpass)
         if(checkpass!==undefined){
            res.json(0) 
         }
         else
            res.json(1)   
    }
     
}
var UpdateProfile=function(req,res){
    console.log(req.body)
    axios.put('http://localhost:8080/api/user/'+req.params.username,req.body)
    .then(response => {
        res.json("TC")
    })
    .catch(error => {
        console.log(error);
    });

}
var pageChangPass=function(req,res){
    res.render('changpass')
}
module.exports={
    showInforUser,
    changPassword,
    checkCurrentPass,
    pageChangPass,
    UpdateProfile,
}