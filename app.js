
//Require the necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
//Connect to the database
mongoose.connect(
  "mongodb+srv://admin-Azamatjon:Azamatjon1606@cluster0.mdzkvbd.mongodb.net/PostsDB",
  { useNewUrlParser: true }
);


const homeStartingContent =
  "𝓣𝓱𝓲𝓼 𝓲𝓼 𝓱𝓸𝓶𝓮 𝓹𝓪𝓰𝓮 𝓸𝓯 𝓓𝓪𝓲𝓵𝔂 𝓙𝓸𝓾𝓻𝓷𝓪𝓵. 𝓗𝓮𝓻𝓮 𝔂𝓸𝓾 𝓬𝓪𝓷 𝓪𝓭𝓭 𝔂𝓸𝓾𝓻 𝓸𝔀𝓷 𝓹𝓸𝓼𝓽𝓼 𝓪𝓷𝓭 𝓿𝓲𝓮𝔀 𝓸𝓽𝓱𝓮𝓻'𝓼 𝓹𝓸𝓼𝓽𝓼....Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci, laboriosam vitae quaerat, quo, omnis atque quasi ratione animi veritatis a! Doloremque quasi quam aliquid eos voluptatem debitis delectus veritatis.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
//Creating Schema
const postSchema=mongoose.Schema({
  title:String,
  content:String
})
//Creating Model
const Post=mongoose.model("post",postSchema);



//Creating a new instance of express
const app = express();
//Setting the view engine to ejs
app.set('view engine', 'ejs');
//Setting the public folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Creating a new instance of the Post model
app.get("/", function(req, res)
{
      Post.find({},function(err,posts)
  {
    if(!err)
    {
        res.render("home", {
        startingContent: homeStartingContent,
        posts: posts,
        });
    }
  })

});
//
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const newPost = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  newPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  

  

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = req.params.postName;  
    Post.findOne({_id:requestedTitle},function(err,post)
    {
                res.render("post", {
                title: post.title,
                content: post.content,
              });
      });

});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
