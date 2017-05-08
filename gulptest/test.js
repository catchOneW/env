var assert = require("assert");
var rest = require("restler");//用来请求API接口的中间件
//var apiCtrl = require('../controllers/api');//api模块

var baseUrl = 'http://localhost:9000/api';
describe('this is description', function () {
  it('this is assert', function (done) {
    rest.get(baseUrl + '/testAPI/1').on('success', function (res) {
      assert(res.result === 1);
      done();
    });
  });
});