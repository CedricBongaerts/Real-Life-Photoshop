
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Nick Baugh - https://github.com/niftylettuce
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapGoogleMap", [
    "uiGmapMap", function(Map) {
      return new Map();
    }
  ]);

}).call(this);
