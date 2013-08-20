'use strict()'

var data = data || {};
angular.module('services', []);
angular.module('services').factory('DataService', ['$rootScope', function($rootScope) {
    var commands = [];
    var service = {};
    service.init = function() {
        if ( !_.isUndefined(data.APIC) && commands.length < 1) {
            commands = data.APIC;
        }
    };

    service.getCommands = function() {
        return commands;
    };
    service.addCommand = function(item) {
        var itemArray = _.isArray(item) ? item : [item];
        commands = _.chain(commands)
            .union(itemArray)
            .without(undefined)
            .value();
        return commands;
    };
    service.removeCommand = function(item) {
        commands = _.without(commands, item);
        return commands;
    };

    service.init();
    return service;
}]); //  services.command

angular.module('controllers', ['services']);
angular.module('controllers').controller('CommandCtrl', ['$scope', 'DataService', function($scope, DataService) {
    $scope.filterLimit = 50;
    $scope.filterIsLimited = true;
    $scope.all = [];
    $scope.filtered = [];
    $scope.filter = "";
    $scope.apiFilter = "";
    $scope.selected;
    $scope.apis = [];

    $scope.$watch("all", function() {
        $scope.apis = _.uniq(_.pluck($scope.all, 'api'), true);
    });

    var filterAll = function(unlimited) {
        var nameFiltered = _.filter($scope.all, function(item) {
            var filterItems = $scope.filter.split(' ');
            var match = _.find(filterItems, function(f){
                return -1 !== item.name.toLowerCase().indexOf(f.toLowerCase()) ||
                       -1 !== item.description.toLowerCase().indexOf(f.toLowerCase()) ;
            });
            return !_.isUndefined(match);
        });
        var apiFiltered = _.filter($scope.all, function(item) {
            var filterItems = $scope.apiFilter.split(' ');
            var match = _.find(filterItems, function(f){
                return -1 !== item.api.toLowerCase().indexOf(f.toLowerCase());
            });
            return !_.isUndefined(match);
        });

        if (unlimited) {
            $scope.filterIsLimited = false;
            $scope.filtered = _.intersection(apiFiltered, nameFiltered);
        } else {
            var list = _.intersection(apiFiltered, nameFiltered);
            $scope.filterIsLimited = (list.length > $scope.filterLimit);
            $scope.filtered = _.first(list, $scope.filterLimit);
        }

        $scope.selected = _.first($scope.filtered);
    }
    $scope.$watch("filter", function() {
        filterAll();
    });
    $scope.$watch("apiFilter", function() {
        filterAll();
    });
    $scope.unlimit = function(){
        filterAll(true);
    }

    $scope.add = function(item) {
        $scope.all = DataService.addCommand(item);
        $scope.cmd = undefined;
    };
    $scope.remove = function(item) {
        $scope.all = DataService.removeCommand(item);
    };
    $scope.select = function(item){
        if ( $scope.selected == item ) {
            $scope.selected = undefined;
        } else {
            $scope.selected = item;
        }
    };
    $scope.isSelected = function(item){
        return item == $scope.selected;
    };

    var init = function() {
        $scope.all = DataService.getCommands();
        $scope.filtered = $scope.all;
    }
    $scope.init = function() {
        $scope.all = DataService.getCommands();
        $scope.filtered = $scope.all;
    };
    $scope.init();
}]);


var APIC = angular.module('APIC', ['controllers', 'services'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'html/master.tmpl.html',
                controller: 'CommandCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
