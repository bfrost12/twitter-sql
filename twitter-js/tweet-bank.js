var _ = require("underscore");
var tweetdb = require("../models/index.js");

module.exports = {
  list: list,
  add: add,
  find: find
}
/*
var data = [
  {
    id: 1,
    name: "Prof",
    text: "Foo"
  },
  {
    id: 2,
    name: "Prof",
    text: "Bar"
  },
  {
    id: 3,
    name: "Nimit",
    text: "JS Rocks"
  }
];*/

function list(cb){
  var tweets = tweetdb.Tweet.findAll().then(function(tweetList) {
    tweetList = tweetList.map(function(t){
      return t.dataValues;
    });
    console.log(tweetList);
    return tweetList;
  });
  cb(null, tweets);
}

function add(tweet, cb){
  var maxTweetId = _.max(data, "id");
  tweet.id = maxTweetId++;
  data.push(tweet);
  cb(null, tweet);
}

function find(attr, cb){
  cb(null, _.clone(_.where(data, attr)));
}
