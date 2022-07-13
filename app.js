//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const addPost = require("./modules/post");

const posts=[{
"id": 1,
"title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
"price": 109.95,
"description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
"rating": {
"rate": 3.9,
"count": 120
}
},
{
"id": 2,
"title": "Mens Casual Premium Slim Fit T-Shirts ",
"price": 22.3,
"description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
"rating": {
"rate": 4.1,
"count": 259
}
},
{
"id": 3,
"title": "Mens Cotton Jacket",
"price": 55.99,
"description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
"rating": {
"rate": 4.7,
"count": 500
}
},
{
"id": 4,
"title": "Mens Casual Slim Fit",
"price": 15.99,
"description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
"category": "men's clothing",
"image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
"rating": {
"rate": 2.1,
"count": 430
}
},
{
"id": 5,
"title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
"price": 695,
"description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
"category": "jewelery",
"image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
"rating": {
"rate": 4.6,
"count": 400
}
}];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function ( req , res){


  // const URL ="https://fakestoreapi.com/products/";
  //
  // for(let i=1;i<=5;i++){
  //
  //   https.get( URL + i, function(response){
  //     response.on('data', (data) => {
  //       posts.push( JSON.parse(data) );
  //     });
  //   });
  // }

  setTimeout(()=>{
    res.render("home" , {postsinf: posts });
  }, 10);
});
app.post("/", function(req , res){
  const title = req.body.Title;
  const postDetail = req.body.postDetails;
  posts.push( { title : title, detail : postDetail, limit : postDetail.substring(0,100) } );
  res.redirect("/");
});
app.get("/home", function ( req , res){
  res.render("home" , {postsinf: posts});
});
app.get("/about", function ( req , res){
  res.render("about" , {textAbout: aboutContent});
});
app.get("/contact", function ( req , res){
  res.render("contact" , {textContact: contactContent});
});
app.get("/posts/:titlePost", function ( req , res){
  res.render("post" , {postsinf: posts, titlePost : req.params.titlePost});
});
app.get("/compose", function ( req , res){
  res.render("compose");
});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
