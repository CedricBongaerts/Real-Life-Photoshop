(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.models.child').factory('uiGmapMarkerChildModel', [
    'uiGmapModelKey', 'uiGmapGmapUtil', 'uiGmapLogger', 'uiGmapEventsHelper', 'uiGmapPropertyAction', 'uiGmapMarkerOptions', 'uiGmapIMarker', 'uiGmapMarkerManager', 'uiGmapPromise', function(ModelKey, GmapUtil, $log, EventsHelper, PropertyAction, MarkerOptions, IMarker, MarkerManager, uiGmapPromise) {
      var MarkerChildModel, keys;
      keys = ['coords', 'icon', 'options', 'fit'];
      MarkerChildModel = (function(_super) {
        var destroy;

        __extends(MarkerChildModel, _super);

        MarkerChildModel.include(GmapUtil);

        MarkerChildModel.include(EventsHelper);

        MarkerChildModel.include(MarkerOptions);

        destroy = function(child) {
          if ((child != null ? child.gMarker : void 0) != null) {
            child.removeEvents(child.externalListeners);
            child.removeEvents(child.internalListeners);
            if (child != null ? child.gMarker : void 0) {
              if (child.removeFromManager) {
                child.gMarkerManager.remove(child.gMarker);
              }
              child.gMarker.setMap(null);
              return child.gMarker = null;
            }
          }
        };

        function MarkerChildModel(scope, model, keys, gMap, defaults, doClick, gMarkerManager, doDrawSelf, trackModel, needRedraw) {
          var action;
          this.model = model;
          this.keys = keys;
          this.gMap = gMap;
          this.defaults = defaults;
          this.doClick = doClick;
          this.gMarkerManager = gMarkerManager;
          this.doDrawSelf = doDrawSelf != null ? doDrawSelf : true;
          this.trackModel = trackModel != null ? trackModel : true;
          this.needRedraw = needRedraw != null ? needRedraw : false;
          this.internalEvents = __bind(this.internalEvents, this);
          this.setLabelOptions = __bind(this.setLabelOptions, this);
          this.setOptions = __bind(this.setOptions, this);
          this.setIcon = __bind(this.setIcon, this);
          this.setCoords = __bind(this.setCoords, this);
          this.isNotValid = __bind(this.isNotValid, this);
          this.maybeSetScopeValue = __bind(this.maybeSetScopeValue, this);
          this.createMarker = __bind(this.createMarker, this);
          this.setMyScope = __bind(this.setMyScope, this);
          this.updateModel = __bind(this.updateModel, this);
          this.handleModelChanges = __bind(this.handleModelChanges, this);
          this.destroy = __bind(this.destroy, this);
          this.clonedModel = _.clone(this.model, true);
          this.deferred = uiGmapPromise.defer();
          _.each(this.keys, (function(_this) {
            return function(v, k) {
              return _this[k + 'Key'] = _.isFunction(_this.keys[k]) ? _this.keys[k]() : _this.keys[k];
            };
          })(this));
          this.idKey = this.idKeyKey || 'id';
          if (this.model[this.idKey] != null) {
            this.id = this.model[this.idKey];
          }
          MarkerChildModel.__super__.constructor.call(this, scope);
          this.scope.getGMarker = (function(_this) {
            return function() {
              return _this.gMarker;
            };
          })(this);
          this.firstTime = true;
          if (this.trackModel) {
            this.scope.model = this.model;
            this.scope.$watch('model', (function(_this) {
              return function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return _this.handleModelChanges(newValue, oldValue);
                }
              };
            })(this), true);
          } else {
            action = new PropertyAction((function(_this) {
              return function(calledKey, newVal) {
                if (!_this.firstTime) {
                  return _this.setMyScope(calledKey, scope);
                }
              };
            })(this), false);
            _.each(this.keys, function(v, k) {
              return scope.$watch(k, action.sic, true);
            });
          }
          this.scope.$on('$destroy', (function(_this) {
            return function() {
              return destroy(_this);
            };
          })(this));
          this.createMarker(this.model);
          $log.info(this);
        }

        MarkerChildModel.prototype.destroy = function(removeFromManager) {
          if (removeFromManager == null) {
            removeFromManager = true;
          }
          this.removeFromManager = removeFromManager;
          return this.scope.$destroy();
        };

        MarkerChildModel.prototype.handleModelChanges = function(newValue, oldValue) {
          var changes, ctr, len;
          changes = this.getChanges(newValue, oldValue, IMarker.keys);
          if (!this.firstTime) {
            ctr = 0;
            len = _.keys(changes).length;
            return _.each(changes, (function(_this) {
              return function(v, k) {
                var doDraw;
                ctr += 1;
                doDraw = len === ctr;
                _this.setMyScope(k, newValue, oldValue, false, true, doDraw);
                return _this.needRedraw = true;
              };
            })(this));
          }
        };

        MarkerChildModel.prototype.updateModel = function(model) {
          this.cloneModel = _.clone(model, true);
          return this.setMyScope('all', model, this.model);
        };

        MarkerChildModel.prototype.renderGMarker = function(doDraw, validCb) {
          var coords;
          if (doDraw == null) {
            doDraw = true;
          }
          coords = this.getProp(this.coordsKey, this.model);
          if (coords != null) {
            if (!this.validateCoords(coords)) {
              $log.debug('MarkerChild does not have coords yet. They may be defined later.');
              return;
            }
            if (validCb != null) {
              validCb();
            }
            if (doDraw && this.gMarker) {
              return this.gMarkerManager.add(this.gMarker);
            }
          } else {
            if (doDraw && this.gMarker) {
              return this.gMarkerManager.remove(this.gMarker);
            }
          }
        };

        MarkerChildModel.prototype.setMyScope = function(thingThatChanged, model, oldModel, isInit, doDraw) {
          var justCreated;
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          if (doDraw == null) {
            doDraw = true;
          }
          if (model == null) {
            model = this.model;
          } else {
            this.model = model;
          }
          if (!this.gMarker) {
            this.setOptions(this.scope, doDraw);
            justCreated = true;
          }
          switch (thingThatChanged) {
            case 'all':
              return _.each(this.keys, (function(_this) {
                return function(v, k) {
                  return _this.setMyScope(k, model, oldModel, isInit, doDraw);
                };
              })(this));
            case 'icon':
              return this.maybeSetScopeValue('icon', model, oldModel, this.iconKey, this.evalModelHandle, isInit, this.setIcon, doDraw);
            case 'coords':
              return this.maybeSetScopeValue('coords', model, oldModel, this.coordsKey, this.evalModelHandle, isInit, this.setCoords, doDraw);
            case 'options':
              if (!justCreated) {
                return this.createMarker(model, oldModel, isInit, doDraw);
              }
          }
        };

        MarkerChildModel.prototype.createMarker = function(model, oldModel, isInit, doDraw) {
          if (oldModel == null) {
            oldModel = void 0;
          }
          if (isInit == null) {
            isInit = false;
          }
          if (doDraw == null) {
            doDraw = true;
          }
          this.maybeSetScopeValue('options', model, oldModel, this.optionsKey, this.evalModelHandle, isInit, this.setOptions, doDraw);
          return this.firstTime = false;
        };

        MarkerChildModel.prototype.maybeSetScopeValue = function(scopePropName, model, oldModel, modelKey, evaluate, isInit, gSetter, doDraw) {
          if (gSetter == null) {
            gSetter = void 0;
          }
          if (doDraw == null) {
            doDraw = true;
          }
          if (gSetter != null) {
            gSetter(this.scope, doDraw);
          }
          if (this.doDrawSelf && doDraw) {
            return this.gMarkerManager.draw();
          }
        };

        MarkerChildModel.prototype.isNotValid = function(scope, doCheckGmarker) {
          var hasIdenticalScopes, hasNoGmarker;
          if (doCheckGmarker == null) {
            doCheckGmarker = true;
          }
          hasNoGmarker = !doCheckGmarker ? false : this.gMarker === void 0;
          hasIdenticalScopes = !this.trackModel ? scope.$id !== this.scope.$id : false;
          return hasIdenticalScopes || hasNoGmarker;
        };

        MarkerChildModel.prototype.setCoords = function(scope, doDraw) {
          if (doDraw == null) {
            doDraw = true;
          }
          if (this.isNotValid(scope) || (this.gMarker == null)) {
            return;
          }
          return this.renderGMarker(doDraw, (function(_this) {
            return function() {
              var newGValue, newModelVal, oldGValue;
              newModelVal = _this.getProp(_this.coordsKey, _this.model);
              newGValue = _this.getCoords(newModelVal);
              oldGValue = _this.gMarker.getPosition();
              if ((oldGValue != null) && (newGValue != null)) {
                if (newGValue.lng() === oldGValue.lng() && newGValue.lat() === oldGValue.lat()) {
                  return;
                }
              }
              _this.gMarker.setPosition(newGValue);
              return _this.gMarker.setVisible(_this.validateCoords(newModelVal));
            };
          })(this));
        };

        MarkerChildModel.prototype.setIcon = function(scope, doDraw) {
          if (doDraw == null) {
            doDraw = true;
          }
          if (this.isNotValid(scope) || (this.gMarker == null)) {
            return;
          }
          return this.renderGMarker(doDraw, (function(_this) {
            return function() {
              var coords, newValue, oldValue;
              oldValue = _this.gMarker.getIcon();
              newValue = _this.getProp('icon', _this.model);
              if (oldValue === newValue) {
                return;
              }
              _this.gMarker.setIcon(newValue);
              coords = _this.getProp('coords', _this.model);
              _this.gMarker.setPosition(_this.getCoords(coords));
              return _this.gMarker.setVisible(_this.validateCoords(coords));
            };
          })(this));
        };

        MarkerChildModel.prototype.setOptions = function(scope, doDraw) {
          var _ref;
          if (doDraw == null) {
            doDraw = true;
          }
          if (this.isNotValid(scope, false)) {
            return;
          }
          this.renderGMarker(doDraw, (function(_this) {
            return function() {
              var coords, icon, _options;
              coords = _this.getProp(_this.coordsKey, _this.model);
              icon = _this.getProp(_this.iconKey, _this.model);
              _options = _this.getProp(_this.optionsKey, _this.model);
              _this.opts = _this.createOptions(coords, icon, _options);
              if (_this.gMarker != null) {
                _this.gMarker.setOptions(_this.opts);
              }
              if (!_this.gMarker) {
                if (_this.isLabel(_this.opts)) {
                  _this.gMarker = new MarkerWithLabel(_this.setLabelOptions(_this.opts));
                } else {
                  _this.gMarker = new google.maps.Marker(_this.opts);
                }
                _.extend(_this.gMarker, {
                  model: _this.model
                });
              }
              if (_this.externalListeners) {
                _this.removeEvents(_this.externalListeners);
              }
              if (_this.internalListeners) {
                _this.removeEvents(_this.internalListeners);
              }
              _this.externalListeners = _this.setEvents(_this.gMarker, _this.scope, _this.model, ['dragend']);
              _this.internalListeners = _this.setEvents(_this.gMarker, {
                events: _this.internalEvents(),
                $evalAsync: function() {}
              }, _this.model);
              if (_this.id != null) {
                return _this.gMarker.key = _this.id;
              }
            };
          })(this));
          if (this.gMarker && (this.gMarker.getMap() || this.gMarkerManager.type !== MarkerManager.type)) {
            this.deferred.resolve(this.gMarker);
          } else {
            if (!this.gMarker) {
              return this.deferred.reject('gMarker is null');
            }
            if (!(((_ref = this.gMarker) != null ? _ref.getMap() : void 0) && this.gMarkerManager.type === MarkerManager.type)) {
              $log.debug('gMarker has no map yet');
              this.deferred.resolve(this.gMarker);
            }
          }
          if (this.model[this.fitKey]) {
            return this.gMarkerManager.fit();
          }
        };

        MarkerChildModel.prototype.setLabelOptions = function(opts) {
          opts.labelAnchor = this.getLabelPositionPoint(opts.labelAnchor);
          return opts;
        };

        MarkerChildModel.prototype.internalEvents = function() {
          return {
            dragend: (function(_this) {
              return function(marker, eventName, model, mousearg) {
                var events, modelToSet, newCoords;
                modelToSet = _this.trackModel ? _this.scope.model : _this.model;
                newCoords = _this.setCoordsFromEvent(_this.modelOrKey(modelToSet, _this.coordsKey), _this.gMarker.getPosition());
                modelToSet = _this.setVal(model, _this.coordsKey, newCoords);
                events = _this.scope.events;
                if ((events != null ? events.dragend : void 0) != null) {
                  events.dragend(marker, eventName, modelToSet, mousearg);
                }
                return _this.scope.$apply();
              };
            })(this),
            click: (function(_this) {
              return function(marker, eventName, model, mousearg) {
                var click;
                click = _.isFunction(_this.clickKey) ? _this.clickKey : _this.getProp(_this.clickKey, _this.model);
                if (_this.doClick && (click != null)) {
                  return _this.scope.$evalAsync(click(marker, eventName, _this.model, mousearg));
                }
              };
            })(this)
          };
        };

        return MarkerChildModel;

      })(ModelKey);
      return MarkerChildModel;
    }
  ]);

}).call(this);
