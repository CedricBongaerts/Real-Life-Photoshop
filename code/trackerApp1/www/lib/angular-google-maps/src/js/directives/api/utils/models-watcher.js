(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').factory('uiGmapModelsWatcher', [
    'uiGmapLogger', 'uiGmap_async', '$q', 'uiGmapPromise', function(Logger, _async, $q, uiGmapPromise) {
      return {
        didQueueInitPromise: function(existingPiecesObj, scope) {
          if (scope.models.length === 0) {
            _async.promiseLock(existingPiecesObj, uiGmapPromise.promiseTypes.init, null, null, ((function(_this) {
              return function() {
                return uiGmapPromise.resolve();
              };
            })(this)));
            return true;
          }
          return false;
        },
        figureOutState: function(idKey, scope, childObjects, comparison, callBack) {
          var adds, children, mappedScopeModelIds, removals, updates;
          adds = [];
          mappedScopeModelIds = {};
          removals = [];
          updates = [];
          scope.models.forEach(function(m) {
            var child;
            if (m[idKey] != null) {
              mappedScopeModelIds[m[idKey]] = {};
              if (childObjects.get(m[idKey]) == null) {
                return adds.push(m);
              } else {
                child = childObjects.get(m[idKey]);
                if (!comparison(m, child.clonedModel)) {
                  return updates.push({
                    model: m,
                    child: child
                  });
                }
              }
            } else {
              return Logger.error(' id missing for model #{m.toString()},\ncan not use do comparison/insertion');
            }
          });
          children = childObjects.values();
          children.forEach(function(c) {
            var id;
            if (c == null) {
              Logger.error('child undefined in ModelsWatcher.');
              return;
            }
            if (c.model == null) {
              Logger.error('child.model undefined in ModelsWatcher.');
              return;
            }
            id = c.model[idKey];
            if (mappedScopeModelIds[id] == null) {
              return removals.push(c);
            }
          });
          return {
            adds: adds,
            removals: removals,
            updates: updates
          };
        }
      };
    }
  ]);

}).call(this);
