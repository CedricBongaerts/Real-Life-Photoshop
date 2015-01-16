(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarker", [
    "uiGmapIMarker", "uiGmapMarkerChildModel", "uiGmapMarkerManager", "uiGmapLogger", function(IMarker, MarkerChildModel, MarkerManager, $log) {
      var Marker;
      return Marker = (function(_super) {
        __extends(Marker, _super);

        function Marker() {
          this.link = __bind(this.link, this);
          Marker.__super__.constructor.call(this);
          this.template = '<span class="angular-google-map-marker" ng-transclude></span>';
          $log.info(this);
        }

        Marker.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'Marker';
            return _.extend(this, IMarker.handle($scope, $element));
          }
        ];

        Marker.prototype.link = function(scope, element, attrs, ctrl) {
          var mapPromise;
          mapPromise = IMarker.mapPromise(scope, ctrl);
          mapPromise.then((function(_this) {
            return function(map) {
              var doClick, doDrawSelf, gMarkerManager, keys, m, trackModel;
              gMarkerManager = new MarkerManager(map);
              keys = _.object(IMarker.keys, IMarker.keys);
              m = new MarkerChildModel(scope, scope, keys, map, {}, doClick = true, gMarkerManager, doDrawSelf = false, trackModel = false);
              m.deferred.promise.then(function(gMarker) {
                return scope.deferred.resolve(gMarker);
              });
              if (scope.control != null) {
                return scope.control.getGMarkers = gMarkerManager.getGMarkers;
              }
            };
          })(this));
          return scope.$on('$destroy', (function(_this) {
            return function() {
              var gMarkerManager;
              if (typeof gMarkerManager !== "undefined" && gMarkerManager !== null) {
                gMarkerManager.clear();
              }
              return gMarkerManager = null;
            };
          })(this));
        };

        return Marker;

      })(IMarker);
    }
  ]);

}).call(this);
