
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Rick Huizinga - https://plus.google.com/+RickHuizinga
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapPolygons', [
    'uiGmapPolygons', function(Polygons) {
      return new Polygons();
    }
  ]);

}).call(this);
