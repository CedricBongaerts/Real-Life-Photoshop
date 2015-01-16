(function() {
  describe('MarkersParentModel - Clusterer Event Extensions', function() {
    afterEach(function() {
      return self.markerModelsCluster = void 0;
    });
    beforeEach(function() {
      var self;
      this.clusterTest = {
        getMarkers: function() {
          var map;
          map = new PropMap();
          map.push({
            key: 1
          });
          map.push({
            key: 2
          });
          return map;
        }
      };
      this.index = 0;
      this.clicked = false;
      self = this;
      this.scope = {
        icon: 'icon.png',
        coords: {
          latitude: 90,
          longitude: 90
        },
        events: {
          click: function(marker, eventName, args) {
            self.clicked = true;
            return self.gMarkerSetEvent = marker;
          }
        },
        clusterOptions: {},
        clusterEvents: {
          click: function(cluster, markerModelsCluster) {
            return self.markerModelsCluster = markerModelsCluster;
          },
          mouseout: function(cluster, markerModelsCluster) {
            return self.markerModelsCluster = markerModelsCluster;
          },
          mouseover: function(cluster, markerModelsCluster) {
            return self.markerModelsCluster = markerModelsCluster;
          },
          crap: function() {
            return self.markerModelsCluster = 'crap';
          }
        },
        doCluster: 'true',
        models: []
      };
      angular.module('mockModule', ['uiGmapgoogle-maps', 'uiGmapgoogle-maps.mocks']).value('map', document.gMap).value('element', {}).value('attrs', {
        click: true
      }).value('model', {}).value('scope', this.scope);
      module('mockModule');
      window['uiGmapInitiator'].initMock();
      return inject([
        '$rootScope', 'element', 'attrs', 'map', 'uiGmapMarkersParentModel', 'uiGmapGoogleMapsUtilV3', 'uiGmapExtendMarkerClusterer', (function(_this) {
          return function($rootScope, element, attrs, map, MarkersParentModel, GoogleMapsUtilV3, ExtendMarkerClusterer) {
            var scope;
            GoogleMapsUtilV3.init();
            ExtendMarkerClusterer.init();
            scope = $rootScope.$new();
            _this.scope = _.extend(scope, _this.scope);
            _this.scope.options = {
              animation: google.maps.Animation.BOUNCE
            };
            _this.testCtor = MarkersParentModel;
            _this.subject = new _this.testCtor(_this.scope, element, attrs, map);
            return _this.subject;
          };
        })(this)
      ]);
    });
    it('constructor exist', function() {
      return expect(this.testCtor).toBeDefined();
    });
    it('can be created', function() {
      return expect(this.subject != null).toBeDefined();
    });
    return describe('clusterEvents', function() {
      return describe('basic event handling', function() {
        describe('is fired', function() {
          describe('mapped extension', function() {
            it('click - ', function() {
              this.subject.scope.markerModels.put(1, {
                model: 'test1'
              });
              this.subject.scope.markerModels.put(2, {
                model: 'test2'
              });
              this.subject.clusterInternalOptions.click(this.clusterTest);
              return expect(_.all(this.markerModelsCluster, (function(_this) {
                return function(entity, i) {
                  return entity === _this.subject.scope.markerModels.get(i + 1).model;
                };
              })(this))).toBeTruthy();
            });
            it('mouseout - ', function() {
              this.subject.scope.markerModels.put(1, {
                model: 'test1'
              });
              this.subject.scope.markerModels.put(2, {
                model: 'test2'
              });
              this.subject.clusterInternalOptions.mouseout(this.clusterTest);
              return expect(_.all(this.markerModelsCluster, (function(_this) {
                return function(entity, i) {
                  return entity === _this.subject.scope.markerModels.get(i + 1).model;
                };
              })(this))).toBeTruthy();
            });
            return it('mouseover - ', function() {
              this.subject.scope.markerModels.put(1, {
                model: 'test1'
              });
              this.subject.scope.markerModels.put(2, {
                model: 'test2'
              });
              this.subject.clusterInternalOptions.mouseover(this.clusterTest);
              return expect(_.all(this.markerModelsCluster, (function(_this) {
                return function(entity, i) {
                  return entity === _this.subject.scope.markerModels.get(i + 1).model;
                };
              })(this))).toBeTruthy();
            });
          });
          return describe('some legacy event', (function(_this) {
            return function() {
              return it('crap - ', function() {
                this.subject.gMarkerManager.opt_events.crap();
                return expect(this.markerModelsCluster).toBe('crap');
              });
            };
          })(this));
        });
        return describe('not fired', function() {
          return it('click - ', function() {});
        });
      });
    });
  });

}).call(this);
