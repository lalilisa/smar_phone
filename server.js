var express = require('express');
const bodyParser= require('body-parser');
var session=require('express-session');
var viewEngine=require('./setview')
var app = express();
var DAO =require('./test')
var registerController=require('./controllers/registerController')
var loginController=require('./controllers/loginController')
var jwt =require('jsonwebtoken')
var cookie=require('cookie-session')
let cookie_parser=require('cookie-parser')
var homecontroller=require('./controllers/homecontroller')
var profileRouter=require('./routes/profile')
var upload=require('./storageimg')
var admin=require('./routes/admin')
var product=require('./routes/product')
var Register=require('./data/Register')
const dotenv=require('dotenv').config()
var home=require('./routes/home')
var cart=require('./routes/cart')
var apiuser=require('./api/apiuser')
var apiadminuser=require('./api/apiuseradmin')
var apicart=require('./api/apiCart')
var cors = require('cors')
const checkout=require('./routes/checkout')
const apicheckout=require('./api/apicheckout')
const apiproduct=require('./api/apiproduct')
const apiorder=require('./api/apiorder')
const apireview=require('./api/apireview')
const apicomment=require('./api/apicomment')
const productQuery=require('./DAO/productquery')
const {Authentication,Authorization}=require("./controllers/auth")
var cors = require('cors')

viewEngine(app)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookie_parser())  
// app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use(homecontroller.showUsername)
app.use('',home)
app.use('/admin',admin)
app.use('/product',product)
app.use('/profile',profileRouter)
app.use('/api/user',Authentication,apiuser)
app.use('/cart/',cart)
app.use('/api/cart',Authentication,apicart)
app.use('/api/adminuser',apiadminuser)
app.use('/checkout',checkout)
app.use('/api/checkout',Authentication,apicheckout)
app.use('/api/product',apiproduct)
app.use('/api/order',apiorder)
app.use('/api/review',apireview)
app.use('/api/comment',apicomment)
app.use(function(req,res,next){
  res.status(404).render('404')
})
app.use(function(req,res,next){
  res.status(401).render('l')
})


var server = app.listen(8080, function () {
   var port = server.address().port;
    console.log("Example app listening at http://localhost:"+port);
})