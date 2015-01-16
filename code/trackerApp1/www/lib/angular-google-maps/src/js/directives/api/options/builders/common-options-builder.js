(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular.module('uiGmapgoogle-maps.directives.api.options.builders').service('uiGmapCommonOptionsBuilder', [
    'uiGmapBaseObject', 'uiGmapLogger', 'uiGmapModelKey', function(BaseObject, $log, ModelKey) {
      var CommonOptionsBuilder;
      return CommonOptionsBuilder = (function(_super) {
        __extends(CommonOptionsBuilder, _super);

        function CommonOptionsBuilder() {
          this.watchProps = __bind(this.watchProps, this);
          this.buildOpts = __bind(this.buildOpts, this);
          this.hasModel = _(this.scope).chain().keys().contains('model').value();
        }

        CommonOptionsBuilder.prototype.props = [
          'clickable', 'draggable', 'editable', 'visible', {
            prop: 'stroke',
            isColl: true
          }
        ];

        CommonOptionsBuilder.prototype.buildOpts = function(customOpts, forEachOpts) {
          var model, opts, stroke;
          if (customOpts == null) {
            customOpts = {};
          }
          if (forEachOpts == null) {
            forEachOpts = {};
          }
          if (!this.scope) {
            $log.error('this.scope not defined in CommonOptionsBuilder can not buildOpts');
            return;
          }
          if (!this.map) {
            $log.error('this.map not defined in CommonOptionsBuilder can not buildOpts');
            return;
          }
          model = this.hasModel ? this.scope.model : this.scope;
          stroke = this.scopeOrModelVal('stroke', this.scope, model);
          opts = angular.extend(customOpts, this.DEFAULTS, {
            map: this.map,
            strokeColor: stroke != null ? stroke.color : void 0,
            strokeOpacity: stroke != null ? stroke.opacity : void 0,
            strokeWeight: stroke != null ? stroke.weight : void 0
          });
          angular.forEach(angular.extend(forEachOpts, {
            clickable: true,
            draggable: false,
            editable: false,
            "static": false,
            fit: false,
            visible: true,
            zIndex: 0,
            icons: []
          }), (function(_this) {
            return function(defaultValue, key) {
              var val;
              val = _this.scopeOrModelVal(key, _this.scope, model);
              if (angular.isUndefined(val)) {
                return opts[key] = defaultValue;
              } else {
                return opts[key] = model[key];
              }
            };
          })(this));
          if (opts["static"]) {
            opts.editable = false;
          }
          return opts;
        };

        CommonOptionsBuilder.prototype.watchProps = function(props) {
          if (props == null) {
            props = this.props;
          }
          return props.forEach((function(_this) {
            return function(prop) {
              if ((_this.attrs[prop] != null) || (_this.attrs[prop != null ? prop.prop : void 0] != null)) {
                if (prop != null ? prop.isColl : void 0) {
                  return _this.scope.$watchCollection(prop.prop, _this.setMyOptions);
                } else {
                  return _this.scope.$watch(prop, _this.setMyOptions);
                }
              }
            };
          })(this));
        };

        return CommonOptionsBuilder;

      })(ModelKey);
    }
  ]);

}).call(this);
