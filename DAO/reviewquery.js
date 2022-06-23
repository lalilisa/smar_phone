

const configdb=require('../configdatabase')
const sql=require('mssql');
const EditReview = require('../data/EditReview');


async function getReview(id_product){
    try {
        let pool=await sql.connect(configdb);
        let req=await pool.request()
                           .input("id_product",sql.Int,id_product)
                           .query("select id_review,ID_Product,Content,rate,Account.Username,Account.Name,Account.img ,reply from Review  inner join Account on Account.Username=Review.Username  where ID_Product=@id_product")

        
        const data=req.recordset;
        for(let i=0;i<data.length;i++){
                data[i]['children']=[]

        }
        return data;
    } catch (err) {
            console.log(err)
    }

}


async function postReview(review){
    try {
        let pool=await sql.connect(configdb);
        let req=await pool.request()
                          .input('username',sql.NVarChar,review.username)
                          .input('ID_Product',sql.Int,review.ID_Product)
                          .input('rate',sql.Int,review.rate)
                          .input('content',sql.NVarChar,review.content)
                          .input('reply',sql.Int,review.reply)
                          .query("insert into Review values(@username,@ID_Product,@content,@rate,@reply)")
        return true
    } catch (err) {

        console.log(err)
        return false
    }

}
async function editReview(EditReview){
    try {
            let pool =await sql.connect(configdb);
            let req=await pool.request()
                              .input('id_review',sql.Int,EditReview.id_review)
                              .input('content',sql.NVarChar,EditReview.content)
                              .query('update Review set content=@content where id_review=@id_review')
            return true;
    } catch (err) {
        console.log(err)
        return false;
    }

}
async function deleteReview(id_review){
    try {
            let pool =await sql.connect(configdb);
            let req=await pool.request()
                              .input('id_review',sql.Int,id_review)

                              .query('delete  Review  where id_review=@id_review')
            return true;
    } catch (err) {
        console.log(err)
        return false;
    }

}

module.exports={
    getReview,
    postReview,
    editReview,
    deleteReview,
}