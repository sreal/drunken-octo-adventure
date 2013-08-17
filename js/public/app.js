'use strict()'

angular.module('services', []);
angular.module('services').factory('DataService', ['$rootScope', function($rootScope) {
  var commands = [];
  var service = {};

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

  return service;
}]); //  services.command

angular.module('controllers', ['services']);
angular.module('controllers').controller('CommandCtrl', ['$scope', 'DataService', function($scope, DataService) {
}]);