const thrift = require('thrift');
const Calculator = require('./gen-nodejs/Calculator');
const types = require('./gen-nodejs/calculator_types');

const transport = thrift.TBufferedTransport;
const protocol = thrift.TBinaryProtocol;
const connection = thrift.createConnection('localhost', 9090, {
  transport: transport,
  protocol: protocol,
});

const client = thrift.createClient(Calculator, connection);

const calculationAdd = new types.Calculation({
  operation: types.Operation.ADD,
  a: 10,
  b: 5,
});

const calculationSubtract = new types.Calculation({
  operation: types.Operation.SUBTRACT,
  a: 10,
  b: 5,
});

const calculationMultiply = new types.Calculation({
  operation: types.Operation.MULTIPLY,
  a: 10,
  b: 5,
});

const calculationDivide = new types.Calculation({
  operation: types.Operation.DIVIDE,
  a: 10,
  b: 5,
});

const calculationDivideInvalid = new types.Calculation({
  operation: types.Operation.DIVIDE,
  a: 10,
  b: 0,
});

const calculations = [
  calculationAdd,
  calculationSubtract,
  calculationMultiply,
  calculationDivide,
  calculationDivideInvalid,
];

calculations.forEach((calculation) => {
  client
    .calculate(calculation)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(`Received error from server: ${error}`);
    });
});
