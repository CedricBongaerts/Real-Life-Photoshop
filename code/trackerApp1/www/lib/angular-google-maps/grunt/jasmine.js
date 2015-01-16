(function() {
  var consoleSpec, coverage, doCover, log, requireConfig, spec, toExport, _;

  _ = require('lodash');

  log = require('util').log;

  doCover = false;

  requireConfig = {
    paths: {
      'lodash': 'bower_components/lodash/dist/lodash'
    },
    deps: ['lodash']
  };

  spec = {
    src: ['dist/angular-google-maps_dev_mapped.js'],
    options: {
      keepRunner: true,
      vendor: ['tmp/string.js', 'bower_components/angular/angular.js', 'bower_components/angular-mocks/angular-mocks.js'],
      specs: ['tmp/spec/coffee/bootstrap.spec.js', 'tmp/spec/**/*spec.js'],
      helpers: [],
      template: require('grunt-template-jasmine-requirejs'),
      templateOptions: {
        requireConfig: requireConfig
      }
    }
  };

  consoleSpec = _.extend({}, spec);

  consoleSpec.src = 'dist/angular-google-maps.js';

  coverage = void 0;

  if (doCover) {
    coverage = _.clone(spec);
    coverage.options = _.extend(coverage.options, {
      template: require('grunt-template-jasmine-istanbul'),
      templateOptions: {
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: requireConfig
        },
        coverage: 'spec/coverage/coverage.json',
        report: 'spec/coverage',
        thresholds: {
          lines: 25,
          statements: 25,
          branches: 5,
          functions: 25
        }
      }
    });
  }

  toExport = {
    spec: spec,
    consoleSpec: consoleSpec
  };

  if (coverage) {
    toExport['coverage'] = coverage;
  }

  module.exports = toExport;

}).call(this);
