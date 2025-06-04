var express = require('express');
var prom = require('prom-client');
const register = prom.register;



var app = express();

const client = require('prom-client');
const counter = new client.Counter({
  name: 'class_request_total',
  help: 'Request Counter',
});


app.get('/', function(req, res){
    counter.inc();
    res.send('Hello World!');
});

app.get('/metrics', async function(req, res){
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
})

app.listen(3000);