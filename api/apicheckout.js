const express =require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const checkoutQuery=require('../DAO/checkoutsQuery')
const bcrypt=require('bcryptjs')
function ChuanHoa(data){
    let result='';
    for(let i=0;i<data.length;i++){

        let record=`(?,${data[i].id_cartdetail},${data[i].ID_Productdetail},${data[i].ID_Product},N'${data[i].color}',${data[i].number},N'${data[i].name_product}','${data[i].img}',${data[i].single_price})`;
        if(i!==data.length-1)
                record+=',';
        result+=record;
    }
    return result;
}   
router.get('/',async function(req,res){
        try{

                let token=req.query.hash;
                console.log(token);
                let listCheckout=await checkoutQuery.getCheckout(token);
                res.json(listCheckout);

        }
        catch(err){
                console.log(err)
        }
})

router.post('/',async function(req,res){
    try{
        console.log(req.headers.authorization)
        let token=req.headers.authorization.split(" ")[1];
        console.log(token)
        let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
        let data=req.body;

        let recordset =ChuanHoa(data);
        let dataDAO={};
        dataDAO['username']=username
        dataDAO['recordset']=recordset;
        console.log(typeof(recordset))
        let hash=await checkoutQuery.createCheckout(dataDAO);

        res.json(hash);
    }
    catch(err){
        console.log(err)
    }
})


module.exports=router