const express=require('express')
const Comment=require('../data/Comment')
const EditComment=require('../data/EditComment')
const router=express.Router()
const commentQuery=require('../DAO/commentQuery')
const jwt=require('jsonwebtoken')

const Tree=require('../controllers/Tree')
router.get('/:id',async function(req,res){
        try {                   


                let id_product=parseInt(req.params.id);
                var listComment=await commentQuery.getComment(id_product)
                let token=req.cookies.Username;
                let username=null;
                if(token!==undefined)
                        username=jwt.verify(token,process.env.JWT_SECRET_KEY).username;
                for(let i=0;i < listComment.length;i++){
                    if(listComment[i].Username===username)
                        listComment[i]['isUser']=true;
                    else
                        listComment[i]['isUser']=false;
                }
                listComment=Tree.TreeComment(listComment)

                res.json(listComment)
        } catch (err) {
                console.log(err)
        }
       
})



router.post('/',async function(req,res){
        try {
            let token=req.headers.authorization.split(" ")[1];
       
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username

            let data=req.body;
            let comment=new Comment(username,data.id_product,data.reply,data.content)
      
            let postComment=await commentQuery.postComment(comment)
            res.json(postComment)
        } catch (err) {
            console.log(err)
        }
})
router.post('/postreply',async function(req,res){
        try {
            let token=req.headers.authorization.split(" ")[1];
       
            let username=jwt.verify(token,process.env.JWT_SECRET_KEY).username
            let data=req.body;
            let comment=new Comment(username,data.id_product,data.reply,data.content)
            let postComment=await commentQuery.postComment(comment)
            res.json(postComment)
        } catch (err) {
            console.log(err)
        }
})
router.put('/:id',async function(req,res){
        try{
                let data=req.body;
                let edit_Comment=new EditComment(data.id_comment,data.content)

                let editcheck= await commentQuery.editComment(edit_Comment)
                res.json(editcheck)
        }
        catch(err){
                console.log(err)
        }
})

router.delete('/:id',async function(req,res){
        try {
                let id_Comment=parseInt(req.params.id);
                let deletecheck=await commentQuery.deleteComment(id_Comment);
                res.json(deletecheck)
        } catch (err) {
              console.log(err)  
        }
})

module.exports=router