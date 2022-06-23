const { enable } = require('express/lib/application');
const req = require('express/lib/request');
var sql = require('mssql');
var Account= require('./data/Account')
var configdb= require('./configdatabase')
var bcrypt =require ("bcryptjs");
var img="profile-placeholder-3.jpg";
async function addUser(user){
    try{
        let pool =await sql.connect(configdb);
        let salt = bcrypt.genSaltSync(10);
        let rq=  await pool.request()
                 .input("user",sql.NVarChar,user.user)
                 .input("pass",sql.NVarChar,bcrypt.hashSync(user.pass, salt))  
                 .input("email",sql.NVarChar,user.email)
                 .input("role",sql.Int,0)
                 .input("img",sql.NVarChar,img)
                 .query("insert into Account(Username,Password,Email,role,img) values(@user,@pass,@email,@role,@img)");

        let initCart= await pool.request()
                                .input("user",sql.NVarChar,user.user)
                                .input("total",sql.Int,0)
                                .query("insert into Carts values(@user,@total)")
    }
       
    catch(err){
        console.log(err)
    }

}

async function updateProfile(user){
        try{
            let pool =await sql.connect(configdb);
            let rq=  await pool.request()
                     .input("user",sql.NVarChar,user.username)
                     .input("email",sql.NVarChar,user.mail)
                     .input("name",sql.NVarChar,user.name)
                     .input("Address",sql.NVarChar,user.address)
                     .input("phonenumber",sql.NVarChar,user.phone)
                     .input("role",sql.Int,user.role)
                     .input("Date",sql.Date,user.date)
                     .query("update Account set Name=@name,Email=@email,Address=@Address,Phonenumber=@phonenumber,role=@role,Date=@Date Where Username=@user");

        }
        catch(err){
            console.log(err)
        }
    
    }

    async function adminUpdateProfile(user){
        try{
            let pool =await sql.connect(configdb);
            let salt = bcrypt.genSaltSync(10);
            let rq=  await pool.request()
                     .input("user",sql.NVarChar,user.username)
                     .input("email",sql.NVarChar,user.mail)
                     .input("name",sql.NVarChar,user.name)
                     .input("Address",sql.NVarChar,user.address)
                     .input("phonenumber",sql.NVarChar,user.phone)
                     .input("role",sql.Int,user.role)
                     .input("Date",sql.Date,user.date)
                     .query("update Account set Name=@name,Email=@email,Address=@Address,Phonenumber=@phonenumber,role=@role,Date=@Date Where Username=@user");
            if(user.password.length>0){
            let rqpass=  await pool.request()
                     .input("password",sql.NVarChar,bcrypt.hashSync(user.password, salt))
                     .query("update Account set Password=@password Where Username=@user");
            }

        }

        catch(err){
            console.log(err)
        }
    
    }
    async function  updatePass(changepass){
        try{
            console.log(changepass)
            let pool =await sql.connect(configdb);
            let rq=  await pool.request()
                     .input("user",sql.NVarChar,changepass.username)
                     .query("select * from Account where Username=@user");    
            let  oldInfo=rq.recordset[0];
            console.log(oldInfo)
            let salt = bcrypt.genSaltSync(10);

            let match = await bcrypt.compare(changepass.old_password,oldInfo.Password);
            if(match===true){
                    rq=await pool.request()        
                                 .input("user",sql.NVarChar,changepass.username)
                                 .input("pass",sql.NVarChar,bcrypt.hashSync(changepass.new_password, salt))  
                                 .query("update Account set Password=@pass where Username=@user");    
                    return true;
            }
            return undefined
        }
        catch(err){
            console.log(err)
        }
    
 }
async function  AuthenLogin(user){
    try{
        console.log(user.user)
        let pool =await sql.connect(configdb);
        let rq=  await pool.request()
                 .input("user",sql.NVarChar,user.user)
                 .query("select * from Account where Username=@user");    
        let s=rq.recordset[0];
        let match = await bcrypt.compare( user.pass,s.Password);
        if(match===true)
            return s
        return undefined
    }
    catch(err){
        console.log(err)
    }

}
async function getac(){

    try{
        let pool=await sql.connect(configdb);
        let rq=await pool.request().query("select Username,Email,Name,Address,Phonenumber,Date,role from Account");
        return rq.recordset
        
    }
    catch(err){
        console.log("TBBBB")
    }
}


sql.on('error', err => {

    // ... error handler

      console.log('This is Error handler');

})

async function getInforByUsername(user){
    try{
        let pool =await sql.connect(configdb);
        let rq=  await pool.request()
                 .input("user",sql.NVarChar,user)
                 .query("select Username,Email,Name,Address,Phonenumber,Date,role,img from Account where Username=@user");
        return rq.recordset
    }
    catch(err){
        console.log(err)
    }
}
async function checkUsername( user){
    try{
        let pool =await sql.connect(configdb);
        let rq=  await pool.request()
                 .input("user",sql.NVarChar,user)
                 .query("select * from Account where Username=@user");
        return rq.recordset;
    }
    catch(err){
        console.log(err)
    }

}
async function checkEmail(email){
    try{
        let pool =await sql.connect(configdb);
        let rq=  await pool.request()
                 .input("email",sql.NVarChar,email)
                 .query("select * from Account where Email=@email");
        return rq.recordset;
    }
    catch(err){
        console.log(err)
    }
}
async function  resetPass(changepass){
    try{
        let salt = bcrypt.genSaltSync(10);
        let pool =await sql.connect(configdb);
        let rq=  await pool.request()
                 .input("user",sql.NVarChar,changepass.username)
                 .input("password",sql.NVarChar,bcrypt.hashSync(changepass.new_password, salt))
                 .query("update Account set Password=@password where Username=@user");    

    }
    catch(err){
        console.log(err)
    }

}
async function addVoucher(){
    try{
        let pool =await sql.connect(configdb);
        
        let rq=  await pool.request()
                 .input("data",sql.NVarChar,"('tri'),('mai')")
                 .query("insert into Vouchers values ('tri')");


    }
       
    catch(err){
        console.log(err)
    }

}
addVoucher()

module.exports={
    AuthenLogin,
   checkEmail,
   checkUsername,
    addUser,
    getac,
    updateProfile,
    updatePass,
    adminUpdateProfile,
    getInforByUsername,
    resetPass,
}