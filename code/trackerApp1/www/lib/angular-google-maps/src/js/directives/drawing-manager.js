(function() {
  angular.module('uiGmapgoogle-maps').directive("uiGmapDrawingManager", [
    "uiGmapDrawingManager", function(DrawingManager) {
      return DrawingManager;
    }
  ]);

}).call(this);
