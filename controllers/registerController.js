var DAO=require('../test')

var Register=require('../data/Register')
var checkUserex= async function (req,res,next){
            var data=req.body;
            // var user=new Account(data.username,data.password,data.email)
            var user=new Register(data.username,data.email,data.password)
            var checkUser=await DAO.checkUsername(data.username);
            var checkEmail =await DAO.checkEmail(data.email);
            if(checkUser.length>0||checkEmail.length>0){
                res.json("") 
               
            }
           
            if( checkEmail.length==0 &&checkUser.length==0){
                req.newUser=user
                next();
        }
}


var resgisterPage=function(req,res){
    res.render('register')
 }


var checkUserExist=async function (req,res){
    var data=req.body;
    console.log(data)
    var checkUser=await DAO.checkUsername(data.username);
    if(checkUser.length>0){
        res.json("Tài khoản đã tồn tại") 
    }
    else
      res.json("")
    
}
var checkEmailExist=async function (req,res){
    var data=req.body;
    console.log(data)
    var checkEmail=await DAO.checkEmail(data.email);
    if(checkEmail.length>0){
        res.json("Email đã được sử dụng") 
    }
    else
      res.json("")
    
}
module.exports={
    checkUserex,
    resgisterPage,
    checkUserExist,
    checkEmailExist,
}