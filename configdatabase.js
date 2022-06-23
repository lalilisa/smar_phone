const dotenv=require('dotenv').config()

var config = {  
    server: process.env.SERVER,  
    port:1433,
 
    authentication: {
        type: 'default',
        options: {
        
            userName: process.env.DB_USERNAME, 
            password: process.env.DB_PASSWORD, 
        }
    },
    options: {
       
        encrypt: true,
        database: process.env.DB_NAME,
        enableArithAbort:true,
        trustServerCertificate: true,
    }
}; 
module.exports=config;