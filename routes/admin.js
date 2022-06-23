var express=require('express')
var router=express.Router()
var homecontroller=require('../controllers/homecontroller')

var DAO=require('../test')
const dotenv=require('dotenv').config()
var adminQuery=require('../DAO/adminquery')
var productQuery=require("../DAO/productquery")
const upload = require('../storageimg')
const axios=require('axios')
router.get('/',async function(req,res){
       var listUser= await DAO.getac();
       res.render('adminpage',{"listUser":listUser})
      })
router.get('/inforuser/:username',async function(req,res){
      

      res.render('profileadmin')

})





router.get('/add-product',async function(req,res){
      const list_Product= await productQuery.getAllProduct();
      res.render('addproduct',{"list_Product":list_Product})
})
 
router.post('/add-product',upload.single('formFile'),async function(req,res){
            var data=req.body;
            try{
                  if(req.file===undefined)
                         data['img']=undefined
                  else
                       data['img']=req.file.filename;
                       productQuery.addProduct(data);
                  res.json(1)
            }
            catch(err){
                  console.log(err);
                  res.json(0);
            }
            
 })
 router.post('/add-detail',upload.single('filedetail'),async function(req,res){
      var data=req.body;
      if(req.file===undefined){
            data['img']=null;
      }
      else
             data['img']=req.file.filename;
      console.log(data)
      try{
            productQuery.addDetailProduct(data);
            res.json(1)
      }
      catch(err){
            console.log(err);
            res.json(0);
      }

      
})

router.get('/showproduct',async function(req,res){
      var list_Product= await productQuery.getAllProduct();
      var list_ProductDetail= await productQuery.getAllDetaliProduct();
      res.render('productadmin',{list_Product:list_Product,list_ProductDetail:list_ProductDetail})
})

router.get('/showproduct/:id',async function(req,res){
      var idmodel=req.params.id;
      try{
            idmodel= parseInt(idmodel);

            let model=await productQuery.getModelByID(idmodel);
            res.render('editModel',{Model:model[0]})
            
      }
      catch(err){
            
            res.render('editModel',{Model:null})
    
      }
})
router.delete('/showproduct/:id', function(req,res){
      try{
            let ID=req.params.id;
            ID=parseInt(ID);
            console.log(ID)
            productQuery.deleteProduct(ID)
            res.json("TCCC")
      }
      catch(err){
            console.log(err);
      }

})
router.put('/showproduct/:id',upload.single('formFile'), function(req,res){
      try{
            let ID=req.params.id;
            let data=req.body;
            ID=parseInt(ID);
            if(req.file){
                  data['img']=req.file.filename;
            }
            else
                  data['img']=undefined;
            productQuery.changeModel(data,ID);
            res.json("TCCCCC")
      }
      catch(err){
            console.log(err)
      }
   
})

router.get('/showdetail/:id',async function(req,res){
      try{
            let ID=req.params.id;
            ID=parseInt(ID);
            // let model= await productQuery.getModelByID(ID)
            let detail =await productQuery.getDetailByID(ID);
            res.render('editDetail',{Detail:detail[0]});
      }
      catch(err){
            console.log(err)
      }
      

})
router.put('/showdetail/:id',upload.single('filedetail'),async function(req,res){
      try{
            let ID=req.params.id;
            ID=parseInt(ID);
            let data=req.body;
            console.log(data);
            if(req.file){
                  data['img']=req.file.filename;
            }
            else
                  data['img']=undefined;
            await productQuery.changeDetailProduct(data,ID)
            res.json("TCCC")
      }
      catch(err){
            console.log(err)
      }
})
router.delete('/showproduct/deleteproductdetail/:id',async function(req,res){
      try{
            let ID=req.body.id;
            ID=parseInt(ID);
            await productQuery.deleteDetailProduct(ID)
            res.json("TCCC")
      }
      catch(err){
            console.log(err);
      }
})



module.exports=router