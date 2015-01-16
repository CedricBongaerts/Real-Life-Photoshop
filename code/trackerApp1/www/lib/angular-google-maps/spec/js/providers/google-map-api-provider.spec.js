(function() {
  describe('uiGmapGoogleMapApiProvider', function() {
    var mapScriptLoader;
    mapScriptLoader = null;
    beforeEach(function() {
      angular.module('mockModule', ['uiGmapgoogle-maps']).config([
        'uiGmapGoogleMapApiProvider', function(GoogleMapApi) {
          return GoogleMapApi.configure({
            china: true
          });
        }
      ]);
      module('uiGmapgoogle-maps', 'mockModule');
      inject(function($injector) {
        return mapScriptLoader = $injector.get('uiGmapMapScriptLoader');
      });
      return window.google = void 0;
    });
    return it('uses maps.google.cn when in china', function() {
      var lastScriptIndex, options;
      options = {
        china: true,
        v: '3.17',
        libraries: '',
        language: 'en',
        sensor: 'false'
      };
      mapScriptLoader.load(options);
      lastScriptIndex = document.getElementsByTagName('script').length - 1;
      return expect(document.getElementsByTagName('script')[lastScriptIndex].src).toContain('http://maps.google.cn/maps/api/js');
    });
  });

}).call(this);
