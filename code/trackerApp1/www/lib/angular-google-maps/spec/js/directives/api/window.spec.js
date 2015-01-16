(function() {
  describe("directives.api.Window", function() {
    beforeEach(function() {
      window['uiGmapInitiator'].initMock();
      this.mocks = {
        scope: {
          coords: {
            latitude: 90.0,
            longitude: 89.0
          },
          show: true,
          $watch: function() {},
          $on: function() {},
          control: {},
          $evalAsync: function(fn) {
            return fn();
          }
        },
        element: {
          html: function() {
            return "<p>test html</p>";
          }
        },
        attrs: {
          isiconvisibleonclick: true
        },
        ctrls: [
          {
            getMap: function() {
              return {};
            }
          }
        ]
      };
      this.gmap = {};
      return inject([
        '$rootScope', '$q', '$compile', '$http', '$templateCache', 'uiGmapExtendGWin', 'uiGmapWindow', (function(_this) {
          return function(_$rootScope_, $q, $compile, $http, $templateCache, ExtendGWin, Window) {
            var d;
            ExtendGWin.init();
            _this.$rootScope = _$rootScope_;
            d = $q.defer();
            d.resolve(_this.gmap);
            _this.$rootScope.deferred = d;
            _this.mocks.ctrls[0].getScope = function() {
              return _this.$rootScope;
            };
            _this.windowScope = _.extend(_this.$rootScope.$new(), _this.mocks.scope);
            _this.subject = new Window();
            _this.subject.onChildCreation = function(child) {
              return _this.childWindow = child;
            };
            return _this.prom = d.promise;
          };
        })(this)
      ]);
    });
    it("should test receive the fulfilled promise!!", function() {
      var result;
      result = void 0;
      this.prom.then(function(returnFromPromise) {
        return result = returnFromPromise;
      });
      this.$rootScope.$apply();
      return expect(result).toBe(this.gmap);
    });
    it('can be created', function() {
      return expect(this.subject).toBeDefined();
    });
    it('link creates window options and a childWindow', function() {
      var crap;
      this.subject.link(this.windowScope, this.mocks.element, this.mocks.attrs, this.mocks.ctrls);
      crap = null;
      this.prom.then(function() {
        return crap = "set";
      });
      this.$rootScope.$apply();
      expect(crap).toBe('set');
      expect(this.childWindow).toBeDefined();
      return expect(this.childWindow.opts).toBeDefined();
    });
    it('slaps control functions when a control is available', function() {
      this.subject.link(this.mocks.scope, this.mocks.element, this.mocks.attrs, this.mocks.ctrls);
      this.$rootScope.$apply();
      expect(this.mocks.scope.control.getChildWindows).toBeDefined();
      return expect(this.mocks.scope.control.getGWindows).toBeDefined();
    });
    return it('control functions work', function() {
      this.subject.link(this.mocks.scope, this.mocks.element, this.mocks.attrs, this.mocks.ctrls);
      this.$rootScope.$apply();
      expect(this.mocks.scope.control.getChildWindows().length).toBe(1);
      expect(this.mocks.scope.control.getChildWindows()[0]).toEqual(this.childWindow);
      return expect(this.mocks.scope.control.getGWindows()[0]).toEqual(this.childWindow.gWin);
    });
  });

}).call(this);
