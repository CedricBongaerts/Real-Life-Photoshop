(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module("uiGmapgoogle-maps.directives.api").factory("uiGmapMarkers", [
    "uiGmapIMarker", "uiGmapPlural", "uiGmapMarkersParentModel", "uiGmap_sync", "uiGmapLogger", function(IMarker, Plural, MarkersParentModel, _sync, $log) {
      var Markers;
      return Markers = (function(_super) {
        __extends(Markers, _super);

        function Markers() {
          Markers.__super__.constructor.call(this);
          this.template = '<span class="angular-google-map-markers" ng-transclude></span>';
          Plural.extend(this, {
            doRebuildAll: '=dorebuildall',
            doCluster: '=docluster',
            clusterOptions: '=clusteroptions',
            clusterEvents: '=clusterevents',
            modelsByRef: '=modelsbyref'
          });
          $log.info(this);
        }

        Markers.prototype.controller = [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'Markers';
            return _.extend(this, IMarker.handle($scope, $element));
          }
        ];

        Markers.prototype.link = function(scope, element, attrs, ctrl) {
          var parentModel, ready;
          parentModel = void 0;
          ready = function() {
            if (scope.control != null) {
              scope.control.getGMarkers = function() {
                var _ref;
                return (_ref = parentModel.gMarkerManager) != null ? _ref.getGMarkers() : void 0;
              };
              scope.control.getChildMarkers = function() {
                return parentModel.markerModels;
              };
            }
            return scope.deferred.resolve();
          };
          return IMarker.mapPromise(scope, ctrl).then(function(map) {
            var mapScope;
            mapScope = ctrl.getScope();
            mapScope.$watch('idleAndZoomChanged', function() {
              return _.defer(parentModel.gMarkerManager.draw);
            });
            parentModel = new MarkersParentModel(scope, element, attrs, map);
            return _.last(parentModel.existingPieces._content).then(function() {
              return ready();
            });
          });
        };

        return Markers;

      })(IMarker);
    }
  ]);

}).call(this);
