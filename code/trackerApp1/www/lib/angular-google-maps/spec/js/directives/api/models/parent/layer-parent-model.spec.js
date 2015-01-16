(function() {
  describe('uiGmapLayerParentModelSpec', function() {
    beforeEach(function() {
      var self;
      module('uiGmapgoogle-maps.mocks');
      angular.module('mockModule', ['uiGmapgoogle-maps']).value('mapCtrl', {}).value('element', {}).value('attrs', {}).value('model', {}).value('scope', this.scope);
      module('mockModule');
      inject(function(GoogleApiMock) {
        var mock;
        mock = new GoogleApiMock();
        return mock.mockAPI();
      });
      this.scope = {
        options: {
          blah: true
        },
        $watch: function() {},
        $on: function() {}
      };
      this.attrs = {
        type: 'testLayer',
        options: 'someBoundAttr'
      };
      self = this;
      this.setOpts;
      this.tempMaps = google.maps;
      google.maps.testLayer = (function(_this) {
        return function(opts) {
          self.setOpts = opts;
          return {
            setMap: function() {}
          };
        };
      })(this);
      this.mapCtrl = {};
      this.timeout = (function(_this) {
        return function(fnc, time) {
          return fnc();
        };
      })(this);
      return inject([
        '$rootScope', 'uiGmapLayerParentModel', (function(_this) {
          return function($rootScope, LayerParentModel) {
            var scope;
            scope = $rootScope.$new();
            _this.constructor = LayerParentModel;
            _this.scope = _.extend(_this.scope, scope);
            return _this.subject = new _this.constructor(_this.scope, {}, _this.attrs, _this.mapCtrl);
          };
        })(this)
      ]);
    });
    afterEach(function() {
      return google.map = this.tempMaps;
    });
    it('constructor is defined', function() {
      return expect(this.constructor).toBeDefined();
    });
    it('subject is defined', function() {
      return expect(this.subject).toBeDefined();
    });
    return it('options set', function() {
      return expect(this.setOpts.blah).toBe(this.scope.options.blah);
    });
  });

}).call(this);
