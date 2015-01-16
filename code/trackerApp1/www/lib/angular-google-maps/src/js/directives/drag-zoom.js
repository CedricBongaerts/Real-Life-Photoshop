
/*
@authors
Nicholas McCready - https://twitter.com/nmccready
 */

(function() {
  angular.module('uiGmapgoogle-maps').directive('uiGmapDragZoom', [
    'uiGmapDragZoom', function(DragZoom) {
      return DragZoom;
    }
  ]);

}).call(this);
