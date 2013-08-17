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
        expect(DataService.removeCommand).toBeDefined();
      });

      it('gets command list', function () {
        expect(DataService.getCommands()).toEqual([]);
      });
      it('add returns commands', function () {
        var cmd = { name: 'name' };
        expect(DataService.addCommand( cmd )).toEqual([cmd]);
      });
      it('add', function () {
        var cmd = { name: 'name' };
        expect(DataService.addCommand( cmd )).toEqual([cmd]);
      });
      it('adds without duplicates', function () {
        var cmd = { name: 'name' };
        expect(DataService.addCommand( cmd )).toEqual([cmd]);
      });
      it('adds without duplicates', function () {
        var cmd = { name: 'name' };
        DataService.addCommand( cmd );
        expect(DataService.addCommand( cmd )).toEqual([cmd]);
      });
      it('adds a list', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        expect(DataService.addCommand([c1, c2])).toEqual([c1, c2]);
      });
      it('adds a list with concat', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1]);
        expect(DataService.addCommand([c2])).toEqual([c1, c2]);
      });
      it('adds a list with with uniques', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1]);
        expect(DataService.addCommand([c1, c2])).toEqual([c1, c2]);
      });
      it('adds a list with without duplicates', function () {
        var c1 = { name: '1' };
        expect(DataService.addCommand([c1, c1])).toEqual([c1]);
      });
      it('does not add undefined values', function () {
        expect(DataService.addCommand(undefined)).toEqual([]);
      });

      it('removes returns commands', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1, c2]);
        expect(DataService.removeCommand(c1)).toEqual([c2]);
      });
      it('removes', function () {
        var c1 = { name: '1' };
        var c2 = { name: '2' };
        DataService.addCommand([c1, c2]);
        expect(DataService.removeCommand(c1)).toEqual([c2]);
      });
      it('remove ignores undefined', function () {
        expect(DataService.removeCommand(undefined)).toEqual([]);
      });
      it('remove ignores non existent', function () {
        var c1 = { name: '1' };
        expect(DataService.removeCommand(c1)).toEqual([]);
      });

    });

  }); // dal


  describe('CommandController: ', function () {
    var $scope;
    var $controller;
    var $ctrl;

    beforeEach(function() {
      module('controllers');
      inject(function(_$rootScope_ ) {
        $scope = _$rootScope_.$new();
      });
    });
    var setupScope = function() {
      inject(function($controller) {
        $ctrl = $controller('CommandCtrl', {$scope:$scope});
      });
    }

    describe("test setup: ", function() {
      beforeEach( function() {
        setupScope();
      });
      it('injects $scope', function () {
        expect($scope).toBeDefined();
      });
      it('injects DataService', function () {
        expect($ctrl).toBeDefined();
      });
    }); // test setup

  }); // command controller
});// describe app