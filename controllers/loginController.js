var DAO=require('../test')
var Account=require('../data/Account')
var Login=require("../data/Login")
var jwt=require('jsonwebtoken')
var checkAccount=async function(req,res,next){
        var data=req.body;
        let userreq=new Login(data.username,data.password)
        let checkUser= await DAO.AuthenLogin(userreq);
        if(checkUser===undefined){
            res.json("Tài Khoản hoặc mật khẩu không đúng")
        }
        else{
            req.user=checkUser
            next();
        }

}
var LoginResponse=function(req,res){
    var user=req.user;
    var token=jwt.sign({username:user.Username},process.env.JWT_SECRET_KEY)
    res.cookie("Username",token)
    res.cookie("user",user.Username)
    res.json(1);
    
}
var LoginPage=function (req, res) {

    res.render('login');
}
var resetpass=function(req,res){

    res.render('resetpass')
}
var changePassReset=function(req,res){

    res.render('changepassreset')
}
module.exports={
    checkAccount,
    LoginResponse,
    LoginPage,
    resetpass,
    changePassReset
}