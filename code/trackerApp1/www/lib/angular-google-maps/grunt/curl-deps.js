(function() {
  var deps, jf, location, path, rc, rcDirectory, relativePath, _;

  _ = require('lodash');

  path = require('path');

  relativePath = path.join(__dirname, '../');

  jf = require('jsonfile');

  deps = require('../curl.json').devDependencies;

  rc = null;

  rcDirectory = null;

  try {
    rc = jf.readFileSync("" + relativePath + ".curlrc");
    if (rc) {
      rcDirectory = rc.directory;
    }
  } catch (_error) {

  }

  location = rcDirectory || 'curl_components';

  _.each(deps, function(v, k) {
    var repoName;
    repoName = k;
    deps["" + location + "/" + repoName + "/index.js"] = v;
    return delete deps[k];
  });

  module.exports = deps;

}).call(this);
