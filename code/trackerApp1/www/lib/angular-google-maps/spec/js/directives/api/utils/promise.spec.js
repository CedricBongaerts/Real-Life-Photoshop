(function() {
  describe('uiGmapPromise', function() {
    var digest, q, rootScope, timeout;
    rootScope = null;
    timeout = null;
    q = null;
    digest = (function(_this) {
      return function(fn, times) {
        if (times == null) {
          times = 1;
        }
        fn();
        if (times) {
          _.range(times).forEach(function() {
            return timeout != null ? timeout.flush() : void 0;
          });
        }
        return rootScope != null ? rootScope.$apply() : void 0;
      };
    })(this);
    beforeEach(function() {
      module('uiGmapgoogle-maps');
      return inject((function(_this) {
        return function(_$rootScope_, $timeout, uiGmapPromise, $q) {
          q = $q;
          rootScope = _$rootScope_;
          timeout = $timeout;
          return _this.subject = uiGmapPromise;
        };
      })(this));
    });
    afterEach(function() {
      rootScope = null;
      return this.subject = null;
    });
    it('exists', function() {
      return expect(this.subject).toBeDefined();
    });
    it('resolves immediately', function(done) {
      return digest((function(_this) {
        return function() {
          return _this.subject.resolve().then(function() {
            return done();
          });
        };
      })(this));
    });
    return describe('ExposedPromise', function() {
      describe('can be notified', function() {
        it('from wrapped', function(done) {
          var d, promise;
          d = q.defer();
          promise = d.promise;
          return digest((function(_this) {
            return function() {
              var cPromise;
              cPromise = _this.subject.ExposedPromise(promise);
              cPromise.then((function() {}), (function() {}), function(notifyMsg) {
                done();
                return expect(notifyMsg).toBe('test');
              });
              return cPromise.notify('test');
            };
          })(this), false);
        });
        return it('from original', function(done) {
          var d, promise;
          d = q.defer();
          promise = d.promise;
          return digest((function(_this) {
            return function() {
              var cPromise;
              cPromise = _this.subject.ExposedPromise(promise);
              cPromise.then((function() {}), (function() {}), function(notifyMsg) {
                done();
                return expect(notifyMsg).toBe('test');
              });
              return d.notify('test');
            };
          })(this), false);
        });
      });
      it('can be canceled', function(done) {
        var cPromise, d, promise;
        d = q.defer();
        promise = d.promise;
        cPromise = null;
        return digest((function(_this) {
          return function() {
            cPromise = _this.subject.ExposedPromise(promise);
            cPromise.cancel('blah');
            return cPromise["catch"](function(notifyMsg) {
              expect(notifyMsg).toBe('blah');
              return done();
            });
          };
        })(this), false);
      });
      return it('original promise resolves combined', function(done) {
        var cPromise, d, promise;
        d = q.defer();
        promise = d.promise;
        cPromise = null;
        return digest((function(_this) {
          return function() {
            cPromise = _this.subject.ExposedPromise(promise);
            d.resolve('winning');
            return cPromise.then(function(msg) {
              expect(msg).toBe('winning');
              return done();
            });
          };
        })(this), false);
      });
    });
  });

}).call(this);
