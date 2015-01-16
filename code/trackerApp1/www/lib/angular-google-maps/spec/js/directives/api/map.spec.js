(function() {
  describe("directives.api.map", function() {
    beforeEach(function() {
      window['uiGmapInitiator'].initDirective(this, "Map", ['initAll'], {});
      this.html = angular.element("<ui-gmap-google-map center='map.center'\n  control='map.control' zoom='map.zoom'\n  options ='map.options'\n  events='map.events'>\n</ui-gmap-google-map>");
      _.extend(this.scope, {
        map: {
          events: {},
          options: {},
          options: {},
          control: {},
          zoom: 10,
          center: {
            longitude: 47,
            latitude: -27
          }
        }
      });
      return this.digest = (function(_this) {
        return function(fn) {
          _this.compile(_this.html)(_this.scope);
          fn();
          return _this.rootScope.$apply();
        };
      })(this);
    });
    afterEach(function() {
      this.scope = null;
      return this.log.error.calls.reset();
    });
    it("it should delay creation until center is set", function() {
      this.digest((function(_this) {
        return function() {
          return expect(_this.scope.map.control.getGMap).toBeUndefined();
        };
      })(this));
      return expect(this.scope.map.control.getGMap).toBeDefined();
    });
    return describe('blackList events', function() {
      it('(all) blocks all but defaults', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'all'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        eventsBeyondDefaults = _.without(events, 'idle');
        return expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy();
      });
      it('(dragstart) blocks only itself', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'dragstart'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        eventsBeyondDefaults = _.without(events, 'idle', 'dragend', 'drag', 'zoom_changed', 'center_changed');
        return expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy();
      });
      it('(dragstart) blocks only itself', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'dragstart'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        return eventsBeyondDefaults = _.without(events, 'idle', 'dragend', 'drag', 'zoom_changed', 'center_changed', expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy());
      });
      it('(dragend) blocks only itself', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'dragstart'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        return eventsBeyondDefaults = _.without(events, 'idle', 'dragstart', 'drag', 'zoom_changed', 'center_changed', expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy());
      });
      it('(drag) blocks only itself', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'dragstart'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        return eventsBeyondDefaults = _.without(events, 'idle', 'dragstart', 'dragend', 'zoom_changed', 'center_changed', expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy());
      });
      it('(zoom_changed) blocks only itself', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'dragstart'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        return eventsBeyondDefaults = _.without(events, 'idle', 'dragstart', 'dragend', 'drag', 'center_changed', expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy());
      });
      return it('(center_changed) blocks only itself', function() {
        var events, eventsBeyondDefaults;
        this.scope.map.events = {
          blacklist: 'dragstart'
        };
        this.digest((function(_this) {
          return function() {};
        })(this));
        events = google.maps.event.normalizedEvents();
        return eventsBeyondDefaults = _.without(events, 'idle', 'dragstart', 'dragend', 'drag', 'zoom_changed', expect(_.isEmpty(eventsBeyondDefaults)).toBeTruthy());
      });
    });
  });

}).call(this);
