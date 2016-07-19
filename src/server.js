var express = require('express')
var path = require('path')
var api = require('./api')

var app = express()

app.set('view engine', 'ejs');

app.get('/test', function(req, res) {
  res.send('Hello, Hot Reload!')
})

app.get('/api', api)

// app.use('/', express.static(path.join(__dirname, 'static')))
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

var server = app.listen(1337, '127.0.0.1', function () {
  var port = server.address().port
  var host = server.address().address
  console.log('Application started at http://' + host + ':' + port)
})

module.exports = app
