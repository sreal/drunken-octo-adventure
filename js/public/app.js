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
    $scope.all = [];
    $scope.filtered = [];
    $scope.filter = "";
    $scope.selected;

    $scope.$watch("filter", function() {
        $scope.filtered = _.filter($scope.all, function(item) {
            var filterItems = $scope.filter.split(' ');
            var match = _.find(filterItems, function(f){
                return -1 !== item.api.indexOf(f) ||
                       -1 !== item.name.indexOf(f) ||
                       -1 !== item.description.indexOf(f);
            });
            return !_.isUndefined(match);
        });
    });

    $scope.add = function(item) {
        console.log(item);
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
