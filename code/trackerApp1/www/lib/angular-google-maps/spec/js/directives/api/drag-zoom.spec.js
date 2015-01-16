(function() {
  describe('uiGmapDragZoom spec', function() {
    var allDone, digest, mockMap, rootScope, timeout;
    allDone = void 0;
    rootScope = null;
    timeout = null;
    mockMap = null;
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
        '$rootScope', '$timeout', '$compile', '$q', 'uiGmapDragZoom', 'uiGmapGoogleMapApi', (function(_this) {
          return function($rootScope, $timeout, $compile, $q, DragZoom, Api) {
            rootScope = $rootScope;
            timeout = $timeout;
            _this.enableKeyDragZoom = function(opts) {};
            spyOn(_this, 'enableKeyDragZoom');
            mockMap = function() {
              var map;
              map = apiMock.getMap();
              return map.prototype.enableKeyDragZoom = _this.enableKeyDragZoom;
            };
            mockMap();
            _this.compile = $compile;
            return _this.subject = DragZoom;
          };
        })(this)
      ]);
    });
    it('should be called from creation', function(done) {
      var element, html, scope;
      html = "<ui-gmap-google-map draggable=\"true\" center=\"map.center\" zoom=\"map.zoom\">\n    <ui-gmap-drag-zoom keyboardkey=\"'alt'\" spec=\"spec\"></ui-gmap-drag-zoom>\n</ui-gmap-google-map>";
      scope = rootScope.$new();
      scope.items = [];
      scope.map = {};
      scope.map.zoom = 12;
      scope.map.center = {
        longitude: 47,
        latitude: -27
      };
      scope.spec = {
        enableKeyDragZoom: function() {}
      };
      spyOn(scope.spec, 'enableKeyDragZoom');
      element = this.compile(html)(scope);
      return digest((function(_this) {
        return function() {
          return timeout(function() {
            expect(scope.spec.enableKeyDragZoom).toHaveBeenCalled();
            return done();
          }, 300);
        };
      })(this));
    });
    return it('exists', function() {
      return expect(this.subject).toBeDefined();
    });
  });

}).call(this);
