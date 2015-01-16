(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolygonChildModel', [
    'uiGmapBasePolyChildModel', 'uiGmapPolygonOptionsBuilder', function(BaseGen, Builder) {
      var PolygonChildModel, base, gFactory;
      gFactory = function(opts) {
        return new google.maps.Polygon(opts);
      };
      base = new BaseGen(Builder, gFactory);
      return PolygonChildModel = (function(_super) {
        __extends(PolygonChildModel, _super);

        function PolygonChildModel() {
          return PolygonChildModel.__super__.constructor.apply(this, arguments);
        }

        return PolygonChildModel;

      })(base);
    }
  ]);

}).call(this);
