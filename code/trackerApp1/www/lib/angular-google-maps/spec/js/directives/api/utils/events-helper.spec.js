(function() {
  describe('uiGmapEventsHelper', function() {
    var scope;
    scope = null;
    beforeEach(function() {
      module('uiGmapgoogle-maps.directives.api.utils');
      module('uiGmapgoogle-maps.mocks');
      inject([
        'uiGmapEventsHelper', 'GoogleApiMock', (function(_this) {
          return function(EventsHelper, GoogleApiMock) {
            _this.subject = EventsHelper;
            _this.gmap = new GoogleApiMock();
            _this.gmap.mockAPI();
            return _this.listeners = _this.gmap.mockEvent();
          };
        })(this)
      ]);
      return scope = {
        events: {
          click: function() {}
        },
        $evalAsync: function(arg) {}
      };
    });
    it('exists', function() {
      return expect(this.subject).toBeDefined();
    });
    describe('setEvents', function() {
      it('function exists', function() {
        return expect(this.subject.setEvents).toBeDefined();
      });
      return it('add events', function() {
        spyOn(scope.events, 'click');
        this.subject.setEvents(this, scope, 'model');
        window.google.maps.event.fireListener(this, 'click');
        return expect(scope.events.click).toHaveBeenCalled();
      });
    });
    return describe('removeEvents', function() {
      it('function exists', function() {
        return expect(this.subject.removeEvents).toBeDefined();
      });
      return it('removes the listeners', function() {
        var listeners;
        listeners = this.subject.setEvents(this, scope, 'model');
        expect(this.listeners.length).toBe(1);
        this.subject.removeEvents(this.listeners);
        return expect(this.listeners.length).toBe(0);
      });
    });
  });

}).call(this);
