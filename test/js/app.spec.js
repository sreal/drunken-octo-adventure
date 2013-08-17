'use strict()';

describe("app: ", function() {
  it("runs the test runner", function() {
    expect(undefined).not.toBeDefined();
  });

  describe("dal: ", function() {
    var $scope;
    var DataService;

    beforeEach(function() {
      module('services');
      inject(function(_$rootScope_, _DataService_) {
        $scope = _$rootScope_.$new();
        DataService = _DataService_;
      });
    });

    describe ("test setup: ", function() {
      it('injects DataService', function () {
        expect(DataService).toBeDefined();
      });

    }); // test setup

  }); // dal
});// describe app