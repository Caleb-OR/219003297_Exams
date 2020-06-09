var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Student = require('./api/models/StudentListModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mccostic:bestPassw0rd@cluster0-shard-00-00-oh10d.mongodb.net:27017,cluster0-shard-00-01-oh10d.mongodb.net:27017,cluster0-shard-00-02-oh10d.mongodb.net:27017/studentRecords?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var routes = require('./api/routes/StudentListRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('student list RESTful API server started on: ' + port);
