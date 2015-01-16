(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolylineChildModel', [
    'uiGmapBasePolyChildModel', 'uiGmapPolylineOptionsBuilder', function(BaseGen, Builder) {
      var PolylineChildModel, base, gFactory;
      gFactory = function(opts) {
        return new google.maps.Polyline(opts);
      };
      base = BaseGen(Builder, gFactory);
      return PolylineChildModel = (function(_super) {
        __extends(PolylineChildModel, _super);

        function PolylineChildModel() {
          return PolylineChildModel.__super__.constructor.apply(this, arguments);
        }

        return PolylineChildModel;

      })(base);
    }
  ]);

}).call(this);
