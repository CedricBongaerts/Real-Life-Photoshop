(function() {
  describe('uiGmapWindowsParentModel', function() {
    return beforeEach(function() {
      angular.mock.module('uiGmapgoogle-maps.directives.api.models.parent');
      return inject([
        '$rootScope', '$timeout', '$compile', '$http', '$templateCache', '$interpolate', (function(_this) {
          return function($rootScope, $timeout, $compile, $http, $templateCache, $interpolate) {
            _this.scope = $rootScope.$new();
            return _this.subject = new WindowsParentModel(_this.scope);
          };
        })(this)
      ]);
    });
  });

}).call(this);
