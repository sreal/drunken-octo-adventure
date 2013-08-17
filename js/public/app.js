'use strict()'

angular.module('services', []);
angular.module('services').factory('DataService', ['$rootScope', function($rootScope) {
    var commands = [];
    var service = {};
    service.init = function() {
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

    $scope.$watch("filter", function(newVal, oldval) {
        if (newVal === oldval) {
            //do nothing
        }
        $scope.filtered = _.filter($scope.all, function(item) {
            var filterItems = $scope.filter.split(' ');
            var match = _.find(filterItems, function(f){
                return -1 !== item.name.indexOf(f) ||
                       -1 !== item.description.indexOf(f);
            });
            return !_.isUndefined(match);
        });
    });

    var init = function() {
        $scope.all = DataService.getCommands();
        $scope.filtered = $scope.all;
    }
    $scope.init = function() {
        init();
    };

}]);
