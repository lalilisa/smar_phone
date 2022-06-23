
var express=require('express')
var bodyParser=require('body-parser')
var app=express()
var viewEngine=require('./setview')
var jwt=require('jsonwebtoken')
var data=[{"name":"ip5","price":120},
            {"name":"ip6","price":120} ,
            {"name":"ip7","price":120} ,
            {"name":"ip8","price":120} ,
            {"name":"ip9","price":120} ,
            {"name":"ip10","price":120} ,  ]

viewEngine(app);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.route('/product')
   .get(function(req,res){
        var pagec=0;
        if(req.query.pages!=null)
             pagecr=parseInt(req.query.pages);
        else{
            pagecr=1
            pn=1,pend=3
        }
        if(pagecr%3==0){
            
            if(pagecr==pn){
                pend=pagecr;
                pn=pend-3;
            }
            else if(pagecr!=pn){
                pn=pagecr;
                pend=pn+3;
            }
        }
        else{
            
        }   
        var list={
            data:data,
            pagecr:pagecr,
            pn:pn,
            pend:pend,
        }
        
        res.render('pn',{"list":list})

   })

app.get('/products',function(req,res){
        res.json(data)
})

app.route('/home')
   .get(function(req,res){
        
             res.render('pn')
            
   })


var server=app.listen(8000,function(){

    console.log("http://localhost:"+server.address().port)
})