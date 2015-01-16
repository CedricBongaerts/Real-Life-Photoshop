(function() {
  angular.module("uiGmapgoogle-maps.directives.api.utils").service("uiGmapLogger", [
    "$log", function($log) {
      var LEVELS, log, logFns, maybeExecLevel;
      this.doLog = true;
      LEVELS = {
        log: 1,
        info: 2,
        debug: 3,
        warn: 4,
        error: 5,
        none: 6
      };
      maybeExecLevel = function(level, current, fn) {
        if (level >= current) {
          return fn();
        }
      };
      log = function(logLevelFnName, msg) {
        if ($log != null) {
          return $log[logLevelFnName](msg);
        } else {
          return console[logLevelFnName](msg);
        }
      };
      logFns = {};
      ['log', 'info', 'debug', 'warn', 'error'].forEach((function(_this) {
        return function(level) {
          return logFns[level] = function(msg) {
            if (_this.doLog) {
              return maybeExecLevel(LEVELS[level], _this.currentLevel, function() {
                return log(level, msg);
              });
            }
          };
        };
      })(this));
      this.LEVELS = LEVELS;
      this.currentLevel = LEVELS.error;
      this.log = logFns['log'];
      this.info = logFns['info'];
      this.debug = logFns['debug'];
      this.warn = logFns['warn'];
      this.error = logFns['error'];
      return this;
    }
  ]);

}).call(this);
