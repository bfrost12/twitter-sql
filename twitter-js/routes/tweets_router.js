var express = require("express");
var tweetBank = require("../tweet-bank.js")
var app = express.Router();

app.post("/submit", function(req, res){
  tweetBank.add(req.body, function(err, tweet){
    res.redirect("/tweets/" + tweet.name);
  });
});

app.get("/:name", function(req, res){
  tweetBank.find(
    { name: req.params.name },
    function(err, tweets){
      if(tweets.length == 0)
        throw new Error("user does not exist");
      res.render("index", { mode: 'USER', tweets: tweets });
    });
});

app.get("/:name/tweet/:id", function(req, res){
  tweetBank.find(
    { name: req.params.name, id: parseInt(req.params.id) },
    function(err, tweets){
      if(tweets.length == 0)
        throw new Error("user with that tweet id does not exist");
      res.render("index", { mode: 'TWEET', tweets: tweets });
    });
});

module.exports = app;
