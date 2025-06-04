var express = require('express');
var prom = require('prom-client');
const register = prom.register;



var app = express();

const client = require('prom-client');

const counter = new prom.Counter({
  name: 'class_request_total',
  help: 'Request Counter',
  labelNames: ['statusCode']
});

const gauge = new prom.Gauge({ 
  name: 'class_free_bytes', 
  help: 'Gauge example' 
});

const histogram = new prom.Histogram({
  name: 'class_request_time_seconds',
  help: 'APIs Response time',
  buckets: [0.1, 0.2, 0.3, 0.4, 0.5],
});

const summary = new prom.Summary({
  name: 'class_summary_request_time_seconds',
  help: 'API request time',
  percentiles: [0.5, 0.9, 0.99],
});


app.get('/', function(req, res){
    counter.labels('200').inc();
    counter.labels('300').inc();
    counter.labels('400').inc();
    gauge.set(10*Math.random());
    const time = Math.random();
    histogram.observe(time);
    summary.observe(time);


    res.send('Hello World!');
});

app.get('/metrics', async function(req, res){
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
})

app.listen(3000);