var express = require('express');
var redis = require('redis');

var app = express();
var client = redis.createClient();

client.on("connect", () => {
  client.set("foo_rand000000000000", "some fantastic value", redis.print);
  client.get("foo_rand000000000000", redis.print);
});

app.use('/static', express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(5000);
