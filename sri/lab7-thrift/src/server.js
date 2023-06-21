const thrift = require('thrift');
const Calculator = require('./gen-nodejs/Calculator');
const types = require('./gen-nodejs/calculator_types');

const server = thrift.createServer(Calculator, {
  calculate: function (calculation, resultFn) {
    if (calculation.operation == types.Operation.ADD) {
      const result = calculation.a + calculation.b;

      resultFn(null, result);
      console.log(`${calculation.a} + ${calculation.b} = ${result}`);
    } else if (calculation.operation == types.Operation.SUBTRACT) {
      const result = calculation.a - calculation.b;

      resultFn(null, result);
      console.log(`${calculation.a} - ${calculation.b} = ${result}`);
    } else if (calculation.operation == types.Operation.MULTIPLY) {
      const result = calculation.a * calculation.b;

      resultFn(null, result);
      console.log(`${calculation.a} * ${calculation.b} = ${result}`);
    } else if (calculation.operation == types.Operation.DIVIDE) {
      if (calculation.b == 0) {
        const error = new types.InvalidOperation({
          operation: calculation.operation,
          reason: 'Cannot divide by zero',
        });

        resultFn(error);
        console.log(`Cannot divide ${calculation.a} by ${calculation.b}`);
        return;
      }

      const result = calculation.a / calculation.b;

      resultFn(null, result);
      console.log(`${calculation.a} / ${calculation.b} = ${result}`);
    }
  },
});

server.listen(9090);
console.log('Server running on port 9090');
