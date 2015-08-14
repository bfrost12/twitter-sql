var express = require("express");
var swig = require("swig");
var tweetBank = require("./tweet-bank");
var tweetsRouter = require("./routes/tweets_router");
var bodyParser = require("body-parser");

var app = express();

app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: false}));

app.engine("html", swig.renderFile);
app.set("view engine", "html");
swig.setDefaults({cache: false});


app.get("/", function(req, res){
  tweetBank.list(function(err, tweets){
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




