var express =require('express')
const viewEngine=function(app){
    app.engine('ejs', require('express-ejs-extend'));
    app.use(express.static(__dirname+'/public'));
    app.set("view engine", "ejs");

    app.use('/profile',express.static(__dirname+'/public'));
    app.use('/product',express.static(__dirname+'/public'));
    app.use('/admin',express.static(__dirname+'/public'));
    app.use('/cart',express.static(__dirname+'/public'));
    app.use('/admin/showproduct',express.static(__dirname+'/public'));
    app.use('/admin/showdetail',express.static(__dirname+'/public'));
    app.use('/admin/product',express.static(__dirname+'/public'));
    app.set("views","./public/views");

    app.use('/admin',express.static(__dirname+'/uploads'));
    app.use('/admin/showproduct',express.static(__dirname+'/uploads'));
    app.use('/admin/showdetail',express.static(__dirname+'/uploads'));
    app.use('/checkout',express.static(__dirname+'/uploads'));
    app.use('/admin/inforuser',express.static(__dirname+'/uploads/avatar'));
    app.use('/product',express.static(__dirname+'/uploads'));
    app.use('/product',express.static(__dirname+'/uploads/avatar'));
    app.use('/cart',express.static(__dirname+'/uploads'));
    app.use('/profile',express.static(__dirname+'/uploads'));
    app.use('/profile',express.static(__dirname+'/uploads/avatar'));
}
module.exports=viewEngine