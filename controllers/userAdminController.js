var DAO =require("../test")
var Register=require('../data/Register')
var adminQuery=require('../DAO/adminquery')
var jwt=require('jsonwebtoken')
var getAllUser=async function(req,res){
    let listUser=await DAO.getac();
    res.json(listUser)
}
var DAO=require('../test')




var getUserbyUsername=async function(req,res){

    let username=req.params.username;
  
    let user=await DAO.getInforByUsername(username);
    try{
        if(user[0].Date!=null){
            var Date=user[0].Date.toISOString().split('T')[0]
            user[0].Date=Date;
        }
        console.log(user[0])
        res.json(user[0])
    }
    catch(err){
        console.log("TB")
        res.json(0);
    }
}
var updateProfile=async function(req,res){
    let token=req.params.username;
    var data=req.body;
    data['username']=token;
    if(data.date.length===0)
        data.date=null;
    console.log(data)
    await DAO.updateProfile(data)
    res.json("TCC")
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
module.exports={
 
    getAllUser,

    getUserbyUsername,
    updateProfile,
    deleteUser,
}