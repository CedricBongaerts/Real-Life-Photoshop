
/*
@authors
Nicholas McCready - https://twitter.com/nmccready
 * Brunt of the work is in DrawFreeHandChildModel
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapFreeDrawPolygons', [
    'uiGmapApiFreeDrawPolygons', function(FreeDrawPolygons) {
      return new FreeDrawPolygons();
    }
  ]);

}).call(this);
