(function() {
  describe('uiGmapWindowChildModel', function() {
    beforeEach(function() {
      var mock;
      mock = window['uiGmapInitiator'].initMock();
      if (window.InfoBox) {
        this.infoBoxRealTemp = window.InfoBox;
      } else {
        window.InfoBox = function(opt_opts) {
          opt_opts = opt_opts || {};
          this.boxClass_ = opt_opts.boxClass || 'infoBox';
          this.content_ = opt_opts.content || '';
          this.div_ = document.createElement('div');
          return this.div_.className = this.boxClass_;
        };
      }
      this.scope = {
        coords: {
          latitude: 90.0,
          longitude: 89.0
        },
        show: true
      };
      this.commonOpts = {
        position: new google.maps.LatLng(this.scope.coords.latitude, this.scope.coords.longitude)
      };
      this.windowOpts = _.extend(this.commonOpts, {
        content: 'content'
      });
      this.gMarker = new google.maps.Marker(this.commonOpts);
      return inject((function(_this) {
        return function($rootScope, uiGmapWindowChildModel) {
          var isIconVisibleOnClick, mapCtrl, model, scope;
          scope = $rootScope.$new();
          isIconVisibleOnClick = true;
          model = _.extend(_this.scope, scope);
          mapCtrl = document.gMap;
          _this.gMarker;
          return _this.subject = new uiGmapWindowChildModel(model, scope, _this.windowOpts, isIconVisibleOnClick, mapCtrl, void 0, '<span>hi</span>');
        };
      })(this));
    });
    return it('can be created', function() {
      expect(this.subject).toBeDefined();
      return expect(this.subject.index).toEqual(this.index);
    });
  });

}).call(this);
