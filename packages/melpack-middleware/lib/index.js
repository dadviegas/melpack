"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MelpackMiddelware = function () {
  function MelpackMiddelware(context, settings) {
    _classCallCheck(this, MelpackMiddelware);

    this.settings = settings || {};
    this.context = context || {};
    this.stack = [];
    this.stackResult = [];

    this.use = this.use.bind(this);
    this.run = this.run.bind(this);
    this.call = this.call.bind(this);
    this.ix = 0;
    this.getIteractor = this.getIteractor.bind(this);
  }

  _createClass(MelpackMiddelware, [{
    key: "createNode",
    value: function createNode(middleware) {
      return {
        id: this.ix++,
        middleware: middleware(this.settings)
      };
    }
  }, {
    key: "getIteractor",
    value: function getIteractor() {
      var _this = this;

      var ix = 0;
      return {
        next: function next() {
          return _this.stack[ix++];
        }
      };
    }
  }, {
    key: "use",
    value: function use(middleware) {
      this.stack.push(this.createNode(middleware));
    }
  }, {
    key: "call",
    value: function call(interactor, callback) {
      var _this2 = this;

      var node = interactor.next();
      node && node.middleware(this.context, function (err) {
        if (!err) {
          _this2.call(interactor);
          _this2.stackResult.push(_this2.context);
        } else {
          return _this2.endCallback({
            error: _this2.stackResult,
            success: false
          });
        }
      });

      !node && this.endCallback(this.context);
    }
  }, {
    key: "run",
    value: function run(cb) {
      this.endCallback = cb || function () {};
      this.call(this.getIteractor());
    }
  }]);

  return MelpackMiddelware;
}();

exports.default = MelpackMiddelware;