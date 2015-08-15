var express = require("express");
var swig = require("swig");
var tweetBank = require("./tweet-bank.js");
var tweetsRouter = require("./routes/tweets_router");
var bodyParser = require("body-parser");
var tweetdb = require("../models/index.js");

var app = express();

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: false}));

app.engine("html", swig.renderFile);
app.set("view engine", "html");
swig.setDefaults({cache: false});

//update app.get to get tweets from the database and render those tweets
app.get("/", function(req, res){
  tweetBank.list(function(err, tweets){
  	console.log(tweets);
    res.render("index", { tweets: tweets, mode: 'ALL' });
  });
});

app.use("/tweets", tweetsRouter);

app.use(function(req, res){
  res.status(404);
  res.render("404", { url: req.url});
});

app.use(function(err, req, res, next){
  res.status(500);
  res.render("500",{ error: err });

})


app.listen(3003);



