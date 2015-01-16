
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapPolyline", [
    "uiGmapPolyline", function(Polyline) {
      return new Polyline();
    }
  ]);

}).call(this);
