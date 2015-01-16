(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPolylines', [
    'uiGmapIPolyline', '$timeout', 'uiGmaparray-sync', 'uiGmapPolylinesParentModel', function(IPolyline, $timeout, arraySync, PolylinesParentModel) {
      var Polylines;
      return Polylines = (function(_super) {
        __extends(Polylines, _super);

        function Polylines() {
          this.link = __bind(this.link, this);
          Polylines.__super__.constructor.call(this);
          this.scope.idKey = '=idkey';
          this.scope.models = '=models';
          this.$log.info(this);
        }

        Polylines.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              if (angular.isUndefined(scope.path) || scope.path === null) {
                _this.$log.warn('polylines: no valid path attribute found');
              }
              if (!scope.models) {
                _this.$log.warn('polylines: no models found to create from');
              }
              return new PolylinesParentModel(scope, element, attrs, map, _this.DEFAULTS);
            };
          })(this));
        };

        return Polylines;

      })(IPolyline);
    }
  ]);

}).call(this);
