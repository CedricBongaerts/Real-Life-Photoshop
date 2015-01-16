
/*
@authors:
- Nicolas Laplante https://plus.google.com/108189012221374960701
- Nicholas McCready - https://twitter.com/nmccready
 */


/*
Map Layer directive

This directive is used to create any type of Layer from the google maps sdk.
This directive creates a new scope.

{attribute show optional}  true (default) shows the trafficlayer otherwise it is hidden
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  angular.module('uiGmapgoogle-maps').directive('uiGmapLayer', [
    '$timeout', 'uiGmapLogger', 'uiGmapLayerParentModel', function($timeout, Logger, LayerParentModel) {
      var Layer;
      Layer = (function() {
        function Layer() {
          this.link = __bind(this.link, this);
          this.$log = Logger;
          this.restrict = 'EMA';
          this.require = '^' + 'uiGmapGoogleMap';
          this.priority = -1;
          this.transclude = true;
          this.template = '<span class=\'angular-google-map-layer\' ng-transclude></span>';
          this.replace = true;
          this.scope = {
            show: '=show',
            type: '=type',
            namespace: '=namespace',
            options: '=options',
            onCreated: '&oncreated'
          };
        }

        Layer.prototype.link = function(scope, element, attrs, mapCtrl) {
          return mapCtrl.getScope().deferred.promise.then((function(_this) {
            return function(map) {
              if (scope.onCreated != null) {
                return new LayerParentModel(scope, element, attrs, map, scope.onCreated);
              } else {
                return new LayerParentModel(scope, element, attrs, map);
              }
            };
          })(this));
        };

        return Layer;

      })();
      return new Layer();
    }
  ]);

}).call(this);
