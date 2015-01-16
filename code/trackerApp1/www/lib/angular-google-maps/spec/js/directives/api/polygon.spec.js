(function() {
  describe("directives.api.polygon", function() {
    beforeEach(function() {
      window['uiGmapInitiator'].initDirective(this, 'Polygon');
      this.html = angular.element("<ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-polygon static=\"true\" ng-repeat=\"p in map.polygons track by p.id\" path=\"p.path\" stroke=\"p.stroke\" visible=\"p.visible\"\n    geodesic=\"p.geodesic\" fill=\"p.fill\" fit=\"false\"\n    editable=\"p.editable\"\n    draggable=\"p.draggable\"\n    control=\"map.polygon.control\"\n    events=\"map.polygon.events\">\n  </ui-gmap-polygon>\n</ui-gmap-google-map>");
      return this.scope.map = _.extend(this.scope.map, {
        polygon: {
          events: {
            click: function(p) {},
            dblclick: function(p) {},
            mouseover: function(p) {}
          },
          control: {}
        },
        polygons: [
          {
            id: 1,
            path: [
              {
                latitude: 50,
                longitude: -80
              }, {
                latitude: 30,
                longitude: -120
              }, {
                latitude: 20,
                longitude: -95
              }
            ],
            stroke: {
              color: '#6060FB',
              weight: 3
            },
            editable: true,
            draggable: true,
            geodesic: false,
            visible: true,
            fill: {
              color: '#ff0000',
              opacity: 0.8
            }
          }
        ],
        polygons2: [
          {
            id: 1,
            path: [
              {
                latitude: 60,
                longitude: -80
              }, {
                latitude: 40,
                longitude: -120
              }, {
                latitude: 45,
                longitude: -95
              }
            ],
            stroke: {
              color: '#33CDDC',
              weight: 3
            },
            editable: true,
            draggable: true,
            geodesic: false,
            visible: true,
            fill: {
              color: '#33CCCC',
              opacity: 0.8
            }
          }
        ]
      });
    });
    it("can be created", function() {
      expect(this.subject).toBeDefined();
      return this.log.error.calls.reset();
    });
    it("created a single instance", function(done) {
      var element;
      element = this.compile(this.html)(this.scope);
      this.rootScope.$apply();
      this.scope.map.polygon.control.promise.then((function(_this) {
        return function() {
          expect(_this.scope.map.polygon.control.polygons.length).toBe(1);
          return done();
        };
      })(this));
      this.log.error.calls.reset();
      return this.rootScope.$apply();
    });
    return it("created 3 listeners", function(done) {
      var element;
      element = this.compile(this.html)(this.scope);
      this.rootScope.$apply();
      this.scope.map.polygon.control.promise.then((function(_this) {
        return function() {
          expect(_this.scope.map.polygon.control.polygons[0].listeners.length).toBe(3);
          return done();
        };
      })(this));
      this.log.error.calls.reset();
      return this.rootScope.$apply();
    });
  });

}).call(this);
