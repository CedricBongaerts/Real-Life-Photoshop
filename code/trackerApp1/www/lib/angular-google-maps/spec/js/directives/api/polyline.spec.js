(function() {
  describe('uiGmapPolyline', function() {
    var Polyline, allDone, digest, rootScope, timeout;
    allDone = void 0;
    rootScope = null;
    timeout = null;
    Polyline = null;
    digest = (function(_this) {
      return function(fn) {
        fn();
        timeout.flush();
        return rootScope.$apply();
      };
    })(this);
    beforeEach(function() {
      var apiMock;
      apiMock = window['uiGmapInitiator'].initMock().apiMock;
      return inject([
        '$rootScope', '$timeout', '$compile', '$q', 'uiGmapPolyline', (function(_this) {
          return function($rootScope, $timeout, $compile, $q, uiGmapPolyline) {
            rootScope = $rootScope;
            timeout = $timeout;
            _this.compile = $compile;
            Polyline = window.google.maps.Polyline;
            Polyline.resetInstances();
            return _this.subject = uiGmapPolyline;
          };
        })(this)
      ]);
    });
    describe('can create a polyline', function() {
      it('from start', function() {
        var element, html, scope;
        html = "<ui-gmap-google-map draggable=\"true\" center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-polyline ng-repeat=\"i in items\" path=\"i.path\">\n  </ui-gmap-polyline>\n</ui-gmap-google-map>";
        scope = rootScope.$new();
        scope.map = {};
        scope.map.zoom = 12;
        scope.map.center = {
          longitude: 47,
          latitude: -27
        };
        element = this.compile(html)(scope);
        digest((function(_this) {
          return function() {
            var toPush;
            toPush = {};
            toPush.id = 0;
            toPush.path = [
              {
                latitude: 47,
                longitude: -27
              }, {
                latitude: 57,
                longitude: -37
              }
            ];
            return scope.items = [toPush];
          };
        })(this));
        return expect(Polyline.instances).toEqual(1);
      });
      return it('from dynamic lazyUpdate', function(done) {
        var element, html, scope, toPush;
        html = "<ui-gmap-google-map draggable=\"true\" center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-polyline ng-repeat=\"i in items\" path=\"i.path\">\n  </ui-gmap-polyline>\n</ui-gmap-google-map>";
        scope = rootScope.$new();
        scope.map = {};
        scope.map.zoom = 12;
        scope.map.center = {
          longitude: 47,
          latitude: -27
        };
        element = this.compile(html)(scope);
        toPush = {};
        toPush.id = 0;
        toPush.path = [
          {
            latitude: 47,
            longitude: -27
          }, {
            latitude: 57,
            longitude: -37
          }
        ];
        scope.items = [];
        return digest(function() {
          timeout(function() {
            return scope.items.push(toPush);
          }, 250);
          return timeout(function() {
            expect(Polyline.instances).toEqual(1);
            return done();
          }, 400);
        });
      });
    });
    return it('exists', function() {
      return expect(this.subject).toBeDefined();
    });
  });

}).call(this);
