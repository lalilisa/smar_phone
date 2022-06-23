const sql=require('mssql')

const configdb=require('../configdatabase')
const productQuery=require('../DAO/productquery')
function ChuanHoa(data){
    let result='';
    for(let i=0;i<data.length;i++){

        let record=`(?,${data[i].id_detail},${data[i].ID_Product},N'${data[i].color}',${data[i].number},${data[i].price})`;
        if(i!==data.length-1)
                record+=',';
        result+=record;
    }
    return result;
}


async function crateOrder(data){
        try{
                console.log(data)
            let pool=await sql.connect(configdb);
  
            let req=await pool.request()
                              .input("username",sql.NVarChar,data.username)    
                              .input("datetime",sql.DateTime,data.datetime)   
                              .input("total",sql.Float,data.total)  
                              .query('insert into Orders values(@username,@total,0,@datetime);select TOP(1) id_order from Orders where username=@username ORDER BY id_order DESC;')     
            let lastid_order=req.recordset[0].id_order
            console.log("ID "+lastid_order)
            let record=[];
            for(let i=0;i < data.data.length;i++){
                    
                    let id_product=data.data[i].ID_Product
                    console.log(id_product)
                    let query=await pool.request()
                                        .input("ID_Product",sql.Int,id_product)
                                        .input("color",sql.NVarChar,data.data[i].color)
                                        .query('select * from Product_Detail where ID_Product=@ID_Product and color=@color');
                    query.recordset[0].number=data.data[i].number;                    
                    record.push(query.recordset[0]);
            }
            let records=ChuanHoa(record);
            records= records.replace(/\?+/g,lastid_order)
            console.log(records)
            let orderDetailInsert=await pool.request()
                                             .query(`insert into Orders_Detail values ${records}`)
            
        }   
        catch(err){
                console.log(err)
        }

}


async function getOrderByUsername(username){
        try{
                let pool=await sql.connect(configdb);
                let req=await pool.request()
                                   .input('username',sql.NVarChar,username)
                                   .query('select Product.Name,Product.ProductID,Product_Detail.id_detail,Product_Detail.price,Product_Detail.color,Product_Detail.img,number,id_order from Product_Detail inner join  Product on Product_Detail.ID_Product=Product.ProductID inner join  (select Orders_Detail.id_order,ID_Productdetail,number from Orders_Detail ,(select id_order from Orders where Username=@username) as list_idorder where  Orders_Detail.id_order=list_idorder.id_order) as p on Product_Detail.id_detail=p.ID_Productdetail')
                return req.recordset
             
                // console.log(listProductDetail)
                      
        }
        catch(err){
                console.log(err)
        }
}

async function getAllOrder(){
        try{
                let pool=await sql.connect(configdb);
                let req=await pool.request()
                                  .query('select a.Username, p.Name,p.color,p.img, a.number,a.status from (select Orders_Detail.ID_Productdetail,Orders.Username,Orders.status,Orders_Detail.id_orderdetail,Orders_Detail.number from Orders,Orders_Detail where Orders.id_order =Orders_Detail.id_order) as a inner join  (select Product.Name,Product_Detail.id_detail, Product_Detail.color,Product_Detail.img from Product,Product_Detail where Product.ProductID=Product_Detail.ID_Product) as p on a.ID_Productdetail=p.id_detail')
                return req.recordset
             
                // console.log(listProductDetail)
                      
        }
        catch(err){
                console.log(err)
        }
}

async function confirmOrder(username,id_order){
        try{
                let pool=await sql.connect(configdb);
                let req=await pool.request()
                                  .input('username',sql.NVarChar,username)
                                  .input('id_order',sql.Int,id_order)
                                  .query('update  Orders set status=1 where Username=@username and id_order=@id_order')
                return true;
        }
        catch(err){
                console.log(err)
                return false;
        }

}
async function deleteOrder(username,id_order){
        try{
                let pool=await sql.connect(configdb);
                let req=await pool.request()
                                  .input('username',sql.NVarChar,username)
                                  .input('id_order',sql.Int,id_order)
                                  .query('delete  Orders  where Username=@username and id_order=@id_order')
                return true;
        }
        catch(err){
                console.log(err)
                return false;
        }

}


async function getUsernameInOrderbyProductID(ID_Product){
        try {
                let pool=await sql.connect(configdb);
                let req=await pool.request()
                                  .input('id_product',sql.Int,ID_Product)
                                  .query('select Username from  Orders,Orders_Detail where Orders.id_order=Orders_Detail.id_order and Orders_Detail.ID_Product=@id_product')
                          
                sql.close();
                return req.recordset;
        } catch (err) {
                console.log(err)
                return false
                
        }
}
module.exports={
    crateOrder,
    getOrderByUsername,
    confirmOrder,
    deleteOrder,
    getUsernameInOrderbyProductID,
    getAllOrder,
}