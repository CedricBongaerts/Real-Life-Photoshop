(function() {
  angular.module('uiGmapgoogle-maps.directives.api').service('uiGmapDragZoom', [
    'uiGmapCtrlHandle', 'uiGmapPropertyAction', function(CtrlHandle, PropertyAction) {
      return {
        restrict: 'EMA',
        transclude: true,
        template: '<div class="angular-google-map-dragzoom" ng-transclude style="display: none"></div>',
        require: '^' + 'uiGmapGoogleMap',
        scope: {
          keyboardkey: '=',
          options: '=',
          spec: '='
        },
        controller: [
          '$scope', '$element', function($scope, $element) {
            $scope.ctrlType = 'uiGmapDragZoom';
            return _.extend(this, CtrlHandle.handle($scope, $element));
          }
        ],
        link: function(scope, element, attrs, ctrl) {
          return CtrlHandle.mapPromise(scope, ctrl).then(function(map) {
            var enableKeyDragZoom, setKeyAction, setOptionsAction;
            enableKeyDragZoom = function(opts) {
              map.enableKeyDragZoom(opts);
              if (scope.spec) {
                return scope.spec.enableKeyDragZoom(opts);
              }
            };
            setKeyAction = new PropertyAction(function(key, newVal) {
              if (newVal) {
                return enableKeyDragZoom({
                  key: newVal
                });
              } else {
                return enableKeyDragZoom();
              }
            });
            setOptionsAction = new PropertyAction(function(key, newVal) {
              if (newVal) {
                return enableKeyDragZoom(newVal);
              }
            });
            scope.$watch('keyboardkey', setKeyAction.sic);
            setKeyAction.sic(scope.keyboardkey);
            scope.$watch('options', setOptionsAction.sic);
            return setOptionsAction.sic(scope.options);
          });
        }
      };
    }
  ]);

}).call(this);
