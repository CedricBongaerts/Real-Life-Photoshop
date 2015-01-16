(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapIsReady', [
    '$q', '$timeout', function($q, $timeout) {
      var ctr, promises, proms;
      ctr = 0;
      proms = [];
      promises = function() {
        return $q.all(proms);
      };
      return {
        spawn: function() {
          var d;
          d = $q.defer();
          proms.push(d.promise);
          ctr += 1;
          return {
            instance: ctr,
            deferred: d
          };
        },
        promises: promises,
        instances: function() {
          return ctr;
        },
        promise: function(expect) {
          var d, ohCrap;
          if (expect == null) {
            expect = 1;
          }
          d = $q.defer();
          ohCrap = function() {
            return $timeout(function() {
              if (ctr !== expect) {
                return ohCrap();
              } else {
                return d.resolve(promises());
              }
            });
          };
          ohCrap();
          return d.promise;
        },
        reset: function() {
          ctr = 0;
          return proms.length = 0;
        }
      };
    }
  ]);

}).call(this);
