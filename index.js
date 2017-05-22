var express = require('express');
var app = express();
var generate = require('./generate');
app.get('/', async function (req, res) {
  res.set({'Content-Type': 'image/jpeg;'})
  const data = await generate();
  res.send(data);
})

app.listen(3000, function () {
  console.log('运行在3000端口上');
})