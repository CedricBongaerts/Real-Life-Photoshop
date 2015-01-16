(function() {
  angular.module('uiGmapgoogle-maps.directives.api.utils').service('uiGmapPromise', [
    '$q', '$timeout', 'uiGmapLogger', function($q, $timeout, $log) {
      var ExposedPromise, SniffedPromise, defer, isInProgress, isResolved, promise, promiseStatus, promiseStatuses, promiseTypes, resolve, strPromiseStatuses;
      promiseTypes = {
        create: 'create',
        update: 'update',
        "delete": 'delete',
        init: 'init'
      };
      promiseStatuses = {
        IN_PROGRESS: 0,
        RESOLVED: 1,
        REJECTED: 2
      };
      strPromiseStatuses = (function() {
        var obj;
        obj = {};
        obj["" + promiseStatuses.IN_PROGRESS] = 'in-progress';
        obj["" + promiseStatuses.RESOLVED] = 'resolved';
        obj["" + promiseStatuses.REJECTED] = 'rejected';
        return obj;
      })();
      isInProgress = function(promise) {
        if (promise.$$state) {
          return promise.$$state.status === promiseStatuses.IN_PROGRESS;
        }
        if (!promise.hasOwnProperty("$$v")) {
          return true;
        }
      };
      isResolved = function(promise) {
        if (promise.$$state) {
          return promise.$$state.status === promiseStatuses.RESOLVED;
        }
        if (promise.hasOwnProperty("$$v")) {
          return true;
        }
      };
      promiseStatus = function(status) {
        return strPromiseStatuses[status] || 'done w error';
      };
      ExposedPromise = function(promise) {
        var cancelDeferred, combined, wrapped;
        cancelDeferred = $q.defer();
        combined = $q.all([promise, cancelDeferred.promise]);
        wrapped = $q.defer();
        promise.then(cancelDeferred.resolve, (function() {}), function(notify) {
          cancelDeferred.notify(notify);
          return wrapped.notify(notify);
        });
        combined.then(function(successes) {
          return wrapped.resolve(successes[0] || successes[1]);
        }, function(error) {
          return wrapped.reject(error);
        });
        wrapped.promise.cancel = function(reason) {
          if (reason == null) {
            reason = 'canceled';
          }
          return cancelDeferred.reject(reason);
        };
        wrapped.promise.notify = function(msg) {
          if (msg == null) {
            msg = 'cancel safe';
          }
          wrapped.notify(msg);
          if (promise.hasOwnProperty('notify')) {
            return promise.notify(msg);
          }
        };
        if (promise.promiseType != null) {
          wrapped.promise.promiseType = promise.promiseType;
        }
        return wrapped.promise;
      };
      SniffedPromise = function(fnPromise, promiseType) {
        return {
          promise: fnPromise,
          promiseType: promiseType
        };
      };
      defer = function() {
        return $q.defer();
      };
      resolve = function() {
        var d;
        d = $q.defer();
        d.resolve.apply(void 0, arguments);
        return d.promise;
      };
      promise = function(fnToWrap) {
        var d;
        if (!_.isFunction(fnToWrap)) {
          $log.error("uiGmapPromise.promise() only accepts functions");
          return;
        }
        d = $q.defer();
        $timeout(function() {
          var result;
          result = fnToWrap();
          return d.resolve(result);
        });
        return d.promise;
      };
      return {
        defer: defer,
        promise: promise,
        resolve: resolve,
        promiseTypes: promiseTypes,
        isInProgress: isInProgress,
        isResolved: isResolved,
        promiseStatus: promiseStatus,
        ExposedPromise: ExposedPromise,
        SniffedPromise: SniffedPromise
      };
    }
  ]);

}).call(this);
