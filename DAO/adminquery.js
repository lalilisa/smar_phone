var sql=require('mssql')
var configdb=require('../configdatabase')


async function deleteUser(user){
    try{
        let pool =await sql.connect(configdb);
        let rq=  await pool.request()
                 .input("user",sql.NVarChar,user.username)
                 .query("delete from Account where Username=@user");
    }
    catch(err){
        console.log(err)
    }
}
module.exports={
    deleteUser,

}