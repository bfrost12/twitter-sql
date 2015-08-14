var _ = require("underscore");

module.exports = {
  list: list,
  add: add,
  find: find
}

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
];

function list(cb){
  cb(null, _.clone(data));
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
