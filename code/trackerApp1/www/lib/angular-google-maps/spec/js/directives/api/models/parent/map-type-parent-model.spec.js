(function() {
  describe('uiGmapMapTypeParentModelSpec', function() {
    beforeEach(function() {
      var self;
      window['uiGmapInitiator'].initMock().apiMock;
      angular.module('mockModule', ['uiGmapgoogle-maps', 'uiGmapgoogle-maps.mocks']).value('mapCtrl', {}).value('element', {}).value('attrs', {}).value('model', {}).value('scope', this.scope);
      inject([
        'GoogleApiMock', (function(_this) {
          return function(GoogleApiMock) {
            var mock;
            mock = new GoogleApiMock();
            mock.mockAPI();
            return mock.mockMap();
          };
        })(this)
      ]);
      this.scope = {
        options: {
          blah: true,
          getTileUrl: function() {}
        },
        $watch: function() {},
        $on: function() {}
      };
      this.attrs = {
        id: 'testmaptype',
        options: 'someBoundAttr'
      };
      self = this;
      this.setOpts;
      this.tempMaps = google.maps;
      google.maps.ImageMapType = (function(_this) {
        return function(opts) {
          self.setOpts = opts;
          return {
            getTileUrl: function() {}
          };
        };
      })(this);
      spyOn(google.maps, 'ImageMapType').and.callThrough();
      this.mapCtrl = new window.google.maps.Map();
      this.timeout = (function(_this) {
        return function(fnc, time) {
          return fnc();
        };
      })(this);
      return inject([
        '$rootScope', 'uiGmapMapTypeParentModel', (function(_this) {
          return function($rootScope, MapTypeParentModel) {
            var scope;
            scope = $rootScope.$new();
            _this.constructor = MapTypeParentModel;
            _this.scope = _.extend(_this.scope, scope);
            return _this.subject = new _this.constructor(_this.scope, {}, _this.attrs, _this.mapCtrl);
          };
        })(this)
      ]);
    });
    afterEach(function() {
      return google.maps = this.tempMaps;
    });
    it('constructor is defined', function() {
      return expect(this.constructor).toBeDefined();
    });
    it('options set', function() {
      return expect(this.setOpts.blah).toBe(this.scope.options.blah);
    });
    it('subject is defined', function() {
      return expect(this.subject).toBeDefined();
    });
    return it('maptype is an ImageMapType instance if getTileUrl method is provided', function() {
      return expect(google.maps.ImageMapType).toHaveBeenCalled();
    });
  });

}).call(this);
