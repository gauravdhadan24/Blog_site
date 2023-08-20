//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeContent = "Discover a space at DAILY JOURNA where you can capture your daily moments, thoughts, and reflections. Our platform promotes self-growth and creativity through journaling, helping you gain clarity and express emotions. Explore a variety of entries, tips, and prompts, and join a supportive community. Start your journaling journey today—create an account, set goals, write freely, and connect with others.";
const aboutContent = "DAILY JOURNAL is your hub for free self-expression through journaling. Our mission is to create a worldwide community that shares and grows together. Every voice matters as we weave stories of emotion, growth, and connection. Meet our passionate team and discover the power of sharing your journey with others who understand.";
const contactContent = "Got questions or ideas? Reach out to us at: contact@dailyjournal.com.\n We're here to listen and help. Your feedback matters to us.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port http://locolhost:3000");
});
