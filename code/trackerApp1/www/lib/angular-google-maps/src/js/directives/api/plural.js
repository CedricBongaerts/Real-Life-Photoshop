(function() {
  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapPlural', [
    function() {
      return {
        extend: function(obj, obj2) {
          return _.extend(obj.scope || {}, obj2 || {}, {
            idKey: '=idkey',
            doRebuildAll: '=dorebuildall',
            models: '=models',
            chunk: '=chunk'
          });
        }
      };
    }
  ]);

}).call(this);
