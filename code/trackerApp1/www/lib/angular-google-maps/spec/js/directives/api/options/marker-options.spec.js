(function() {
  describe('marker-options', function() {
    beforeEach(function() {
      module('uiGmapgoogle-maps.directives.api.options');
      module('uiGmapgoogle-maps.mocks');
      return inject([
        'uiGmapMarkerOptions', 'GoogleApiMock', (function(_this) {
          return function(subject, GoogleApiMock) {
            _this.subject = subject;
            _this.gmap = new GoogleApiMock();
            _this.gmap.mockAPI();
            _this.gmap.mockMVCArray();
            _this.gmap.mockPoint();
            _this.gmap.mockLatLng();
            return _this.gmap.mockLatLngBounds();
          };
        })(this)
      ]);
    });
    return describe('should create markers with correct scope', function() {
      it('should create the correct scope on the marker', function() {
        var defaults, latLng, mOpts, options;
        latLng = {
          latitude: 1,
          longitude: 2
        };
        options = {
          visible: true
        };
        defaults = {
          coords: latLng,
          options: options
        };
        mOpts = this.subject.createOptions(latLng, void 0, defaults);
        expect(mOpts.visible).toEqual(defaults.options.visible);
        options.visible = false;
        return expect(mOpts.options.visible).toEqual(defaults.options.visible);
      });
      return it('should respect changes to options', function() {
        var defaults, latLng, mOpts, options;
        latLng = {
          latitude: 1,
          longitude: 2
        };
        options = {
          icon: 'icon'
        };
        defaults = {
          coords: latLng,
          options: options
        };
        mOpts = this.subject.createOptions(latLng, options.icon, defaults);
        expect(mOpts.icon).toEqual(defaults.options.icon);
        options.icon = 'foo';
        return expect(mOpts.options.icon).toEqual(defaults.options.icon);
      });
    });
  });

}).call(this);
