(function() {
  describe('ModelKey Tests', function() {
    beforeEach(function() {
      angular.mock.module('uiGmapgoogle-maps.directives.api.utils');
      return inject([
        '$rootScope', 'uiGmapModelKey', (function(_this) {
          return function($rootScope, ModelKey) {
            _this.scope = $rootScope.$new();
            return _this.subject = new ModelKey(_this.scope);
          };
        })(this)
      ]);
    });
    it('should eval model handle correctly', function() {
      var model;
      model = {
        key: 'key',
        sub: {
          foo: 'bar'
        }
      };
      expect(this.subject.evalModelHandle()).toEqual(void 0);
      expect(this.subject.evalModelHandle(model, 'self')).toEqual(model);
      expect(this.subject.evalModelHandle(model, 'key')).toEqual('key');
      expect(this.subject.evalModelHandle(model, 'foo')).toEqual(void 0);
      return expect(this.subject.evalModelHandle(model, 'sub.foo')).toEqual('bar');
    });
    it('should properly compare models', function() {
      var model1, model2, model3;
      model1 = {
        coords: {
          latitude: 41,
          longitude: -27
        }
      };
      model2 = {
        coords: {
          latitude: 40,
          longitude: -27
        }
      };
      model3 = {
        coords: {
          type: 'Point',
          coordinates: [-27, 40]
        }
      };
      expect(this.subject.modelKeyComparison).toThrow('No scope or parentScope set!');
      this.scope.coords = 'coords';
      expect(this.subject.modelKeyComparison(model1, model1)).toEqual(true);
      expect(this.subject.modelKeyComparison(model1, model2)).toEqual(false);
      return expect(this.subject.modelKeyComparison(model2, model3)).toEqual(true);
    });
    return it('should properly set id key', function() {
      expect(this.subject.idKey).toEqual(void 0);
      expect(this.subject.setIdKey(this.scope)).toEqual('id');
      this.scope.idKey = 'foo';
      return expect(this.subject.setIdKey(this.scope)).toEqual('foo');
    });
  });

}).call(this);
