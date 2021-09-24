const express = require('express');
const BookData = require('./src/models/bookdata');
const AuthorData = require('./src/models/authordata');
const SignupData =require('./src/models/signupdata')
//const User = require('./src/model/user');
const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken')
var app = new express();
app.use(cors());
app.use(bodyparser.json());
username='admin';
password='1234';
roles="";


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }



 

app.post('/insert',function(req,res){
   
    console.log(req.body);
   
    var book = {       
        Title: req.body.product.booktitle,
        Author : req.body.product.bookauthor,
        Genre : req.body.product.genre,
        Image : req.body.product.image,
   }       
   var book = new BookData(book);
   book.save();
});

app.post('/inserta',function(req,res){
   
  console.log(req.body);
 
  var author = {       
      authorname: req.body.product.name,
      period : req.body.product.period,
      works : req.body.product.works,
      authorimg : req.body.product.imageUrl
 }       
 var author = new AuthorData(author);
 author.save();
});

app.get('/books',function(req,res){
    
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/authors',function(req,res){
    
  AuthorData.find()
              .then(function(authors){
                  res.send(authors);
              });
});

app.post('/login', (req, res) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  username=req.body.uname;
  password=req.body.password;
  if(username==username && password==password){
      let payload={subject:username+password};
      let token=jwt.sign(payload,'secretKey');
      let role="admin"
      res.status(200).send({token,role});
  }
  else {
  SignupData.findOne({username:username,password:password}, function (err, user) {
      if(!user){
          res.status(401).send('username and Password dont match') 
      }
      else {
          let role=user.role;
          console.log(role);
          let payload={subject:username+password};
          let token=jwt.sign(payload,'secretKey');
          res.status(200).send({token,role});
      }
  });
}
  })
  app.post('/signup',function(req,res){
    //let userData = req.body
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    if(req.body.user.uname=="admin" && req.body.user.password=="1234"){
      roles="admin"
       }
       else{
            roles=''
       }
          var user = {       
            username: req.body.product.uname,
            email : req.body.product.email,
            password : req.body.product.password,
            role:roles
          }    
          username=req.body.user.uname;
          SignupData.findOne({username:username}, function (err, user) {
            if (user) {
                res.status(401).send('Email already exists')   
            }else{
              var newuser = new SignupData(user);
              newuser.save();
              res.status(200).send();
            }   
        });
      });     
   /* console.log(req.body);*/
   

app.get('/:id',  (req, res) => {
  
  const id = req.params.id;
    BookData.findOne({"_id":id})
    .then((product)=>{
        res.send(product);
    });
})



    app.put('/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      Title= req.body.booktitle,
      Author = req.body.bookauthor,
      Genre = req.body.genre,
      Image = req.body.image
      BookData.findByIdAndUpdate({"_id":id},
                                  {$set:{"Title":Title,
                                  "Author":Author,
                                  "Genre":Genre,
                                  "Image":Image}})
     .then(function(){
         res.send();
     })
   });

   app.put('/updatea',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    authorname= req.body.authorname,
    period = req.body.period,
    works = req.body.works,
    authorimg = req.body.authorimg
   AuthorData.findByIdAndUpdate({"_id":id},
                                {$set:{"authorname":authorname,
                                "period":period,
                                "works":works,
                                "authorimg":authorimg}})
   .then(function(){
       res.send();
   })
 })
   
app.delete('/remove/:id',(req,res)=>{
   
     id = req.params.id;
     BookData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
   app.delete('/removeauthor/:id',(req,res)=>{
   
    id = req.params.id;
    AuthorData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })
     

app.listen(3000, function(){
    console.log('listening to port 3000');
});

