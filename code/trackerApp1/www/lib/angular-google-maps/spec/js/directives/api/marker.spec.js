(function() {
  describe("uiGmapMarker", function() {
    beforeEach(function() {
      module("uiGmapgoogle-maps.mocks");
      this.mocks = {
        scope: {
          idKey: 0,
          coords: {
            latitude: 90.0,
            longitude: 89.0
          },
          show: true,
          $watch: function() {},
          $on: function() {},
          control: {}
        },
        element: {
          html: function() {
            return "<p>test html</p>";
          }
        },
        attrs: {
          isiconvisibleonclick: true
        },
        ctrl: {
          getMap: function() {
            return {};
          }
        }
      };
      this.timeOutNoW = (function(_this) {
        return function(fnc, time) {
          return fnc();
        };
      })(this);
      return inject([
        'GoogleApiMock', '$rootScope', '$q', 'uiGmapMarker', (function(_this) {
          return function(GoogleApiMock, $rootScope, $q, Marker) {
            var d;
            _this.gmap = new GoogleApiMock();
            _this.gmap.initAll();
            _this.$rootScope = $rootScope;
            d = $q.defer();
            d.resolve({});
            _this.$rootScope.deferred = d;
            _this.mocks.ctrl.getScope = function() {
              return _this.$rootScope;
            };
            _this.mocks.scope.$new = function() {
              return _this.$rootScope.$new();
            };
            _this.mocks.scope.deferred = d;
            return _this.subject = new Marker();
          };
        })(this)
      ]);
    });
    it('can be created', function() {
      return expect(this.subject).toBeDefined();
    });
    return describe("link", function() {
      it('gMarkerManager exists', function() {
        this.subject.link(this.mocks.scope, this.mocks.element, this.mocks.attrs, this.mocks.ctrl);
        this.$rootScope.$apply();
        return expect(this.mocks.scope.control.getGMarkers()).toBeDefined();
      });
      it('slaps control functions when a control is available', function() {
        this.subject.link(this.mocks.scope, this.mocks.element, this.mocks.attrs, this.mocks.ctrl);
        this.$rootScope.$apply();
        return expect(this.mocks.scope.control.getGMarkers).toBeDefined();
      });
      return it('slaps control functions work', function() {
        var fn;
        this.subject.link(this.mocks.scope, this.mocks.element, this.mocks.attrs, this.mocks.ctrl);
        this.$rootScope.$apply();
        fn = this.mocks.scope.control.getGMarkers;
        expect(fn).toBeDefined();
        return expect(fn()[0].key).toEqual(this.mocks.scope.idKey);
      });
    });
  });

}).call(this);
