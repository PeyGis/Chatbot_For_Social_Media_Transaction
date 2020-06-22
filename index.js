/**
 *@author Pages Coffie
 *@version Version 1.0
 *Created at 2018/07/15
 *Nsano Move-Bot Project
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var webhook_router = require('./router/webhook_router');
var path = require('path');
var app = express();

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({   
	extended: true
}));
app.use(cors());

app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));

app.use(webhook_router);

app.listen((process.env.PORT || 3000), function() {
console.log('Listening on port 3000...')
});