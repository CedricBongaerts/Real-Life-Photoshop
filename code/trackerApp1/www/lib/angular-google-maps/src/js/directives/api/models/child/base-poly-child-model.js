(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapBasePolyChildModel', [
    'uiGmapLogger', '$timeout', 'uiGmaparray-sync', 'uiGmapGmapUtil', 'uiGmapEventsHelper', function($log, $timeout, arraySync, GmapUtil, EventsHelper) {
      return function(Builder, gFactory) {
        var BasePolyChildModel;
        return BasePolyChildModel = (function(_super) {
          __extends(BasePolyChildModel, _super);

          BasePolyChildModel.include(GmapUtil);

          BasePolyChildModel.include(EventsHelper);

          function BasePolyChildModel(scope, attrs, map, defaults, model) {
            var create;
            this.scope = scope;
            this.attrs = attrs;
            this.map = map;
            this.defaults = defaults;
            this.model = model;
            this.clean = __bind(this.clean, this);
            this.clonedModel = _.clone(this.model, true);
            this.isDragging = false;
            this.internalEvents = {
              dragend: (function(_this) {
                return function() {
                  return _.defer(function() {
                    return _this.isDragging = false;
                  });
                };
              })(this),
              dragstart: (function(_this) {
                return function() {
                  return _this.isDragging = true;
                };
              })(this)
            };
            create = (function(_this) {
              return function() {
                var pathPoints;
                if (_this.isDragging) {
                  return;
                }
                pathPoints = _this.convertPathPoints(_this.scope.path);
                if (_this.shape != null) {
                  _this.clean();
                }
                if (pathPoints.length > 0) {
                  _this.shape = gFactory(_this.buildOpts(pathPoints));
                }
                if (_this.shape) {
                  if (_this.scope.fit) {
                    _this.extendMapBounds(map, pathPoints);
                  }
                  arraySync(_this.shape.getPath(), _this.scope, 'path', function(pathPoints) {
                    if (_this.scope.fit) {
                      return _this.extendMapBounds(map, pathPoints);
                    }
                  });
                  _this.listeners = _this.model ? _this.setEvents(_this.shape, _this.scope, _this.model) : _this.setEvents(_this.shape, _this.scope, _this.scope);
                  return _this.internalListeners = _this.model ? _this.setEvents(_this.shape, {
                    events: _this.internalEvents
                  }, _this.model) : _this.setEvents(_this.shape, {
                    events: _this.internalEvents
                  }, _this.scope);
                }
              };
            })(this);
            create();
            scope.$watch('path', (function(_this) {
              return function(newValue, oldValue) {
                if (!_.isEqual(newValue, oldValue) || !_this.shape) {
                  return create();
                }
              };
            })(this), true);
            if (!scope["static"] && angular.isDefined(scope.editable)) {
              scope.$watch('editable', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                    return (_ref = _this.shape) != null ? _ref.setEditable(newValue) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.draggable)) {
              scope.$watch('draggable', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                    return (_ref = _this.shape) != null ? _ref.setDraggable(newValue) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.visible)) {
              scope.$watch('visible', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                  }
                  return (_ref = _this.shape) != null ? _ref.setVisible(newValue) : void 0;
                };
              })(this), true);
            }
            if (angular.isDefined(scope.geodesic)) {
              scope.$watch('geodesic', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    newValue = !_this.isFalse(newValue);
                    return (_ref = _this.shape) != null ? _ref.setOptions(_this.buildOpts(_this.shape.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.weight)) {
              scope.$watch('stroke.weight', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.shape) != null ? _ref.setOptions(_this.buildOpts(_this.shape.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.color)) {
              scope.$watch('stroke.color', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.shape) != null ? _ref.setOptions(_this.buildOpts(_this.shape.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.stroke) && angular.isDefined(scope.stroke.opacity)) {
              scope.$watch('stroke.opacity', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.shape) != null ? _ref.setOptions(_this.buildOpts(_this.shape.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            if (angular.isDefined(scope.icons)) {
              scope.$watch('icons', (function(_this) {
                return function(newValue, oldValue) {
                  var _ref;
                  if (newValue !== oldValue) {
                    return (_ref = _this.shape) != null ? _ref.setOptions(_this.buildOpts(_this.shape.getPath())) : void 0;
                  }
                };
              })(this), true);
            }
            scope.$on('$destroy', (function(_this) {
              return function() {
                _this.clean();
                return _this.scope = null;
              };
            })(this));
            if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.color)) {
              scope.$watch('fill.color', (function(_this) {
                return function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    return _this.shape.setOptions(_this.buildOpts(_this.shape.getPath()));
                  }
                };
              })(this));
            }
            if (angular.isDefined(scope.fill) && angular.isDefined(scope.fill.opacity)) {
              scope.$watch('fill.opacity', (function(_this) {
                return function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    return _this.shape.setOptions(_this.buildOpts(_this.shape.getPath()));
                  }
                };
              })(this));
            }
            if (angular.isDefined(scope.zIndex)) {
              scope.$watch('zIndex', (function(_this) {
                return function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                    return _this.shape.setOptions(_this.buildOpts(_this.shape.getPath()));
                  }
                };
              })(this));
            }
            if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
              this.listeners = EventsHelper.setEvents(this.shape, scope, scope);
            }
          }

          BasePolyChildModel.prototype.clean = function() {
            var _ref;
            this.removeEvents(this.listeners);
            this.removeEvents(this.internalListeners);
            if ((_ref = this.shape) != null) {
              _ref.setMap(null);
            }
            return this.shape = null;
          };

          return BasePolyChildModel;

        })(Builder);
      };
    }
  ]);

}).call(this);
