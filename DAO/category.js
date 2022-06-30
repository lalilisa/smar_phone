var sql=require("mssql")

const db=require('../configdatabase')



function getAllCategory(){

    try {
        let pool=sql.connect(db)
        
        return new Promise((resolve,reject)=>{
            pool.then(()=>{
                let request=new sql.Request();
                request.query("select * from Category",function(err,recordset){
                    if(err) reject(err)
                    return resolve(recordset.recordset)
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    getAllCategory
}