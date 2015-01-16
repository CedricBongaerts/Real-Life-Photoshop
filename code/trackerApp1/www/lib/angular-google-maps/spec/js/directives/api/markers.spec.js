(function() {
  describe('uiGmapMarkers (directive creation)', function() {
    var GMarker, allDone, digest, modelClicked, rootScope, timeout;
    allDone = void 0;
    rootScope = null;
    timeout = null;
    GMarker = null;
    digest = null;
    modelClicked = false;
    afterEach(function() {
      digest = null;
      GMarker.resetInstances();
      return modelClicked = false;
    });
    beforeEach(function() {
      var apiMock;
      digest = (function(_this) {
        return function(fn) {
          fn();
          if (timeout != null) {
            timeout.flush();
          }
          return rootScope != null ? rootScope.$apply() : void 0;
        };
      })(this);
      this.html = "<ui-gmap-google-map draggable=\"true\" center=\"map.center\" zoom=\"map.zoom\">\n    <ui-gmap-markers models=\"items\" coords=\"'self'\" click=\"'onClick'\" ></ui-gmap-markers>\n</ui-gmap-google-map>";
      this.map = {
        zoom: 12,
        center: {
          longitude: 47,
          latitude: -27
        }
      };
      apiMock = window['uiGmapInitiator'].initMock().apiMock;
      GMarker = window.google.maps.Marker;
      return inject([
        '$rootScope', '$timeout', '$compile', '$q', 'uiGmapMarkers', (function(_this) {
          return function($rootScope, $timeout, $compile, $q, Markers) {
            rootScope = $rootScope;
            timeout = $timeout;
            _this.compile = $compile;
            return _this.subject = Markers;
          };
        })(this)
      ]);
    });
    describe('should add markers for each object in model', function() {
      return it('from start', function(done) {
        var element, scope, toPush;
        scope = rootScope.$new();
        _.extend(scope, {
          map: this.map
        });
        toPush = {};
        toPush.id = 0;
        toPush.latitude = 47;
        toPush.longitude = -27;
        scope.items = [toPush];
        element = this.compile(this.html)(scope);
        return digest((function(_this) {
          return function() {
            return timeout(function() {
              expect(GMarker.instances).toEqual(1);
              return done();
            });
          };
        })(this));
      });
    });
    describe('dynamic', function() {
      it('delayed creation', function(done) {
        var element, scope;
        scope = rootScope.$new();
        scope.items = [];
        _.extend(scope, {
          map: this.map
        });
        element = this.compile(this.html)(scope);
        expect(GMarker.instances).toEqual(0);
        return digest((function(_this) {
          return function() {
            timeout(function() {
              var toPush;
              toPush = {};
              toPush.id = 0;
              toPush.latitude = 47;
              toPush.longitude = -27;
              return scope.items.push(toPush);
            }, 250);
            return timeout(function() {
              expect(GMarker.instances).toEqual(1);
              return done();
            }, 350);
          };
        })(this));
      });
      return describe('update an existing marker should modify an existing gMarker', (function(_this) {
        return function() {
          beforeEach(function() {
            return this.updateTest = (function(_this) {
              return function(done, updateFn) {
                var createdGMarkers, listener, scope, update;
                scope = rootScope.$new();
                scope.onClick = function() {};
                spyOn(scope, 'onClick');
                _.extend(scope, {
                  map: _this.map
                });
                scope.items = [
                  {
                    id: 0,
                    latitude: 47,
                    longitude: -27
                  }, {
                    id: 1,
                    latitude: 67,
                    longitude: -57
                  }
                ];
                update = {
                  id: 1,
                  latitude: 89,
                  longitude: -150
                };
                createdGMarkers = [];
                listener = GMarker.creationSubscribe(_this, function(gMarker) {
                  return createdGMarkers.push(gMarker);
                });
                _.delay(function() {
                  var gMarker;
                  gMarker = _.last(createdGMarkers);
                  expect(gMarker.key).toBe(1);
                  expect(gMarker.getPosition().lng()).toBe(update.longitude);
                  expect(gMarker.getPosition().lat()).toBe(update.latitude);
                  return done();
                }, 500);
                return digest(function() {
                  var element;
                  element = _this.compile(_this.html)(scope);
                  return timeout(function() {
                    expect(GMarker.instances).toEqual(2);
                    GMarker.creationUnSubscribe(listener);
                    return updateFn(scope.items, update);
                  });
                });
              };
            })(this);
          });
          it('by reference', function(done) {
            return this.updateTest(done, function(items, update) {
              return items[1] = update;
            });
          });
          return it('by position (model)', function(done) {
            return this.updateTest(done, function(items, update) {
              var model;
              model = items[1];
              model.latitude = update.latitude;
              return model.longitude = update.longitude;
            });
          });
        };
      })(this));
    });
    describe('can eval key function', function() {
      return it('handles click function in model', function(done) {
        var listener, scope, toPush;
        scope = rootScope.$new();
        _.extend(scope, {
          map: this.map
        });
        toPush = {
          id: 0,
          latitude: 47,
          longitude: -27,
          onClick: function() {
            return modelClicked = true;
          }
        };
        scope.items = [toPush];
        listener = GMarker.creationSubscribe(this, function(gMarker) {
          return _.delay(function() {
            window.google.maps.event.fireListener(gMarker, 'click');
            expect(modelClicked).toBeTruthy();
            return done();
          }, 250);
        });
        return digest((function(_this) {
          return function() {
            var element;
            element = _this.compile(_this.html)(scope);
            return timeout(function() {
              expect(GMarker.instances).toEqual(1);
              return GMarker.creationUnSubscribe(listener);
            });
          };
        })(this));
      });
    });
    return it('exists', function() {
      return expect(this.subject).toBeDefined();
    });
  });

}).call(this);
