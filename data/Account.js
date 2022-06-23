'use strict'
class Accounts{
    constructor(user,pass,email,address,phone,role){
        this.user=user;
        this.pass=pass;
        this.email=email;
        this.address=address;
        this.phone=phone;
        this.role=role;
    }
}
module.exports=Accounts;