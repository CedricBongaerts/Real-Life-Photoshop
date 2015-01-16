
/*
@authors
Nicolas Laplante - https://plus.google.com/108189012221374960701
Nicholas McCready - https://twitter.com/nmccready
Chentsu Lin - https://github.com/ChenTsuLin
 */

(function() {
  angular.module("uiGmapgoogle-maps").directive("uiGmapRectangle", [
    "uiGmapLogger", "uiGmapRectangle", function($log, Rectangle) {
      return Rectangle;
    }
  ]);

}).call(this);