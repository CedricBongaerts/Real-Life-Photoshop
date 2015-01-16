(function() {
  describe("uiGmapSearchBoxParentModelSpec", function() {
    beforeEach(function() {
      module("uiGmapgoogle-maps.mocks");
      module('uiGmapgoogle-maps');
      module("uiGmapgoogle-maps.directives.api.utils");
      inject(function($templateCache) {
        return $templateCache.put('searchbox.tpl.html', '<input placeholder="Search Box">');
      });
      return inject([
        '$rootScope', 'GoogleApiMock', '$compile', 'uiGmapSearchBoxParentModel', (function(_this) {
          return function($rootScope, GoogleApiMock, $compile, SearchBoxParentModel) {
            _this.rootScope = $rootScope;
            _this.apiMock = new GoogleApiMock();
            _this.compile = $compile;
            _this.apiMock.mockAPI();
            _this.apiMock.mockMap();
            _this.apiMock.mockPlaces();
            _this.apiMock.mockSearchBox();
            return _this.subject = SearchBoxParentModel;
          };
        })(this)
      ]);
    });
    it("should add a searchbox", function() {
      var element, html, scope;
      html = "<ui-gmap-google-map draggable=\"true\" center=\"map.center\" zoom=\"map.zoom\">\n    <ui-gmap-search-box template=\"searchbox.tpl.html\"></ui-gmap-search-box>\n</ui-gmap-google-map>";
      scope = this.rootScope.$new();
      scope.map = {};
      scope.map.zoom = 12;
      scope.map.center = {
        longitude: 47,
        latitude: -27
      };
      return element = this.compile(html)(scope);
    });
    return it("exists", function() {
      return expect(this.subject).toBeDefined();
    });
  });

}).call(this);
