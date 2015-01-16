(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.options.builders').factory('uiGmapPolylineOptionsBuilder', [
    'uiGmapCommonOptionsBuilder', function(CommonOptionsBuilder) {
      var PolylineOptionsBuilder;
      return PolylineOptionsBuilder = (function(_super) {
        __extends(PolylineOptionsBuilder, _super);

        function PolylineOptionsBuilder() {
          return PolylineOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        PolylineOptionsBuilder.prototype.buildOpts = function(pathPoints) {
          return PolylineOptionsBuilder.__super__.buildOpts.call(this, {
            path: pathPoints
          }, {
            geodesic: false
          });
        };

        return PolylineOptionsBuilder;

      })(CommonOptionsBuilder);
    }
  ]).factory('uiGmapShapeOptionsBuilder', [
    'uiGmapCommonOptionsBuilder', function(CommonOptionsBuilder) {
      var ShapeOptionsBuilder;
      return ShapeOptionsBuilder = (function(_super) {
        __extends(ShapeOptionsBuilder, _super);

        function ShapeOptionsBuilder() {
          return ShapeOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        ShapeOptionsBuilder.prototype.buildOpts = function(customOpts, forEachOpts) {
          var fill, model;
          model = this.hasModel ? this.scope.model : this.scope;
          fill = this.scopeOrModelVal('fill', this.scope, model);
          customOpts = angular.extend(customOpts, {
            fillColor: fill != null ? fill.color : void 0,
            fillOpacity: fill != null ? fill.opacity : void 0
          });
          return ShapeOptionsBuilder.__super__.buildOpts.call(this, customOpts, forEachOpts);
        };

        return ShapeOptionsBuilder;

      })(CommonOptionsBuilder);
    }
  ]).factory('uiGmapPolygonOptionsBuilder', [
    'uiGmapShapeOptionsBuilder', function(ShapeOptionsBuilder) {
      var PolygonOptionsBuilder;
      return PolygonOptionsBuilder = (function(_super) {
        __extends(PolygonOptionsBuilder, _super);

        function PolygonOptionsBuilder() {
          return PolygonOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        PolygonOptionsBuilder.prototype.buildOpts = function(pathPoints) {
          return PolygonOptionsBuilder.__super__.buildOpts.call(this, {
            path: pathPoints
          }, {
            geodesic: false
          });
        };

        return PolygonOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]).factory('uiGmapRectangleOptionsBuilder', [
    'uiGmapShapeOptionsBuilder', function(ShapeOptionsBuilder) {
      var RectangleOptionsBuilder;
      return RectangleOptionsBuilder = (function(_super) {
        __extends(RectangleOptionsBuilder, _super);

        function RectangleOptionsBuilder() {
          return RectangleOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        RectangleOptionsBuilder.prototype.buildOpts = function(bounds) {
          return RectangleOptionsBuilder.__super__.buildOpts.call(this, {
            bounds: bounds
          });
        };

        return RectangleOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]).factory('uiGmapCircleOptionsBuilder', [
    'uiGmapShapeOptionsBuilder', function(ShapeOptionsBuilder) {
      var CircleOptionsBuilder;
      return CircleOptionsBuilder = (function(_super) {
        __extends(CircleOptionsBuilder, _super);

        function CircleOptionsBuilder() {
          return CircleOptionsBuilder.__super__.constructor.apply(this, arguments);
        }

        CircleOptionsBuilder.prototype.buildOpts = function(center, radius) {
          return CircleOptionsBuilder.__super__.buildOpts.call(this, {
            center: center,
            radius: radius
          });
        };

        return CircleOptionsBuilder;

      })(ShapeOptionsBuilder);
    }
  ]);

}).call(this);
