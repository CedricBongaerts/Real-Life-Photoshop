(function() {
  angular.module("uiGmapgoogle-maps.directives.api.utils").factory("uiGmapChromeFixes", [
    '$timeout', function($timeout) {
      return {
        maybeRepaint: function(el) {
          if (el) {
            el.style.opacity = 0.9;
            return $timeout(function() {
              return el.style.opacity = 1;
            });
          }
        }
      };
    }
  ]);

}).call(this);
