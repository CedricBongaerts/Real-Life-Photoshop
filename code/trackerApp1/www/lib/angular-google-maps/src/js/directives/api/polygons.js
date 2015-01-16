(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolygons', [
    'uiGmapIPolygon', '$timeout', 'uiGmaparray-sync', 'uiGmapPolygonsParentModel', 'uiGmapPlural', function(Interface, $timeout, arraySync, ParentModel, Plural) {
      var Polygons;
      return Polygons = (function(_super) {
        __extends(Polygons, _super);

        function Polygons() {
          this.link = __bind(this.link, this);
          Polygons.__super__.constructor.call(this);
          Plural.extend(this);
          this.$log.info(this);
        }

        Polygons.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              var parent;
              if (angular.isUndefined(scope.path) || scope.path === null) {
                _this.$log.warn('polygons: no valid path attribute found');
              }
              if (!scope.models) {
                _this.$log.warn('polygons: no models found to create from');
              }
              parent = null;
              if (scope.control != null) {
                scope.control.updateModels = function(models) {
                  scope.models = models;
                  return parent.createChildScopes(false);
                };
                scope.control.newModels = function(models) {
                  scope.models = models;
                  return parent.rebuildAll(scope, true, true);
                };
                scope.control.clean = function() {
                  return parent.rebuildAll(scope, false, true);
                };
              }
              return parent = new ParentModel(scope, element, attrs, map, _this.DEFAULTS);
            };
          })(this));
        };

        return Polygons;

      })(Interface);
    }
  ]);

}).call(this);
