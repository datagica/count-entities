'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _countEntities = require('../../lib/count-entities');

var _countEntities2 = _interopRequireDefault(_countEntities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chai = require('chai');
chai.use(require('chai-fuzzy'));
var expect = chai.expect;

describe('@datagica/count-entities', function () {

  describe('counting entities in the text', function () {
    it('should work', function (done) {

      var tests = [{
        "input": ["foo", "bar", "bar"],
        "output": [{
          id: 'foo',
          value: 'foo',
          count: 1
        }, {
          id: 'bar',
          value: 'bar',
          count: 2
        }]
      }, {
        "input": [{
          "id": "1",
          "name": "foo"
        }, {
          "id": "2",
          "name": "bar"
        }, {
          "id": "2",
          "name": "bar"
        }],
        "output": [{
          id: "1",
          value: {
            "id": "1",
            "name": "foo"
          },
          count: 1
        }, {
          id: "2",
          value: {
            "id": "2",
            "name": "bar"
          },
          count: 2
        }]
      }];
      _promise2.default.all(tests.map(function (test) {
        return (0, _countEntities2.default)(test.input).then(function (output) {
          console.log("actual output: " + JSON.stringify(output));
          console.log("expected output: " + JSON.stringify(test.output));
          expect(output).to.be.like(test.output);
          return _promise2.default.resolve(true);
        });
      })).then(function (ended) {
        console.log('test ended');
        done();
        return true;
      }).catch(function (exc) {
        console.error(exc);
      });
    });
  });
});