var express=require('express')
var app=express()
var viewEngine=require('./setview')
var bodyParser=require('body-parser')
const checkUser=require('./test')
var jwt=require('jsonwebtoken')
const passport = require('passport');
var cookieSession = require('cookie-session')
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
var cookie=require('cookie-session')
let cookie_parser=require('cookie-parser')
const queryProduct=require('./DAO/productquery')
const axios = require('axios')
const base=[{"name":"IP5"},
            {"name":"IP6"},
            {"name":"IP1"},
            {"name":"IP3"},
            {"name":"IP4"},
            {"name":"IP10"},]
viewEngine(app);
app.use(cookie_parser())  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))



app.get('/',function(req,res){

    res.json({trimai:"trimai"})
})
app.get('/api/:id',function(req,res){
    try{
        let id=parseInt(req.params.id);

        res.json("trimai")
    }
    catch(err){
        console.log(err)
    }

})
app.get('/:id',function(req,res){
    let id=parseInt(req.params.id);
    axios.get('http://localhost:8000/api/'+id)
    .then(response => {
      console.log(response.data);
      res.json(response.data)
    })
    .catch(error => {
      console.log(error);
    });
})

sever=app.listen(8000,function(){

    console.log("http://localhost:"+sever.address().port)
})

