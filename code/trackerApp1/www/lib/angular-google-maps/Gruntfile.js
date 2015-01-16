(function() {
  var log, _;

  log = require('util').log;

  _ = require('lodash');

  module.exports = function(grunt) {
    var allExamples, allExamplesOpen, allExamplesTaskToRun, dev, exampleOpenTasks, listWithQuotes, options, showOpenType;
    ["grunt-contrib-uglify", "grunt-contrib-jshint", "grunt-contrib-concat", "grunt-contrib-clean", "grunt-contrib-connect", "grunt-contrib-copy", "grunt-contrib-watch", "grunt-open", "grunt-mkdir", "grunt-contrib-coffee", "grunt-contrib-jasmine", "grunt-conventional-changelog", "grunt-bump", 'grunt-replace', 'grunt-subgrunt', 'grunt-debug-task', 'grunt-curl', 'grunt-verbosity', 'grunt-webpack'].forEach(function(gruntLib) {
      return grunt.loadNpmTasks(gruntLib);
    });
    options = require('./grunt/options')(grunt);
    allExamples = grunt.file.expand('example/*.html');
    allExamplesOpen = {};
    allExamples.forEach(function(path) {
      var pathValue, root;
      root = path.replace('example/', '').replace('.html', '');
      pathValue = "http://localhost:3100/" + path;
      return allExamplesOpen[root] = {
        path: pathValue
      };
    });
    showOpenType = function(toIterate) {
      if (toIterate == null) {
        toIterate = allExamplesOpen;
      }
      return _(toIterate).each(function(v, k) {
        return log("" + k + " -> " + v.path);
      });
    };
    options.open = _.extend(options.open, allExamplesOpen);
    grunt.initConfig(options);
    grunt.registerTask("default", ['verbosity', "clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "webpack", "concat:dist", "copy", "uglify::dist", "jasmine:consoleSpec"]);
    grunt.registerTask("spec", ['verbosity', "clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "webpack", "concat", "copy", "connect:jasmineServer", "jasmine:spec", "open:jasmine", "watch:spec"]);
    grunt.registerTask("coverage", ["clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "concat:dist", "copy", "uglify:dist", "jasmine:coverage"]);
    grunt.registerTask('default-no-specs', ["clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "concat:dist", "copy", "uglify:dist"]);
    grunt.registerTask('offline', ['default-no-specs', 'watch:offline']);
    dev = ["clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "webpack", "concat", "copy"];
    grunt.registerTask("dev", dev.concat(["uglify:distMapped", "jasmine:spec"]));
    grunt.registerTask("fast", dev.concat(["jasmine:spec"]));
    grunt.registerTask("mappAll", ["clean:dist", "jshint", "mkdir", "coffee", "concat:libs", "replace", "webpack", "concat", "uglify", "copy", "jasmine:spec"]);
    grunt.registerTask('bump-@', ['bump-only', 'mappAll', 'bump-commit']);
    grunt.registerTask('bump-@-minor', ['bump-only:minor', 'mappAll', 'bump-commit']);
    grunt.registerTask('bump-@-major', ['bump-only:major', 'mappAll', 'bump-commit']);
    exampleOpenTasks = [];
    _(allExamplesOpen).each(function(v, key) {
      var basicTask;
      basicTask = "open:" + key;
      grunt.registerTask(key, ["fast", "clean:example", "connect:server", basicTask, "watch:all"]);
      return exampleOpenTasks.push(basicTask);
    });
    allExamplesTaskToRun = ["fast", "clean:example", "connect:server"].concat(exampleOpenTasks).concat(['watch:all']);
    listWithQuotes = function(collection, doLog) {
      var all, last;
      if (doLog == null) {
        doLog = true;
      }
      last = collection.length - 1;
      all = '';
      collection.forEach(function(t, i) {
        return all += i < last ? "'" + t + "'," : "'" + t + "'";
      });
      if (doLog) {
        return log(all);
      }
      return all;
    };
    grunt.registerTask('listExamples', showOpenType);
    grunt.registerTask('listAllOpen', function() {
      return showOpenType(options.open);
    });
    grunt.registerTask('listAllExamplesTasks', function() {
      return listWithQuotes(exampleOpenTasks);
    });
    return grunt.registerTask('allExamples', allExamplesTaskToRun);
  };

}).call(this);
