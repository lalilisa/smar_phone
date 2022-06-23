
var configdb=require('../configdatabase')
var sql=require('mssql')


async function addProduct(data){
    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                .input("name",sql.NVarChar,data.name)
                .input("brand",sql.NVarChar,data.brand)
                .input("price",sql.Float,data.price)
                .input("describe",sql.NVarChar,data.describe)
                .input("discount",sql.Int,data.discount)
                .input("img",sql.NVarChar,data.img)
                .input("ram",sql.NVarChar,data.ram)
                .input("rom",sql.NVarChar,data.rom)
                .query("insert into Product values(@name,@brand,@price,@describe,@img,@ram,@rom,@discount)")
    }
    catch(err){
            console.log(err)
    }
}

async function addDetailProduct(data){
    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                .input("color",sql.NVarChar,data.color)
                .input("id_product",sql.Int,parseInt(data.id_product))
                .input("screen",sql.NVarChar,data.screen)
                .input("os",sql.NVarChar,data.os)
                .input("chip",sql.NVarChar,data.chip)
                .input("frontcamera",sql.NVarChar,data.fontcam)
                .input("rearcamera",sql.NVarChar,data.rearcam)
                .input("pin",sql.NVarChar,data.pin)
                .input("price",sql.Float,data.price)
                .input("img",sql.NVarChar,data.img)
                .input("numbers",sql.Int,data.numbers)
                .query("insert into Product_Detail values(@id_product,@color,@screen,@os,@chip,@frontcamera,@rearcamera,@pin,@price,@img,@numbers)")
    }
    catch(err){
            console.log(err)
    }
}
async function deleteDetailProduct(data){
    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                          .input("id_detail",sql.Int,data)
                          .query("delete Product_Detail where id_detail=@id_detail");
    }
    catch(err){
            console.log(err)
    }
}
async function deleteProduct(data){
    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                          .input("id",sql.Int,data)
                          .query("delete Product where ProductID=@id");
    }
    catch(err){
            console.log("TBBBBBB")
    }
}
async function getAllProduct(data){
    try{
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                          .query("select * from Product");
        return req.recordset;
    }
    catch(err){
            console.log(err)
    }
}
async function getAllDetaliProduct(data){
    try{
        let query="select Product_Detail.id_detail,Product.Name,Product.Brand,Product_Detail.price,Product_Detail.color from Product,Product_Detail where Product.ProductID=Product_Detail.ID_Product;"
        var pool=await sql.connect(configdb);
        var req=await pool.request()
                          .query(query);
        return req.recordset;
    }
    catch(err){
            console.log(err)
    }
}
async function getModelByID(ID){
    try{    
            let query="select * from Product where ProductID=@id";
            var pool=await sql.connect(configdb);
            var req= await pool.request()
                               .input("id",sql.Int,ID)  
                               .query(query)
            return req.recordset;
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
async function getDetailbyIDModel(ID){
        try{
                var pool= await sql.connect(configdb);
                var req= await pool.request()
                                    .input("id_model",sql.Int,ID)
                                    .query("select * from Product  inner join Product_Detail ON  Product.ProductID=Product_Detail.ID_Product where Product.ProductID=@id_model");
                    return req.recordset;
        }
        catch(err){
            console.log(err)
        }
}
async function changeModel(data,id){
        var pool=await sql.connect(configdb);
        let model= await getModelByID(id);
        if(data.img==undefined){
            data.img=model[0].img;
        }
        var req=await pool.request()
                        .input('id',sql.Int,id)
                        .input("name",sql.NVarChar,data.name)
                        .input("brand",sql.NVarChar,data.brand)
                        .input("price",sql.Float,data.price)
                        .input("describe",sql.NVarChar,data.describe)
                        .input("discount",sql.Int,data.discount)
                        .input("img",sql.NVarChar,data.img)
                        .input("ram",sql.NVarChar,data.ram)
                        .input("rom",sql.NVarChar,data.rom)
                        .query("update Product set Name=@name, Brand=@brand,Price=@price,Describe=@describe,Discount=@discount,img=@img,RAM=@ram,ROM=@rom Where ProductID=@id")
}
async function changeDetailProduct(data,id){
    try{
        var pool=await sql.connect(configdb);
        let model= await getDetailByID(id);
        if(data.img==undefined){
            data.img=model[0].img;
        }
        var req=await pool.request()
                .input("id",sql.Int,id)
                .input("color",sql.NVarChar,data.color)
                .input("screen",sql.NVarChar,data.screen)
                .input("os",sql.NVarChar,data.os)
                .input("chip",sql.NVarChar,data.chip)
                .input("frontcamera",sql.NVarChar,data.fontcam)
                .input("rearcamera",sql.NVarChar,data.rearcam)
                .input("pin",sql.NVarChar,data.pin)
                .input("price",sql.Float,data.price)
                .input("img",sql.NVarChar,data.img)
                .query("update Product_Detail set color=@color,screen=@screen,OS=@os,Chip=@chip,frontcamera=@frontcamera,rearcamera=@rearcamera,pin=@pin,price=@price,img=@img where id_detail=@id")
                console.log('TCCCCCCCCCCCCCCCc')
    }
    catch(err){
            console.log(err)
    }
}

async function getIDProdductByName(name){
        try{    console.log(name)
                let pool=await sql.connect(configdb);
                let req=await pool.request()
                                  .input('name',sql.NVarChar,name)
                                  .query("select ProductID from Product where Name= N'iPhone 13 64GB Chính Hãng (VN/A)'")              
                 return req.recordset[0]
        }
        catch(err){
                console.log(err)
        }
}
async function searchProductByName(keyword){
    try{
        console.log(keyword);
        let pool=await sql.connect(configdb);
        let req=await pool.request()
                          .input('name',sql.NVarChar,keyword)
                          .query("select * from Product where Name like N'@name%'")              
         return req.recordset;
}
catch(err){
        console.log(err)
}
}

module.exports={
    searchProductByName,
    addProduct,
    addDetailProduct,
    getAllProduct,
    deleteDetailProduct,
    getAllDetaliProduct,
    getModelByID,
    getDetailByID,
    changeModel,
    changeDetailProduct,
    deleteProduct,
    getDetailbyIDModel,
    getIDProdductByName,
}