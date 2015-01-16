(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.utils').factory('uiGmapModelKey', [
    'uiGmapBaseObject', 'uiGmapGmapUtil', 'uiGmapPromise', '$q', '$timeout', function(BaseObject, GmapUtil, uiGmapPromise, $q, $timeout) {
      var ModelKey;
      return ModelKey = (function(_super) {
        __extends(ModelKey, _super);

        function ModelKey(scope) {
          this.scope = scope;
          this.destroy = __bind(this.destroy, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.getChanges = __bind(this.getChanges, this);
          this.getProp = __bind(this.getProp, this);
          this.setIdKey = __bind(this.setIdKey, this);
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          ModelKey.__super__.constructor.call(this);
          this.defaultIdKey = 'id';
          this.idKey = void 0;
        }

        ModelKey.prototype.evalModelHandle = function(model, modelKey) {
          if (model === void 0 || modelKey === void 0) {
            return void 0;
          }
          if (modelKey === 'self') {
            return model;
          } else {
            return GmapUtil.getPath(model, modelKey);
          }
        };

        ModelKey.prototype.modelKeyComparison = function(model1, model2) {
          var scope;
          scope = this.scope.coords != null ? this.scope : this.parentScope;
          if (scope == null) {
            throw 'No scope or parentScope set!';
          }
          return GmapUtil.equalCoords(this.evalModelHandle(model1, scope.coords), this.evalModelHandle(model2, scope.coords));
        };

        ModelKey.prototype.setIdKey = function(scope) {
          return this.idKey = scope.idKey != null ? scope.idKey : this.defaultIdKey;
        };

        ModelKey.prototype.setVal = function(model, key, newValue) {
          var thingToSet;
          thingToSet = this.modelOrKey(model, key);
          thingToSet = newValue;
          return model;
        };

        ModelKey.prototype.modelOrKey = function(model, key) {
          if (key == null) {
            return;
          }
          if (key !== 'self') {
            return model[key];
          }
          return model;
        };

        ModelKey.prototype.getProp = function(propName, model) {
          return this.modelOrKey(model, propName);
        };


        /*
        For the cases were watching a large object we only want to know the list of props
        that actually changed.
        Also we want to limit the amount of props we analyze to whitelisted props that are
        actually tracked by scope. (should make things faster with whitelisted)
         */

        ModelKey.prototype.getChanges = function(now, prev, whitelistedProps) {
          var c, changes, prop;
          if (whitelistedProps) {
            prev = _.pick(prev, whitelistedProps);
            now = _.pick(now, whitelistedProps);
          }
          changes = {};
          prop = {};
          c = {};
          for (prop in now) {
            if (!prev || prev[prop] !== now[prop]) {
              if (_.isArray(now[prop])) {
                changes[prop] = now[prop];
              } else if (_.isObject(now[prop])) {
                c = this.getChanges(now[prop], (prev ? prev[prop] : null));
                if (!_.isEmpty(c)) {
                  changes[prop] = c;
                }
              } else {
                changes[prop] = now[prop];
              }
            }
          }
          return changes;
        };

        ModelKey.prototype.scopeOrModelVal = function(key, scope, model, doWrap) {
          var maybeWrap, modelKey, modelProp, scopeProp;
          if (doWrap == null) {
            doWrap = false;
          }
          maybeWrap = function(isScope, ret, doWrap) {
            if (doWrap == null) {
              doWrap = false;
            }
            if (doWrap) {
              return {
                isScope: isScope,
                value: ret
              };
            }
            return ret;
          };
          scopeProp = scope[key];
          if (_.isFunction(scopeProp)) {
            return maybeWrap(true, scopeProp(model), doWrap);
          }
          if (_.isObject(scopeProp)) {
            return maybeWrap(true, scopeProp, doWrap);
          }
          if (!_.isString(scopeProp)) {
            return maybeWrap(true, scopeProp, doWrap);
          }
          modelKey = scopeProp;
          if (!modelKey) {
            modelProp = model[key];
          } else {
            modelProp = modelKey === 'self' ? model : model[modelKey];
          }
          if (_.isFunction(modelProp)) {
            return maybeWrap(false, modelProp(), doWrap);
          }
          return maybeWrap(false, modelProp, doWrap);
        };

        ModelKey.prototype.setChildScope = function(keys, childScope, model) {
          _.each(keys, (function(_this) {
            return function(name) {
              var isScopeObj, newValue;
              isScopeObj = _this.scopeOrModelVal(name, childScope, model, true);
              if (!isScopeObj.isScope) {
                newValue = isScopeObj.value;
                if (newValue !== childScope[name]) {
                  return childScope[name] = newValue;
                }
              }
            };
          })(this));
          return childScope.model = model;
        };

        ModelKey.prototype.destroy = function(manualOverride) {
          var _ref;
          if (manualOverride == null) {
            manualOverride = false;
          }
          if ((this.scope != null) && !((_ref = this.scope) != null ? _ref.$$destroyed : void 0) && (this.needToManualDestroy || manualOverride)) {
            return this.scope.$destroy();
          } else {
            return this.clean();
          }
        };

        return ModelKey;

      })(BaseObject);
    }
  ]);

}).call(this);
