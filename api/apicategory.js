


const router=require('express').Router()
const queryCategory=require('../DAO/category')
router.get("/",async function(req,res){
    try {
         const listCategory=await queryCategory.getAllCategory()
         res.json(listCategory)
    } catch (error) {
        console.log(error)
    }
})


module.exports=router