(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.parent').factory('uiGmapPolylinesParentModel', [
    '$timeout', 'uiGmapLogger', 'uiGmapModelKey', 'uiGmapModelsWatcher', 'uiGmapPropMap', 'uiGmapPolylineChildModel', 'uiGmap_async', 'uiGmapPromise', function($timeout, $log, ModelKey, ModelsWatcher, PropMap, PolylineChildModel, _async, uiGmapPromise) {
      var PolylinesParentModel;
      return PolylinesParentModel = (function(_super) {
        __extends(PolylinesParentModel, _super);

        PolylinesParentModel.include(ModelsWatcher);

        function PolylinesParentModel(scope, element, attrs, gMap, defaults) {
          var self;
          this.scope = scope;
          this.element = element;
          this.attrs = attrs;
          this.gMap = gMap;
          this.defaults = defaults;
          this.modelKeyComparison = __bind(this.modelKeyComparison, this);
          this.setChildScope = __bind(this.setChildScope, this);
          this.createChild = __bind(this.createChild, this);
          this.pieceMeal = __bind(this.pieceMeal, this);
          this.createAllNew = __bind(this.createAllNew, this);
          this.watchIdKey = __bind(this.watchIdKey, this);
          this.createChildScopes = __bind(this.createChildScopes, this);
          this.watchOurScope = __bind(this.watchOurScope, this);
          this.watchDestroy = __bind(this.watchDestroy, this);
          this.onDestroy = __bind(this.onDestroy, this);
          this.rebuildAll = __bind(this.rebuildAll, this);
          this.doINeedToWipe = __bind(this.doINeedToWipe, this);
          this.watchModels = __bind(this.watchModels, this);
          this.watch = __bind(this.watch, this);
          PolylinesParentModel.__super__.constructor.call(this, scope);
          self = this;
          this.$log = $log;
          this.plurals = new PropMap();
          this.scopePropNames = ['path', 'stroke', 'clickable', 'draggable', 'editable', 'geodesic', 'icons', 'visible'];
          _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              return _this[name + 'Key'] = void 0;
            };
          })(this));
          this.models = void 0;
          this.firstTime = true;
          this.$log.info(this);
          this.watchOurScope(scope);
          this.createChildScopes();
        }

        PolylinesParentModel.prototype.watch = function(scope, name, nameKey) {
          return scope.$watch(name, (function(_this) {
            return function(newValue, oldValue) {
              var maybeCanceled;
              if (newValue !== oldValue) {
                maybeCanceled = null;
                _this[nameKey] = _.isFunction(newValue) ? newValue() : newValue;
                return _async.promiseLock(_this, uiGmapPromise.promiseTypes.update, "watch " + name + " " + nameKey, (function(canceledMsg) {
                  return maybeCanceled = canceledMsg;
                }), function() {
                  return _async.each(_this.plurals.values(), function(model) {
                    model.scope[name] = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
                    return maybeCanceled;
                  }, false);
                });
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchModels = function(scope) {
          return scope.$watchCollection('models', (function(_this) {
            return function(newValue, oldValue) {
              if (!(_.isEqual(newValue, oldValue) && (_this.lastNewValue !== newValue || _this.lastOldValue !== oldValue))) {
                _this.lastNewValue = newValue;
                _this.lastOldValue = oldValue;
                if (_this.doINeedToWipe(newValue)) {
                  return _this.rebuildAll(scope, true, true);
                } else {
                  return _this.createChildScopes(false);
                }
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.doINeedToWipe = function(newValue) {
          var newValueIsEmpty;
          newValueIsEmpty = newValue != null ? newValue.length === 0 : true;
          return this.plurals.length > 0 && newValueIsEmpty;
        };

        PolylinesParentModel.prototype.rebuildAll = function(scope, doCreate, doDelete) {
          return this.onDestroy(doDelete).then((function(_this) {
            return function() {
              if (doCreate) {
                return _this.createChildScopes();
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.onDestroy = function(doDelete) {
          return _async.promiseLock(this, uiGmapPromise.promiseTypes["delete"], void 0, void 0, (function(_this) {
            return function() {
              return _async.each(_this.plurals.values(), function(child) {
                return child.destroy(true);
              }, false).then(function() {
                if (doDelete) {
                  delete _this.plurals;
                }
                return _this.plurals = new PropMap();
              });
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchDestroy = function(scope) {
          return scope.$on('$destroy', (function(_this) {
            return function() {
              return _this.rebuildAll(scope, false, true);
            };
          })(this));
        };

        PolylinesParentModel.prototype.watchOurScope = function(scope) {
          return _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              var nameKey;
              nameKey = name + 'Key';
              _this[nameKey] = typeof scope[name] === 'function' ? scope[name]() : scope[name];
              return _this.watch(scope, name, nameKey);
            };
          })(this));
        };

        PolylinesParentModel.prototype.createChildScopes = function(isCreatingFromScratch) {
          if (isCreatingFromScratch == null) {
            isCreatingFromScratch = true;
          }
          if (angular.isUndefined(this.scope.models)) {
            this.$log.error('No models to create Polylines from! I Need direct models!');
            return;
          }
          if (this.gMap != null) {
            if (this.scope.models != null) {
              this.watchIdKey(this.scope);
              if (isCreatingFromScratch) {
                return this.createAllNew(this.scope, false);
              } else {
                return this.pieceMeal(this.scope, false);
              }
            }
          }
        };

        PolylinesParentModel.prototype.watchIdKey = function(scope) {
          this.setIdKey(scope);
          return scope.$watch('idKey', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue && (newValue == null)) {
                _this.idKey = newValue;
                return _this.rebuildAll(scope, true, true);
              }
            };
          })(this));
        };

        PolylinesParentModel.prototype.createAllNew = function(scope, isArray) {
          var maybeCanceled;
          if (isArray == null) {
            isArray = false;
          }
          this.models = scope.models;
          if (this.firstTime) {
            this.watchModels(scope);
            this.watchDestroy(scope);
          }
          if (this.didQueueInitPromise(this, scope)) {
            return;
          }
          maybeCanceled = null;
          return _async.promiseLock(this, uiGmapPromise.promiseTypes.create, 'createAllNew', (function(canceledMsg) {
            return maybeCanceled = canceledMsg;
          }), (function(_this) {
            return function() {
              return _async.each(scope.models, function(model) {
                _this.createChild(model, _this.gMap);
                if (maybeCanceled) {
                  $log.debug('createNew should fall through safely');
                }
                return maybeCanceled;
              }).then(function() {
                return _this.firstTime = false;
              });
            };
          })(this));
        };

        PolylinesParentModel.prototype.pieceMeal = function(scope, isArray) {
          var maybeCanceled, payload;
          if (isArray == null) {
            isArray = true;
          }
          if (scope.$$destroyed) {
            return;
          }
          maybeCanceled = null;
          payload = null;
          this.models = scope.models;
          if ((scope != null) && (scope.models != null) && scope.models.length > 0 && this.plurals.length > 0) {
            return _async.promiseLock(this, uiGmapPromise.promiseTypes.update, 'pieceMeal', (function(canceledMsg) {
              return maybeCanceled = canceledMsg;
            }), (function(_this) {
              return function() {
                return uiGmapPromise.promise(function() {
                  return _this.figureOutState(_this.idKey, scope, _this.plurals, _this.modelKeyComparison);
                }).then(function(state) {
                  payload = state;
                  return _async.each(payload.removals, function(id) {
                    var child;
                    child = _this.plurals.get(id);
                    if (child != null) {
                      child.destroy();
                      _this.plurals.remove(id);
                      return maybeCanceled;
                    }
                  });
                }).then(function() {
                  return _async.each(payload.adds, function(modelToAdd) {
                    if (maybeCanceled) {
                      $log.debug('pieceMeal should fall through safely');
                    }
                    _this.createChild(modelToAdd, _this.gMap);
                    return maybeCanceled;
                  });
                });
              };
            })(this));
          } else {
            this.inProgress = false;
            return this.rebuildAll(this.scope, true, true);
          }
        };

        PolylinesParentModel.prototype.createChild = function(model, gMap) {
          var child, childScope;
          childScope = this.scope.$new(false);
          this.setChildScope(childScope, model);
          childScope.$watch('model', (function(_this) {
            return function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return _this.setChildScope(childScope, newValue);
              }
            };
          })(this), true);
          childScope["static"] = this.scope["static"];
          child = new PolylineChildModel(childScope, this.attrs, gMap, this.defaults, model);
          if (model[this.idKey] == null) {
            this.$log.error("Polyline model has no id to assign a child to.\nThis is required for performance. Please assign id,\nor redirect id to a different key.");
            return;
          }
          this.plurals.put(model[this.idKey], child);
          return child;
        };

        PolylinesParentModel.prototype.setChildScope = function(childScope, model) {
          _.each(this.scopePropNames, (function(_this) {
            return function(name) {
              var nameKey, newValue;
              nameKey = name + 'Key';
              newValue = _this[nameKey] === 'self' ? model : model[_this[nameKey]];
              if (newValue !== childScope[name]) {
                return childScope[name] = newValue;
              }
            };
          })(this));
          return childScope.model = model;
        };

        PolylinesParentModel.prototype.modelKeyComparison = function(model1, model2) {
          return _.isEqual(this.evalModelHandle(model1, this.scope.path), this.evalModelHandle(model2, this.scope.path));
        };

        return PolylinesParentModel;

      })(ModelKey);
    }
  ]);

}).call(this);
