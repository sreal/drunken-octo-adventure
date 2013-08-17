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

    describe("test setup: ", function() {
      it('injects $scope', function () {
        expect($scope).toBeDefined();
      });
      it('injects DataService', function () {
        expect(DataService).toBeDefined();
      });
    }); // test setup

    describe("DataService: ", function() {
      it('loads with expected methods', function () {
        expect(DataService.getCommands).toBeDefined();
        expect(DataService.addCommand).toBeDefined();
        expect(DataService.deleteCommand).toBeDefined();
      });

      it('gets command list', function () {
        var list = DataService.getCommands();
        expect(list).toEqual([]);
      });
      it('add', function () {
        var cmd = { name: 'name' };
        DataService.addCommand( cmd );
        var list = DataService.getCommands();
        expect(list).toEqual([cmd]);
      });
      it('adds without duplicates', function () {
        var cmd = { name: 'name' };
        DataService.addCommand( cmd );
        DataService.addCommand( cmd );
        var list = DataService.getCommands();
        expect(list).toEqual([cmd]);
      });
      it('adds without duplicates', function () {
        var cmd = { name: 'name' };
        DataService.addCommand( cmd );
        DataService.addCommand( cmd );
        var list = DataService.getCommands();
        expect(list).toEqual([cmd]);
      });
      it('adds a list', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1, c2]);
        var list = DataService.getCommands();
        expect(list).toEqual([c1, c2]);
      });
      it('adds a list with concat', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1]);
        DataService.addCommand([c2]);
        var list = DataService.getCommands();
        expect(list).toEqual([c1, c2]);
      });
      it('adds a list with with uniques', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1]);
        DataService.addCommand([c1, c2]);
        var list = DataService.getCommands();
        expect(list).toEqual([c1, c2]);
      });
      it('adds a list with without duplicates', function () {
        var c1 = { name: '1' };
        DataService.addCommand([c1, c1]);
        var list = DataService.getCommands();
        expect(list).toEqual([c1]);
      });

    });

  }); // dal
});// describe app