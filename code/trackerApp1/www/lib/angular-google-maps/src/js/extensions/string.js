(function() {
  angular.module('uiGmapgoogle-maps.extensions').factory('uiGmapString', function() {
    return function(str) {
      this.contains = function(value, fromIndex) {
        return str.indexOf(value, fromIndex) !== -1;
      };
      return this;
    };
  });

}).call(this);
