//import { createPost } from "./post";
const addPost = require("./post");

function insertPost(){
const a = window.document.querySelector("container");
a.innerHTML = addPost.createPost();
}
module.exports = { insertPost };
