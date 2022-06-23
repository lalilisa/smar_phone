

const dotenv=require('dotenv').config()
const req = require('express/lib/request')
const jwt=require('jsonwebtoken')
const userQuery=require('../test')
const Authorization=async function(req,res,next){
    try {
        if(req.headers.authorization!==undefined&& req.headers.authorization.split(" ")[0]==="Bearer" && req.headers.authorization.split(" ")[1]!==undefined){
            let token=req.headers.authorization.split(" ")[1]
            let decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
            let user=await userQuery.getInforByUsername(decode.username)
            if(user[0].role===1)
                next();
            else
                res.status(401).json("Unauthorized")
        }
    } catch (error) {
        res.status(401).json("Unauthorized")
    }

}
const Authentication=async function(req,res,next){
    try {
        if(req.headers.authorization!==undefined&& req.headers.authorization.split(" ")[0]==="Bearer" && req.headers.authorization.split(" ")[1]!==undefined){
            let token=req.headers.authorization.split(" ")[1]
           
            let decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
            
            var user=await userQuery.checkUsername(decode.username);
           
            if(user!=null){
               req.user=user[0]
               next();
            }
            else
                res.status(401).json("Unauthorized")
        }
        else{
          
            res.status(401).json("Unauthorized")
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    Authorization,
    Authentication
}