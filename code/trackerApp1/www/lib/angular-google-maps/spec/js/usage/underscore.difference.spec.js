(function() {
  describe("uiGmapLodash.differenceObjects", function() {
    var subject;
    subject = null;
    beforeEach(function() {
      this.objArray = [
        {
          a: 1,
          b: 1
        }, {
          a: 2,
          b: 2
        }, {
          a: 3,
          b: 3
        }
      ];
      module('uiGmapgoogle-maps.extensions');
      return inject((function(_this) {
        return function(uiGmapLodash) {
          return subject = uiGmapLodash;
        };
      })(this));
    });
    return describe("Comparing Arrays of Objects", function() {
      describe("difference", function() {
        describe("0 length", function() {
          return it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = _.difference(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
        });
        return describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = _.difference(this.objArray, difArray);
            return expect(interArray.length).toEqual(3);
          });
          it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = _.difference(this.objArray, difArray);
            return expect(interArray.length).toEqual(3);
          });
          return it("diff reference, same values", function() {
            var difArray, diffArray, index, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            index = this.objArray.indexOf({
              a: 1,
              b: 1
            });
            expect(index).toBe(-1);
            interArray = _.difference(this.objArray, difArray);
            return expect(interArray.length).toEqual(3);
          });
        });
      });
      return describe("subject.differenceObjects - extension", function() {
        describe("same length", function() {
          it("when two arrays are identical - same reference", function() {
            var interArray;
            interArray = subject.differenceObjects(this.objArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
          it("diff reference, same values", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }
            ];
            diffArray = this.objArray;
            interArray = subject.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
          return it("diff reference one added (new), same values (intersected)", function() {
            var difArray, diffArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }, {
                a: 2,
                b: 2
              }, {
                a: 3,
                b: 3
              }, {
                a: 4,
                b: 4
              }
            ];
            diffArray = this.objArray;
            interArray = subject.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(1);
          });
        });
        describe("different length - not identical", function() {
          it("diff reference, diff values", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 2
              }, {
                a: 2,
                b: 3
              }, {
                a: 3,
                b: 4
              }
            ];
            interArray = subject.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(3);
          });
          return it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = subject.differenceObjects(difArray, this.objArray);
            return expect(interArray.length).toEqual(0);
          });
        });
        return describe("removal", function() {
          return it("diff reference, 1 val identical", function() {
            var difArray, interArray;
            difArray = [
              {
                a: 1,
                b: 1
              }
            ];
            interArray = subject.withoutObjects(this.objArray, difArray);
            return expect(interArray.length).toEqual(2);
          });
        });
      });
    });
  });

}).call(this);
