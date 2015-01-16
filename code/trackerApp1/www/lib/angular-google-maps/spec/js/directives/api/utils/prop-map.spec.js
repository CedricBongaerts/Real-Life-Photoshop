(function() {
  describe('PropMap tests', function() {
    beforeEach(function() {
      angular.mock.module('uiGmapgoogle-maps.directives.api.models.parent');
      return inject([
        'uiGmapPropMap', (function(_this) {
          return function(PropMap) {
            return _this.PropMap = PropMap;
          };
        })(this)
      ]);
    });
    it('should construct', function() {
      var propMap;
      propMap = new this.PropMap();
      return expect(propMap != null).toEqual(true);
    });
    return describe('PropMap method tests', function() {
      beforeEach(function() {
        return this.propMap = new this.PropMap();
      });
      it('should have initial length 0', function() {
        return expect(this.propMap.length).toEqual(0);
      });
      it('should return undefined initially', function() {
        return expect(this.propMap.get('foo')).toEqual(void 0);
      });
      it('should return what is put', function() {
        this.propMap.put('foo', 'bar');
        return expect(this.propMap.get('foo')).toEqual('bar');
      });
      it('should remove and reflect length', function() {
        this.propMap.put('foo', 'bar');
        expect(this.propMap.length).toEqual(1);
        this.propMap.remove('foo');
        expect(this.propMap.get('foo')).toEqual(void 0);
        return expect(this.propMap.length).toEqual(0);
      });
      it('should remove and tracked length should match real length', function() {
        this.propMap.put('foo', 'bar');
        expect(this.propMap.length).toEqual(1);
        expect(_.values(this.propMap.dict).length).toEqual(this.propMap.length);
        this.propMap.remove('foo');
        return expect(_.values(this.propMap.dict).length).toEqual(this.propMap.length);
      });
      it('should return all put values', function() {
        var expected, i, item, values, _i, _len, _results;
        this.propMap.put('foo', 'bar');
        this.propMap.put('baz', 'biz');
        values = this.propMap.values();
        expected = ['bar', 'biz'];
        _results = [];
        for (i = _i = 0, _len = expected.length; _i < _len; i = ++_i) {
          item = expected[i];
          _results.push(expect(values[i]).toEqual(item));
        }
        return _results;
      });
      it('should return all put keys', function() {
        var expected, i, item, keys, _i, _len, _results;
        this.propMap.put('foo', 'bar');
        this.propMap.put('baz', 'biz');
        keys = this.propMap.keys();
        console.log(keys);
        expected = ['foo', 'baz'];
        _results = [];
        for (i = _i = 0, _len = expected.length; _i < _len; i = ++_i) {
          item = expected[i];
          _results.push(expect(keys[i]).toEqual(item));
        }
        return _results;
      });
      return it('map works', function() {
        var expected, mapped;
        this.propMap.put('foo', 'bar');
        this.propMap.put('biz', 'biz');
        mapped = this.propMap.map(function(v) {
          return v + 'BAR';
        });
        expected = ['barBAR', 'bizBAR'];
        return expected.forEach(function(item, i) {
          return expect(mapped[i]).toBe(item);
        });
      });
    });
  });

}).call(this);
