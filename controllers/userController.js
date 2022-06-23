var DAO =require("../test")
var Register=require('../data/Register')
var adminQuery=require('../DAO/adminquery')
var jwt=require('jsonwebtoken')
var changePassword=require('../data/ChangePassword')
const sendMail=require('./sendMail')
const Profile = require('../data/Profile')
var getAllUser=async function(req,res){
  
    
    let listUser=await DAO.getac();
    res.json(listUser)
    
}
var DAO=require('../test')


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
var resgister=function(req,res){
    var user= req.newUser
    console.log(user)
    try{
      DAO.addUser(new Register(user.user,user.email,user.pass))
    }
    catch(err){
      res.json("")
    }
    res.json("Đăng kí thành công")
 }
var getUserbyUsername=async function(req,res){
        try {
            
            
            let username=req.params.username
            if(req.user.Username===username){

           
            let user=await DAO.getInforByUsername(username);
        
            console.log(user[0])
        
                if(user[0]!==null&&user[0].Date!==null){
                    var Date=user[0].Date.toISOString().split('T')[0]
                    user[0].Date=Date;
                }
            let infoUser=new Profile(user[0].Username,user[0].Email,user[0].Name,user[0].Address,
                                     user[0].Phonenumber,user[0].Date,user[0].role,user[0].img)
            res.json(user[0])
        }
         
        } catch (error) {
            console.log(error)
        }
  
}
var updateProfile=async function(req,res){
    let token=req.params.username;
    var data=req.body;
    console.log("DADADAD :"+req.body)
    data['username']=token;
    if(data.date.length===0)
        data.date=null;
    await DAO.updateProfile(data)
    res.json("TCC");
}
var deleteUser=async function(req,res) {
    try{
        await adminQuery.deleteUser(req.body);
        res.json("TCCC")
        }
         catch(err){
        res.json("TBB")
        }
}
var resetPassword=async function(req,res){
    try {
        let email=req.params.email;
        let User=await DAO.checkEmail(email);
        console.log(User)
        let token=jwt.sign({Username:User[0].Username},process.env.JWT_RESET_PASSWORD,{expiresIn:'10m'})
        sendMail.sendMail(User[0].Email,'reset password',`http://localhost:8080/change-password-reset/${token}`)
        res.json("User")
    } catch (err) {
        console.log(err)
    }
}
var resetChangePass=async function(req,res){
    try {

        let token=req.params.token;
        console.log(token)
        let Username=jwt.verify(token,process.env.JWT_RESET_PASSWORD)
        let data=req.body
        data['username']=Username.Username
        let changepass=new changePassword(data.username,data.password,data.confirm_password)
        await DAO.resetPass(changepass)
        res.json("User")
    } catch (err) {
        console.log(err)
    }
}
module.exports={
    checkUserex,
    getAllUser,
    resgister,
    getUserbyUsername,
    updateProfile,
    deleteUser,
    resetPassword,
    resetChangePass
}