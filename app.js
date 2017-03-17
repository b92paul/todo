var express = require('express');
var redis = require('redis');

var app = express();
var router = express.Router();
var client = redis.createClient();

client.on("connect", function () {
  client.set("foo_rand000000000000", "some fantastic value", redis.print);
  client.get("foo_rand000000000000", redis.print);
});

app.use(express.static('public'));
router.get('/', function(req, res){
  return
});

app.listen(5000);
