var express = require('express');
var router = express.Router();
var validator = require('validator');
var uid = require('shortid');

global.user=[];

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

//注册
router.get('/reg',function(req,res){
  res.locals.errors = "";
  res.render('reg');
});

router.post('/reg',function(req,res){
  var errors = {};
  var username = req.body.username;
  var password = req.body.password;
  var confirm = req.body.confirm;

  if(!validator.isLength(username,5,10)){
    errors.username = "username string length >5 <10";
  }
  if(!validator.isLength(password,5,10)){
    errors.username = "password string length >5 <10";
  }
  if(password !== confirm){
    errors.confirm = "confirm password must === password";
  }else{
    res.locals.errors=errors;
    res.render('reg');
  }

  if(Object.keys(errors).length > 0){
    res.render("reg",{errors:errors});
  }else{
    var id = uid();
    var user={
      id:id,
      username:username,
      password:password
    };
    global.users.push(user);
    res.redirect("/user/list");
    //res.send("reg sucesss");
  }
});

//列表
router.get("/list",function(req,res){
  res.render("list",{user:global.users});
});

//登录
router.get("/login",function(req,res){
  res.render("login");
});

router.post("/login",function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  //临时验证
  var pass = false;
  global.users.forEach(function(user){
    if(username === user.username && password === user.password){
      pass = true
    }
  })

  if(pass){
    res.send("登录成功");
  }else{
    res.render("login",{error:true});
    res.send("登录失败");
  }
});

module.exports = router;
