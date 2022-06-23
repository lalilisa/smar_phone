var express=require('express');
const { appendFile } = require('fs-extra');
const router=express.Router();

const jwt=require('jsonwebtoken')
const orderquery=require('../DAO/orderquery')
router.get('/',async function(req,res){
    try{
         let token=req.cookies.Username;
         let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username;
         const listOrder=await orderquery.getOrderByUsername(username);
         res.json(listOrder);
    }
    catch(err){
        console.log(err)
    }

})

router.get('/all_order',async function(req,res){
    try{

         const listOrder=await orderquery.getAllOrder();
         res.json(listOrder);
    }
    catch(err){
        console.log(err)
    }

})


router.post('/',async function(req,res){
    try{
        let data={};
        let request=req.body;
        console.log(req.body)
        data['data']=request.data;
        let date=new Date();
        data['datetime']=date.toISOString().split('T')[0];
        let token=req.headers.authorization.split(" ")[1];
       
        let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
        data['username']=username;
        data['total']=request.totalprice;
        await  orderquery.crateOrder(data);
        res.json(username)
    }
    catch(err){
        console.log(err)
    }

})

router.put('/:id',async function(req,res){
    try{
            let id_order=parseInt(req.params.id);
   
            let token=req.headers.authorization.split(" ")[1];
       
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username  

            let implement=await orderquery.confirmOrder(username,id_order)
            if(implement)
                res.status(200).json(1)
            else
                res.status(404).json(0)
    }
    catch(err){
        console.log(err)
        res.status(404).json(0)
    }
            
})
router.delete('/:id',async function(req,res){
    try{
         
            let id_order=parseInt(req.params.id);
   
            let token=req.headers.authorization.split(" ")[1];
       
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username   

            let implement=await orderquery.deleteOrder(username,id_order)
            if(implement)
                res.status(200).json("success")
            else
                res.status(404).json("Not found")
    }
    catch(err){
        console.log(err)
        res.status(404).json("Not Found")
    }
            
})
module.exports=router