var express =require('express');
var router=express.Router();
var cartQuery=require("../DAO/cartQuery");
var productQuery=require('../DAO/productquery')


router.get('/',async function(req,res){
    try{
        const list_Product=await productQuery.getAllProduct();
        res.json(list_Product)
    }
    catch(err){
        console.log(err)
    }

})
router.get('/search',async function(req,res){
    try{
            let keyword=req.query.keyword;
            let listSearch=await productQuery.searchProductByName(keyword);
            console.log(listSearch)
            res.json(listSearch)
        }
    catch(err){
            console.log(err);
        }
})
router.get('/:id',async function(req,res){
        let id=req.params.id;
        try{
            id=parseInt(id);
            let listProductDetail=await productQuery.getDetailbyIDModel(id);
            if (listProductDetail.length>0)
                res.json(listProductDetail);
            else
                res.status(404).json("faile")
        }
        catch(err){
            res.status(404).json("DSSS")
        }
})



module.exports=router
