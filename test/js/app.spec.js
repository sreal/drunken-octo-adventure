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
        var dataService;

        var createCmd = function(name, desc, api) {
            return { name: name, description: desc, api:api };
        }
        var testCmds = function() {
            return [ createCmd("AAAAAA", "AAAAAA description", "111"),
                     createCmd("BBBBBB", "BBBBBB description", "222"),
                     createCmd("CCCCCC", "CCCCCC description", "222"),
                     createCmd("ABCABC", "EEEEEE description", "444"), ]
        };

        beforeEach(function() {
            module('controllers');
            inject(function(_$rootScope_, $controller, _DataService_) {
                $scope = _$rootScope_.$new();
                dataService = _DataService_;

                $ctrl = $controller('CommandCtrl', {
                    $scope:$scope,
                    DataService: dataService
                });

                spyOn(dataService, 'getCommands').andReturn(testCmds());
            });
        });

        describe("test setup: ", function() {
            it('injects $scope', function () {
                expect($scope).toBeDefined();
            });
            it('injects DataService', function () {
                expect($ctrl).toBeDefined();
            });
        }); // test setup

        it('has a list of commands', function(){
            $scope.init();
            expect($scope.all).toEqual(testCmds());
        });
        describe('Filters: ', function(){
            it('has a list of filtered commands', function(){
                $scope.init();
                expect($scope.filtered).toEqual(testCmds());
            });
            it('has a filter that start empty', function(){
                $scope.init();
                expect($scope.filter).toBe("");
            });
            it('has a filter that filters on exact name', function(){
                $scope.init();
                $scope.filter = "AAAAAA";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("AAAAAA", "AAAAAA description", "111")]);
            });
            it('has a filter that filters on partial name', function(){
                $scope.init();
                $scope.filter = "AAAAA";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("AAAAAA", "AAAAAA description", "111")]);
            });
            it('has a filter that filters on any value in name', function(){
                $scope.init();
                $scope.filter = "AAAAAA BBBBBB";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("AAAAAA", "AAAAAA description", "111"),
                                                 createCmd("BBBBBB", "BBBBBB description", "222")]);
            });
            it('has a filter that filters on description', function(){
                $scope.init();
                $scope.filter = "EEEEEE";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("ABCABC", "EEEEEE description", "444")]);
            });
            it('has a filter that filters on nameor description', function(){
                $scope.init();
                $scope.filter = "AAAAAA EEEEEE";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("AAAAAA", "AAAAAA description", "111"),
                                                 createCmd("ABCABC", "EEEEEE description", "444")]);
            });
            it('has a filter for api that start empty', function(){
                $scope.init();
                expect($scope.apiFilter).toEqual("");
            });
            it('has a filter for api that filters on api', function(){
                $scope.init();
                $scope.apiFilter = "111";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("AAAAAA", "AAAAAA description", "111")]);
            });

            it('has a filter for api that filters on api and basic', function(){
                $scope.init();
                $scope.apiFilter = "222";
                $scope.filter = "BBBBBB";
                $scope.$apply();
                expect($scope.filtered).toEqual([createCmd("BBBBBB", "BBBBBB description", "222")]);
            });

        });

        it('has a selected item', function(){
            $scope.init();
            expect($scope.selected).toBeUndefined(null);
        });
        it('can select', function(){
            $scope.init();
            $scope.select(createCmd("AAAAAA", "AAAAAA description", "111"));
            expect($scope.selected).toEqual(createCmd("AAAAAA", "AAAAAA description", "111"));
        });
        it('can un-select', function(){
            $scope.init();
            $scope.selected = createCmd("AAAAAA", "AAAAAA description", "111");
            $scope.select();
            expect($scope.selected).toBeUndefined();
        });
        it('can un-select if already selected', function(){
            $scope.init();
            var select = createCmd("AAAAAA", "AAAAAA description", "111");
            $scope.selected = select;
            $scope.select(select);
            expect($scope.selected).toBeUndefined();
        });
        it('can test isSelected', function(){
            $scope.init();
            var select = createCmd("AAAAAA", "AAAAAA description", "111");
            var notselect = createCmd("BBBBBB", "BBBBBB description", "222");
            $scope.selected = select;

            var selected = $scope.isSelected(select);
            expect(selected).toBe(true);
            var notSelected = $scope.isSelected(notSelected);
            expect(notSelected).toBe(false);
        });

        it('can add', function(){
            $scope.init();
            var c = createCmd("AAAAAA", "AAAAAA description", "111");
            var spyResp = _.union($scope.all, c);

            spyOn(dataService, 'addCommand').andReturn(spyResp);
            $scope.add(createCmd("AAAAAA", "AAAAAA description", "111"));
            expect($scope.all).toEqual(spyResp);
        });
        it('can remove', function(){
            $scope.init();
            var c = createCmd("AAAAAA", "AAAAAA description", "111");
            var spyResp = _.without($scope.all, c);

            spyOn(dataService, 'removeCommand').andReturn(spyResp);
            $scope.remove(createCmd("AAAAAA", "AAAAAA description", "111"));
            expect($scope.all).toEqual(spyResp);
        });
    }); // command controller
});// describe app
