(function() {
  describe("directives.api.control", function() {
    beforeEach(function() {
      window['uiGmapInitiator'].initDirective(this, "Control");
      return inject(function($templateCache) {
        return $templateCache.put('mockControl.tpl.html', '<button class="mock">Control</button>');
      });
    });
    it("can be created", function() {
      expect(this.subject).toBeDefined();
      return this.log.error.calls.reset();
    });
    it("should log error if no template is supplied", function() {
      var element, html;
      html = angular.element("<ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-map-control></ui-gmap-map-control>\n</ui-gmap-google-map>");
      element = this.compile(html)(this.scope);
      this.rootScope.$apply();
      expect(this.log.error).toHaveBeenCalledWith('mapControl: could not find a valid template property');
      return this.log.error.calls.reset();
    });
    it("should load template", function() {
      var element, html;
      html = angular.element("<ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-map-control template=\"mockControl.tpl.html\"></ui-gmap-map-control>\n</ui-gmap-google-map>");
      element = this.compile(html)(this.scope);
      this.rootScope.$apply();
      expect(this.log.error).not.toHaveBeenCalled();
      return this.log.error.calls.reset();
    });
    it("should validate position attribute", function() {
      var element, html;
      html = angular.element("<ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\">\n    <ui-gmap-map-control template=\"mockControl.tpl.html\" position=\"bad-position\">\n    </ui-gmap-map-control>\n</ui-gmap-google-map>");
      element = this.compile(html)(this.scope);
      this.rootScope.$apply();
      expect(this.log.error).toHaveBeenCalledWith('mapControl: invalid position property');
      return this.log.error.calls.reset();
    });
    it("error was called bottom_center", function() {
      var element, html;
      html = angular.element("<ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-map-control template=\"mockControl.tpl.html\" position=\"bottom-center\"></ui-gmap-map-control>\n</ui-gmap-google-map>");
      element = this.compile(html)(this.scope);
      this.rootScope.$apply();
      expect(this.log.error).not.toHaveBeenCalled();
      return this.log.error.calls.reset();
    });
    return it("error was called - top_left", function() {
      var element, html;
      html = angular.element("<ui-gmap-google-map center=\"map.center\" zoom=\"map.zoom\">\n  <ui-gmap-map-control template=\"mockControl.tpl.html\" position=\"ToP_LefT\"></ui-gmap-map-control>\n</ui-gmap-google-map>");
      element = this.compile(html)(this.scope);
      this.rootScope.$apply();
      expect(this.log.error).not.toHaveBeenCalled();
      return this.log.error.calls.reset();
    });
  });

}).call(this);
