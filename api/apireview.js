const express=require('express')
const Review=require('../data/Review')
const EditReview=require('../data/EditReview')
const router=express.Router()
const reviewQuery=require('../DAO/reviewquery')
const jwt=require('jsonwebtoken')
const Tree=require('../controllers/Tree')
const orderQuery=require('../DAO/orderquery')

const checkBoughtProduct=async function(req,res){

}
router.get('/:id',async function(req,res){
        try {
                let id_product=parseInt(req.params.id);
                var listReview=await reviewQuery.getReview(id_product)
                let token=req.cookies.Username;
                let username;
                if(token)
                         username=jwt.verify(token,process.env.JWT_SECRET_KEY).username;
                for(let i=0;i < listReview.length;i++){
                    if(listReview[i].Username===username)
                        listReview[i]['isUser']=true;
                    else
                        listReview[i]['isUser']=false;
                } 
                listReview=Tree.TreeReview(listReview)


                res.json(listReview)
        } catch (err) {
                console.log(err)
        }
       
})



router.post('/',async function(req,res){
        try {
            let token=req.headers.authorization.split(" ")[1];
       
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
            let data=req.body;
            const listUserBought=await orderQuery.getUsernameInOrderbyProductID(data.ID_Product)
            let check=listUserBought.find((o)=>
                        o.Username===username
            )
            if(check){
                let review=new Review(username,data.ID_Product,data.rate,data.content,data.reply)
                let postreview=await reviewQuery.postReview(review)
                res.json(postreview)
            }
            else{
                    res.json({staus:false});
            }
        } catch (err) {
            console.log(err)
        }
})
router.post('/postreply',async function(req,res){
        try {
            let token=req.headers.authorization.split(" ")[1];
       
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username

            let data=req.body;
            console.log(data)

            const listUserBought=await orderQuery.getUsernameInOrderbyProductID(data.id_product)
            let check=listUserBought.find((o)=>
                        o.Username===username
            )
            if(check){
                let review=new Review(username,data.id_product,data.rate,data.content,data.reply)
                let postreview=await reviewQuery.postReview(review)
                res.json(postreview)
            }
            else{
                    res.json({staus:false});
            }
        } catch (err) {
            console.log(err)
        }
})

router.put('/:id',async function(req,res){
        try{
                let data=req.body;
                let edit_review=new EditReview(data.id_review,data.content)
                let editcheck= await reviewQuery.editReview(edit_review)
                res.json(editcheck)
        }
        catch(err){
                console.log(err)
        }
})

router.delete('/:id',async function(req,res){
        try {
                let id_review=parseInt(req.params.id);
                let deletecheck=await reviewQuery.deleteReview(id_review);
                res.json(deletecheck)
        } catch (err) {
              console.log(err)  
        }
})

module.exports=router