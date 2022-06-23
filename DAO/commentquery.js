

const configdb=require('../configdatabase')
const sql=require('mssql');
const EditComment = require('../data/EditComment');


async function getComment(id_product){
    try {
        let pool=await sql.connect(configdb);
        let req=await pool.request()
                           .input("id_product",sql.Int,id_product)
                           .query("select id_comment,ID_Product,Content,reply,Account.Username,Account.Name,Account.img from Comments  inner join Account on Account.Username=Comments.username  where ID_Product=@id_product")

        const data=req.recordset;
        for(let i=0;i<data.length;i++){
                data[i]['children']=[]

        }
  
        return data;
    } catch (err) {
            console.log(err)
    }

}


async function postComment(Comment){
    try {

        let pool=await sql.connect(configdb);
        let req=await pool.request()
                          .input('username',sql.NVarChar,Comment.username)
                          .input('ID_Product',sql.Int,Comment.ID_Product)
                          .input('reply',sql.Int,Comment.reply)
                          .input('content',sql.NVarChar,Comment.content)
                          .query("insert into Comments values(@username,@ID_Product,@reply,@content)")
        return true
    } catch (err) {

        console.log(err)
        return false
    }

}
async function editComment(EditComment){
    try {
            let pool =await sql.connect(configdb);
            let req=await pool.request()
                              .input('id_Comment',sql.Int,EditComment.id_comment)
                              .input('content',sql.NVarChar,EditComment.content)
                              .query('update Comments set content=@content where id_comment=@id_Comment')
            return true;
    } catch (err) {
        console.log(err)
        return false;
    }

}
async function deleteComment(id_Comment){
    try {
            let pool =await sql.connect(configdb);
            let req=await pool.request()
                              .input('id_Comment',sql.Int,id_Comment)

                              .query('delete  Comments where id_comment=@id_Comment')
            console.log(req.recordset)
            sql.close();
            return true;
    } catch (err) {
        console.log(err)
        return false;
    }

}
module.exports={
    getComment,
    postComment,
    editComment,
    deleteComment,
}