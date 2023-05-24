/*jslint node: true */
'use strict';

var soap = require('soap');
var express = require('express');
var fs = require('fs');
var dogs = [];

// the splitter function, used by the service
function splitterFunction(args) {
  console.log('splitter_function');
  var splitter = args.splitter;
  var splitted_msg = args.message.split(splitter);
  var result = [];
  for (var i = 0; i < splitted_msg.length; i++) {
    result.push(splitted_msg[i]);
  }
  return {
    result: result,
  };
}

function addDog(args) {
  dogs.push({
    name: args.name,
    age: args.age,
  });
  return {
    result: `Added dog ${args.name} with age ${args.age}`,
  };
}

function viewDogs(args) {
  return {
    result: dogs,
  };
}

// the service
var serviceObject = {
  AppService: {
    AppServiceSoapPort: {
      MessageSplitter: splitterFunction,
      AddDog: addDog,
      ViewDogs: viewDogs,
    },
  },
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
});

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = '/wsdl';
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log('Check http://localhost:' + port + wsdl_path + '?wsdl to see if the service is working');
});
