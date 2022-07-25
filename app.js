//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const mongoose = require("mongoose");
const schemas = require("./public/js/schemas");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/shopingDB",{useNewUrlParser : true});

const Products = mongoose.model("products" ,schemas.productsSchema);
const Users = mongoose.model("users" ,schemas.usersSchema);


app.post("/products",function (req , res) {
  const NewProduct = new products({
    id: req.body.id,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
    rating: {
    rate: req.body.rate,
    count: req.body.count
    }
  });
  NewProduct.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("success");
    }
  });
});

var stateToast="";
var user_log="";

app.get("/login", function(req , res){
  if(user_log!=""){
    user_log="";
    stateToast="Logout";
  }
  res.render("login" , {stateToast: stateToast});
  stateToast="";
});
app.post("/login", function(req , res){
  Users.findOne({ email: req.body.email }, function(err,findUser){
    if(err){
      console.log(err);
      res.redirect("/login");
    }
    else{
      if(findUser && findUser.password===req.body.password){
        stateToast="login";
        user_log=findUser;
        res.redirect("/");
      }
      else{
        stateToast="errorLogin";
        res.redirect("/login");
      }
    }
  });
});
app.get("/signup", function(req , res){
  res.render("signup");
});
app.post("/signup", function(req , res){
  const NewUser = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  NewUser.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      stateToast="Register";
      res.redirect("/login");
      }
  });
});

app.get("/", function ( req , res){

  Products.find(function (err , productsDetails){
    if(err){
      res.send(err);
    }
    else{
      var statePre="disabled",stateNext="";
      res.render("frame" , {postsinf: productsDetails , indexProduct: 1, statePre: statePre, stateNext: stateNext,
      stateToast: stateToast ,user_log: user_log});
      stateToast="";
    }
  });
});
app.get("/pages/:pageid", function ( req , res){
  Products.find(function (err , productsDetails){
    if(err){
      res.send(err);
    }
    else{
      var statePre="",stateNext="";
      if(req.params.pageid==1 || (10*(req.params.pageid-2)>=productsDetails.length)){
        statePre="disabled";
      }
      if(10*parseInt(req.params.pageid)>=productsDetails.length){
        stateNext="disabled";
      }
      res.render("frame" , {postsinf: productsDetails , indexProduct: req.params.pageid, statePre: statePre, stateNext: stateNext});
    }
  });

});

app.get("/home", function ( req , res){
  Products.find(function (err , productsDetails){
    if(err){
      res.send(err);
    }
    else{
      var statePre="disabled",stateNext="";
      res.render("frame" , {postsinf: productsDetails , indexProduct: 1, statePre: statePre, stateNext: stateNext,
      stateToast: stateToast ,user_log: user_log});
      stateToast="";
    }
  });
});

// app.post("/", function(req , res){
//   const title = req.body.Title;
//   const postDetail = req.body.postDetails;
//   posts.push( { title : title, detail : postDetail, limit : postDetail.substring(0,100) } );
//   res.redirect("/");
// });
// app.get("/about", function ( req , res){
//   res.render("about" , {textAbout: aboutContent});
// });
// app.get("/contact", function ( req , res){
//   res.render("contact" , {textContact: contactContent});
// });
// app.get("/posts/:titlePost", function ( req , res){
//   res.render("post" , {postsinf: posts, titlePost : req.params.titlePost});
// });
// app.get("/compose", function ( req , res){
//   res.render("compose");
// });
// const URL ="https://fakestoreapi.com/products/";
//
// for(let i=1;i<=20;i++){
//   https.get( URL + i, function(response){
//     response.on('data', (data) => {
//       try {
//         posts.push( JSON.parse(data) );
//       } catch (error) {
//           return null;
//       }
//     });
//   });
// }


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
