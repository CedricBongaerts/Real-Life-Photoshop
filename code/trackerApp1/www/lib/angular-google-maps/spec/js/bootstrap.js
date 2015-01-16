(function() {
  beforeEach(function() {
    return this.googleTemp = window.google;
  });

  afterEach(function() {
    if (this.googleTemp != null) {
      return window.google = this.googleTemp;
    }
  });

}).call(this);
