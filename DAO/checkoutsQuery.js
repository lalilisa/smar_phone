const bcrypt = require('bcryptjs');
const sql=require('mssql');
const configdb=require('../configdatabase');
var cartQuery=require('./cartQuery')

async function createCheckout(data){
    try{
        var pool=await sql.connect(configdb);
        let id_cart=await cartQuery.getIDCartByUsername(data.username);
        let req=await pool.request()
                          .input('id_cart',sql.Int,id_cart)
                          .query('select id_checkout,hash,token from Checkouts where id_cart=@id_cart')
        let listToken=req.recordset;

        var t;

        for(let i=0;i<listToken.length;i++){

            let match= await bcrypt.compare(data.recordset,listToken[i].hash);
            console.log(match,id_cart,listToken[i].id_cart)
            if(match===true){
                t=listToken[i];
                console.log("trrrrr")
                break;
            }
      }

         if(t){
            console.log("Tcc: "+t.token)
            return t.token;
        }
        else{
                console.log("DATA VAO ELSE")
                let salt = bcrypt.genSaltSync(10);
                let hash=bcrypt.hashSync(data.recordset,salt);
                let token=hash.replace(/\/+/g,'')
                let request= await pool.request()
                        .input('id_cart',sql.Int,id_cart)
                        .input('token',sql.NVarChar,token)
                        .input('hash',sql.NVarChar,hash)
                        .query('insert into Checkouts values (@id_cart,@token,@hash);select TOP(1) id_checkout from Checkouts where id_cart=@id_cart ORDER BY id_checkout DESC;')

                let lastid_checkout=request.recordset[0].id_checkout;
                data.recordset=data.recordset.replace( /\?+/g,lastid_checkout)
                let creatcheckdetail= await pool.request()
                        .query(`insert into CheckoutDetail values  ${data.recordset}`)
                return token
        }
    }
    catch(err){
            console.log(err)
    }
}

async function getCheckout(token){
    try{

            let pool=await sql.connect(configdb);
            let req=await pool.request()
                              .input("token",sql.NVarChar,token)
                              .query('select * from CheckoutDetail where id_checkout=(select id_checkout from Checkouts where  token=@token)');
                return req.recordset;
    }
    catch(err){
        console.log(err)
    }
}
async function getIdCartByToken(token){
    try{

        let pool=await sql.connect(configdb);
        let req=await pool.request()
                          .input("token",sql.NVarChar,token)
                          .query('select id_cart from Checkouts where token=@token');
            return req.recordset[0].id_cart;
}
catch(err){
    console.log(err)
}
}


module.exports={
    createCheckout,
    getCheckout,
    getIdCartByToken,
}
