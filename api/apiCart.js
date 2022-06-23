var express =require('express');
var router=express.Router();
var cartQuery=require("../DAO/cartQuery");
var jwt =require("jsonwebtoken")

router.get('/',async function(req,res){
    try{     

            let token=req.headers.authorization.split(" ")[1];
            
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
            const listCart=await cartQuery.getProductInCart(username);
            res.json(listCart);
        
    }
    catch(err){
        console.log(err);
    }
})

router.post('/',async function(req,res){
    try{
       
            let token=req.headers.authorization.split(" ")[1];

            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
            let data=req.body;
            data['username']=username
            await cartQuery.addToCart(data)
            res.json("TC")
  
    }
    catch(err){
        console.log(err)
    }

})
router.put('/',async function(req,res){
    try{
       
            let token=req.headers.authorization.split(" ")[1];

            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
            let data=req.body;
            console.log(data)
            data['username']=username;
            await cartQuery.updateCart(data);
            res.json("TC")
       
    }
    catch(err){
        console.log(err)
    }
})

router.delete('/:id',async function(req,res){
    try{
        
            let token=req.headers.authorization.split(" ")[1];

            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
            let data=req.body;
            data['username']=username;
            console.log(data)

            await cartQuery.deleteProductInCart(data);
            res.json("TC")
        
    }
    catch(err){
        console.log(err)
    }
})
module.exports=router
