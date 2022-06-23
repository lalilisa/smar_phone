const sql=require('mssql');
var cartQuery=require('./cartQuery')
const configdb=require('../configdatabase');


async function getCheckout(){


     
}
async function createACheckout(id_cart,data){
    try{
        var req= await pool.request()
                            .input("id_cart",sql.Int,id_cart)
                            .query('insert into Checkouts values(@id_cart)')
    }
    catch(err){
        console.log(err)
    }
}
async function createCheckout(data){
    try{    

            var pool=await sql.connect(configdb);
            let id_cart=cartQuery.getIDCartByUsername(data.username);
            let id_checkout=checkIdCheckoutByIdCart(id_cart);
            if (id_checkout){
               if(checkToken(id_checkout,data.token))
                        return data.token;
                else{
                    

                }
            }
            else{

            }
            

    }
    catch(err){
        console.log(err)
    }
}

async function  checkIdCheckoutByIdCart(id_cart){
        try{    

            var pool=await sql.connect(configdb);
            let req= await pool.request()
                               .input("id_cart",sql.Int,id_cart)
                               .query('select id_checkout from Checkouts where id_cart=@id_cart')
            if(req.recordset.id_checkout){

                return req.recordset.id_checkout;
            }    
            return  null;
        }
        catch(err){
            console.log(err)
        }
}

async function  checkToken(id_checkout,token){
    try{    

        var pool=await sql.connect(configdb);
        let req= await pool.request()
                            .input("id_checkout",sql.Int,id_checkout)
                            .query('select token from Checkouts where id_checkout=@id_checkout')
        if(req.recordset.token===token){

            return true;
        }    
        return  false;
    }
    catch(err){
        console.log(err)
    }
}

