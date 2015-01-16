(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api').factory('uiGmapMap', [
    '$timeout', '$q', 'uiGmapLogger', 'uiGmapGmapUtil', 'uiGmapBaseObject', 'uiGmapCtrlHandle', 'uiGmapIsReady', 'uiGmapuuid', 'uiGmapExtendGWin', 'uiGmapExtendMarkerClusterer', 'uiGmapGoogleMapsUtilV3', 'uiGmapGoogleMapApi', 'uiGmapEventsHelper', function($timeout, $q, $log, GmapUtil, BaseObject, CtrlHandle, IsReady, uuid, ExtendGWin, ExtendMarkerClusterer, GoogleMapsUtilV3, GoogleMapApi, EventsHelper) {
      'use strict';
      var DEFAULTS, Map, initializeItems;
      DEFAULTS = void 0;
      initializeItems = [GoogleMapsUtilV3, ExtendGWin, ExtendMarkerClusterer];
      return Map = (function(_super) {
        __extends(Map, _super);

        Map.include(GmapUtil);

        function Map() {
          this.link = __bind(this.link, this);
          var ctrlFn, self;
          ctrlFn = function($scope) {
            var ctrlObj, retCtrl;
            retCtrl = void 0;
            $scope.$on('$destroy', function() {
              return IsReady.reset();
            });
            ctrlObj = CtrlHandle.handle($scope);
            $scope.ctrlType = 'Map';
            $scope.deferred.promise.then(function() {
              return initializeItems.forEach(function(i) {
                return i.init();
              });
            });
            ctrlObj.getMap = function() {
              return $scope.map;
            };
            retCtrl = _.extend(this, ctrlObj);
            return retCtrl;
          };
          this.controller = ['$scope', ctrlFn];
          self = this;
        }

        Map.prototype.restrict = 'EMA';

        Map.prototype.transclude = true;

        Map.prototype.replace = false;

        Map.prototype.template = '<div class="angular-google-map"><div class="angular-google-map-container"></div><div ng-transclude style="display: none"></div></div>';

        Map.prototype.scope = {
          center: '=',
          zoom: '=',
          dragging: '=',
          control: '=',
          options: '=',
          events: '=',
          eventOpts: '=',
          styles: '=',
          bounds: '=',
          update: '='
        };

        Map.prototype.link = function(scope, element, attrs) {
          var listeners, unbindCenterWatch;
          listeners = [];
          scope.$on('$destroy', function() {
            return EventsHelper.removeEvents(listeners);
          });
          scope.idleAndZoomChanged = false;
          if (scope.center == null) {
            unbindCenterWatch = scope.$watch('center', (function(_this) {
              return function() {
                if (!scope.center) {
                  return;
                }
                unbindCenterWatch();
                return _this.link(scope, element, attrs);
              };
            })(this));
            return;
          }
          return GoogleMapApi.then((function(_this) {
            return function(maps) {
              var customListeners, disabledEvents, dragging, el, eventName, getEventHandler, mapOptions, maybeHookToEvent, opts, resolveSpawned, settingCenterFromDirective, settingCenterFromScope, settingZoomFromDirective, settingZoomFromScope, spawned, type, _gMap, _ref;
              DEFAULTS = {
                mapTypeId: maps.MapTypeId.ROADMAP
              };
              spawned = IsReady.spawn();
              resolveSpawned = function() {
                return spawned.deferred.resolve({
                  instance: spawned.instance,
                  map: _gMap
                });
              };
              if (!_this.validateCoords(scope.center)) {
                $log.error('angular-google-maps: could not find a valid center property');
                return;
              }
              if (!angular.isDefined(scope.zoom)) {
                $log.error('angular-google-maps: map zoom property not set');
                return;
              }
              el = angular.element(element);
              el.addClass('angular-google-map');
              opts = {
                options: {}
              };
              if (attrs.options) {
                opts.options = scope.options;
              }
              if (attrs.styles) {
                opts.styles = scope.styles;
              }
              if (attrs.type) {
                type = attrs.type.toUpperCase();
                if (google.maps.MapTypeId.hasOwnProperty(type)) {
                  opts.mapTypeId = google.maps.MapTypeId[attrs.type.toUpperCase()];
                } else {
                  $log.error("angular-google-maps: invalid map type '" + attrs.type + "'");
                }
              }
              mapOptions = angular.extend({}, DEFAULTS, opts, {
                center: _this.getCoords(scope.center),
                zoom: scope.zoom,
                bounds: scope.bounds
              });
              _gMap = new google.maps.Map(el.find('div')[1], mapOptions);
              _gMap['uiGmap_id'] = uuid.generate();
              dragging = false;
              listeners.push(google.maps.event.addListenerOnce(_gMap, 'idle', function() {
                scope.deferred.resolve(_gMap);
                return resolveSpawned();
              }));
              disabledEvents = attrs.events && (((_ref = scope.events) != null ? _ref.blacklist : void 0) != null) ? scope.events.blacklist : [];
              if (_.isString(disabledEvents)) {
                disabledEvents = [disabledEvents];
              }
              maybeHookToEvent = function(eventName, fn, prefn) {
                if (!_.contains(disabledEvents, eventName)) {
                  if (prefn) {
                    prefn();
                  }
                  return listeners.push(google.maps.event.addListener(_gMap, eventName, function() {
                    var _ref1;
                    if (!((_ref1 = scope.update) != null ? _ref1.lazy : void 0)) {
                      return fn();
                    }
                  }));
                }
              };
              if (!_.contains(disabledEvents, 'all')) {
                maybeHookToEvent('dragstart', function() {
                  dragging = true;
                  return scope.$evalAsync(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
                maybeHookToEvent('dragend', function() {
                  dragging = false;
                  return scope.$evalAsync(function(s) {
                    if (s.dragging != null) {
                      return s.dragging = dragging;
                    }
                  });
                });
                maybeHookToEvent('drag', function() {
                  var c, _ref1, _ref2, _ref3;
                  c = _gMap.center;
                  return $timeout(function() {
                    var s;
                    s = scope;
                    if (angular.isDefined(s.center.type)) {
                      s.center.coordinates[1] = c.lat();
                      return s.center.coordinates[0] = c.lng();
                    } else {
                      s.center.latitude = c.lat();
                      return s.center.longitude = c.lng();
                    }
                  }, (_ref1 = scope.eventOpts) != null ? (_ref2 = _ref1.debounce) != null ? (_ref3 = _ref2.debounce) != null ? _ref3.dragMs : void 0 : void 0 : void 0);
                });
                settingZoomFromScope = false;
                settingZoomFromDirective = false;
                maybeHookToEvent('zoom_changed', function() {
                  var _ref1, _ref2;
                  if (settingZoomFromScope) {
                    return;
                  }
                  if (scope.zoom !== _gMap.zoom) {
                    settingZoomFromDirective = true;
                    return $timeout(function() {
                      scope.zoom = _gMap.zoom;
                      return settingZoomFromDirective = false;
                    }, (_ref1 = scope.eventOpts) != null ? (_ref2 = _ref1.debounce) != null ? _ref2.zoomMs : void 0 : void 0);
                  }
                });
                settingCenterFromScope = false;
                settingCenterFromDirective = false;
                maybeHookToEvent('center_changed', function() {
                  var c, _ref1, _ref2;
                  c = _gMap.center;
                  if (settingCenterFromScope) {
                    return;
                  }
                  settingCenterFromDirective = true;
                  return $timeout(function() {
                    var s;
                    s = scope;
                    if (!_gMap.dragging) {
                      if (angular.isDefined(s.center.type)) {
                        if (s.center.coordinates[1] !== c.lat()) {
                          s.center.coordinates[1] = c.lat();
                        }
                        if (s.center.coordinates[0] !== c.lng()) {
                          s.center.coordinates[0] = c.lng();
                        }
                      } else {
                        if (s.center.latitude !== c.lat()) {
                          s.center.latitude = c.lat();
                        }
                        if (s.center.longitude !== c.lng()) {
                          s.center.longitude = c.lng();
                        }
                      }
                    }
                    return settingCenterFromDirective = false;
                  }, (_ref1 = scope.eventOpts) != null ? (_ref2 = _ref1.debounce) != null ? _ref2.centerMs : void 0 : void 0);
                });
                maybeHookToEvent('idle', function() {
                  var b, ne, sw;
                  b = _gMap.getBounds();
                  ne = b.getNorthEast();
                  sw = b.getSouthWest();
                  return scope.$evalAsync(function(s) {
                    var c;
                    c = _gMap.center;
                    if (angular.isDefined(s.center.type)) {
                      if (s.center.coordinates[1] !== c.lat()) {
                        s.center.coordinates[1] = c.lat();
                      }
                      if (s.center.coordinates[0] !== c.lng()) {
                        s.center.coordinates[0] = c.lng();
                      }
                    } else {
                      if (s.center.latitude !== c.lat()) {
                        s.center.latitude = c.lat();
                      }
                      if (s.center.longitude !== c.lng()) {
                        s.center.longitude = c.lng();
                      }
                    }
                    if (s.bounds !== null && s.bounds !== undefined && s.bounds !== void 0) {
                      s.bounds.northeast = {
                        latitude: ne.lat(),
                        longitude: ne.lng()
                      };
                      s.bounds.southwest = {
                        latitude: sw.lat(),
                        longitude: sw.lng()
                      };
                      s.zoom = _gMap.zoom;
                      return scope.idleAndZoomChanged = !scope.idleAndZoomChanged;
                    }
                  });
                });
              }
              if (angular.isDefined(scope.events) && scope.events !== null && angular.isObject(scope.events)) {
                getEventHandler = function(eventName) {
                  return function() {
                    return scope.events[eventName].apply(scope, [_gMap, eventName, arguments]);
                  };
                };
                customListeners = [];
                for (eventName in scope.events) {
                  if (scope.events.hasOwnProperty(eventName) && angular.isFunction(scope.events[eventName])) {
                    customListeners.push(google.maps.event.addListener(_gMap, eventName, getEventHandler(eventName)));
                  }
                }
                listeners.concat(customListeners);
              }
              _gMap.getOptions = function() {
                return mapOptions;
              };
              scope.map = _gMap;
              if ((attrs.control != null) && (scope.control != null)) {
                scope.control.refresh = function(maybeCoords) {
                  var coords;
                  if (_gMap == null) {
                    return;
                  }
                  google.maps.event.trigger(_gMap, 'resize');
                  if (((maybeCoords != null ? maybeCoords.latitude : void 0) != null) && ((maybeCoords != null ? maybeCoords.latitude : void 0) != null)) {
                    coords = _this.getCoords(maybeCoords);
                    if (_this.isTrue(attrs.pan)) {
                      return _gMap.panTo(coords);
                    } else {
                      return _gMap.setCenter(coords);
                    }
                  }
                };
                scope.control.getGMap = function() {
                  return _gMap;
                };
                scope.control.getMapOptions = function() {
                  return mapOptions;
                };
                scope.control.getCustomEventListeners = function() {
                  return customListeners;
                };
                scope.control.removeEvents = function(yourListeners) {
                  return EventsHelper.removeEvents(yourListeners);
                };
              }
              scope.$watch('center', function(newValue, oldValue) {
                var coords;
                if (newValue === oldValue || settingCenterFromDirective) {
                  return;
                }
                coords = _this.getCoords(scope.center);
                if (coords.lat() === _gMap.center.lat() && coords.lng() === _gMap.center.lng()) {
                  return;
                }
                settingCenterFromScope = true;
                if (!dragging) {
                  if (!_this.validateCoords(newValue)) {
                    $log.error("Invalid center for newValue: " + (JSON.stringify(newValue)));
                  }
                  if (_this.isTrue(attrs.pan) && scope.zoom === _gMap.zoom) {
                    _gMap.panTo(coords);
                  } else {
                    _gMap.setCenter(coords);
                  }
                }
                return settingCenterFromScope = false;
              }, true);
              scope.$watch('zoom', function(newValue, oldValue) {
                var _ref1, _ref2;
                if (_.isEqual(newValue, oldValue) || _gMap.getZoom() === scope.zoom) {
                  return;
                }
                settingZoomFromScope = true;
                return $timeout(function() {
                  _gMap.setZoom(newValue);
                  return settingZoomFromScope = false;
                }, ((_ref1 = scope.eventOpts) != null ? (_ref2 = _ref1.debounce) != null ? _ref2.zoomMs : void 0 : void 0) + 20, false);
              });
              scope.$watch('bounds', function(newValue, oldValue) {
                var bounds, ne, sw;
                if (newValue === oldValue) {
                  return;
                }
                if ((newValue.northeast.latitude == null) || (newValue.northeast.longitude == null) || (newValue.southwest.latitude == null) || (newValue.southwest.longitude == null)) {
                  $log.error("Invalid map bounds for new value: " + (JSON.stringify(newValue)));
                  return;
                }
                ne = new google.maps.LatLng(newValue.northeast.latitude, newValue.northeast.longitude);
                sw = new google.maps.LatLng(newValue.southwest.latitude, newValue.southwest.longitude);
                bounds = new google.maps.LatLngBounds(sw, ne);
                return _gMap.fitBounds(bounds);
              });
              return ['options', 'styles'].forEach(function(toWatch) {
                return scope.$watch(toWatch, function(newValue, oldValue) {
                  var watchItem;
                  watchItem = this.exp;
                  if (_.isEqual(newValue, oldValue)) {
                    return;
                  }
                  opts.options = newValue;
                  if (_gMap != null) {
                    return _gMap.setOptions(opts);
                  }
                });
              }, true);
            };
          })(this));
        };

        return Map;

      })(BaseObject);
    }
  ]);

}).call(this);
