

var sql=require('mssql')
var configdb=require("../configdatabase")




async function getProductInCart(username){
    var pool=await sql.connect(configdb);
    let id_cart=await getIDCartByUsername(username);
    await console.log(id_cart)
    var request= await pool.request()
                           .input("id_cart",sql.Int,id_cart)
                           .query("select * from Cart_Detail Where id_cart=@id_cart") 
            return request.recordset;
}

async function addToCart(data){
       let id_cart=await getIDCartByUsername(data.username);
       console.log(data)
       let checkInCart=await checkProductInCart(id_cart,data.ID_Productdetail);
       var pool=await sql.connect(configdb);
       if(checkInCart){
        let req=await pool.request()
                          .input("ID_Productdetail",sql.Int,data.ID_Productdetail)
                          .input("number",sql.Int,data.number)
                          .query("update Cart_Detail set number=@number where ID_Productdetail=@ID_Productdetail")
           }
       else{
           
            let req=await pool.request()
                              .input("ID_Productdetail",sql.Int,data.ID_Productdetail)
                              .input("number",sql.Int,data.number)
                              .input("color",sql.NVarChar,data.color)
                              .input("id_cart",sql.Int,id_cart)
                              .input("ID_Product",sql.Int,data.ID_Product)
                              .input("name",sql.NVarChar,data.name)
                              .input("img",sql.NVarChar,data.img)
                              .input("single_price",sql.Float,data.single_price)
                              .query("insert into Cart_Detail values (@id_cart,@ID_Productdetail,@ID_Product,@color,@number,@name,@img,@single_price)");
                
       }

}

async function updateCart(data){

    try{
        data.id_cartdetail=parseInt(data.id_cartdetail);
        var pool=await sql.connect(configdb);
        let req=await pool.request()
                       .input("id_cartdetail",sql.Int,parseInt(data.id_cartdetail))
                       .input("number",sql.Int,parseInt(data.number))
                       .query("update Cart_Detail set number=@number where id_cartdetail=@id_cartdetail")
        
    }
    catch(err){

        console.log(err)
    }

}
async function  deleteProductInCart(data){
    try{
        var pool=await sql.connect(configdb);
        let id_cart=await getIDCartByUsername(data.username);
        let req=await pool.request()
                       .input("id_cart",sql.Int,parseInt(id_cart))
                       .input("id_cartdetail",sql.Int,parseInt(data.id_cartdetail))
                       .query("delete Cart_Detail where id_cartdetail=@id_cartdetail and id_cart=@id_cart")
    }
    catch(err){
        console.log(err)
    }
}


async function getIDCartByUsername(username){
    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                          .input("Username",sql.NVarChar,username)
                          .query("select id_cart from Carts where Username=@Username");

            return  req.recordset[0].id_cart;
    }
    catch(err){
        console.log(err)
    }
}

async function checkProductInCart(id_cart,ID_Productdetail){

    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                          .input("id_cart",sql.Int,id_cart)
                          .input("ID_Productdetail",sql.Int,ID_Productdetail)
                          .query("select * from Cart_Detail where id_cart=@id_cart and ID_Productdetail=@ID_Productdetail");
        if(req.recordset.length>0)
                return true;
            return false;
    }
    catch(err){
        console.log(err)
    }

}
async function getDetailByID(ID){
    try{    

            let query="select * from Product_Detail where id_detail=@id";
            var pool=await sql.connect(configdb);
            let reqs=await pool.request()
                               .input("id_detail",sql.Int,ID)
                               .query('select Product.Name from Product where Product.ProductID=(select Product_Detail.ID_Product from Product_Detail  where Product_Detail.id_detail=@id_detail)')
            var req= await pool.request()
                               .input("id",sql.Int,ID)  
                               .query(query)
            req.recordset[0]['Name']=reqs.recordset[0].Name;
            return req.recordset;
    }
    catch(err){
        console.log(err)
    }
}
module.exports={
    addToCart,
    checkProductInCart,
    getIDCartByUsername,
    getProductInCart,
    updateCart,
    deleteProductInCart,
}