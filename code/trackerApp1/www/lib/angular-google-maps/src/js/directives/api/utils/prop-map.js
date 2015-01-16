
/*
    Simple Object Map with a lenght property to make it easy to track length/size
 */

(function() {
  var propsToPop,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  propsToPop = ['get', 'put', 'remove', 'values', 'keys', 'length', 'push', 'didValueStateChange', 'didKeyStateChange', 'slice', 'removeAll', 'allVals', 'allKeys', 'stateChanged'];

  window.PropMap = (function() {
    function PropMap() {
      this.removeAll = __bind(this.removeAll, this);
      this.slice = __bind(this.slice, this);
      this.push = __bind(this.push, this);
      this.keys = __bind(this.keys, this);
      this.values = __bind(this.values, this);
      this.remove = __bind(this.remove, this);
      this.put = __bind(this.put, this);
      this.stateChanged = __bind(this.stateChanged, this);
      this.get = __bind(this.get, this);
      this.length = 0;
      this.dict = {};
      this.didValsStateChange = false;
      this.didKeysStateChange = false;
      this.allVals = [];
      this.allKeys = [];
    }

    PropMap.prototype.get = function(key) {
      return this.dict[key];
    };

    PropMap.prototype.stateChanged = function() {
      this.didValsStateChange = true;
      return this.didKeysStateChange = true;
    };

    PropMap.prototype.put = function(key, value) {
      if (this.get(key) == null) {
        this.length++;
      }
      this.stateChanged();
      return this.dict[key] = value;
    };

    PropMap.prototype.remove = function(key, isSafe) {
      var value;
      if (isSafe == null) {
        isSafe = false;
      }
      if (isSafe && !this.get(key)) {
        return void 0;
      }
      value = this.dict[key];
      delete this.dict[key];
      this.length--;
      this.stateChanged();
      return value;
    };

    PropMap.prototype.valuesOrKeys = function(str) {
      var keys, vals;
      if (str == null) {
        str = 'Keys';
      }
      if (!this["did" + str + "StateChange"]) {
        return this['all' + str];
      }
      vals = [];
      keys = [];
      _.each(this.dict, function(v, k) {
        vals.push(v);
        return keys.push(k);
      });
      this.didKeysStateChange = false;
      this.didValsStateChange = false;
      this.allVals = vals;
      this.allKeys = keys;
      return this['all' + str];
    };

    PropMap.prototype.values = function() {
      return this.valuesOrKeys('Vals');
    };

    PropMap.prototype.keys = function() {
      return this.valuesOrKeys();
    };

    PropMap.prototype.push = function(obj, key) {
      if (key == null) {
        key = "key";
      }
      return this.put(obj[key], obj);
    };

    PropMap.prototype.slice = function() {
      return this.keys().map((function(_this) {
        return function(k) {
          return _this.remove(k);
        };
      })(this));
    };

    PropMap.prototype.removeAll = function() {
      return this.slice();
    };

    PropMap.prototype.each = function(cb) {
      return _.each(this.dict, function(v, k) {
        return cb(v);
      });
    };

    PropMap.prototype.map = function(cb) {
      return _.map(this.dict, function(v, k) {
        return cb(v);
      });
    };

    return PropMap;

  })();

  angular.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapPropMap", function() {
    return window.PropMap;
  });

}).call(this);
