'use strict()'

angular.module('services', []);
angular.module('services').factory('DataService', ['$rootScope', function($rootScope) {
  var commands = [];
  var service = {};

  service.getCommands = function() {
    return commands;
  };
  service.addCommand = function(item) {
    var itemArray = _.isArray(item)?item:[item];

    commands = _.union(commands, itemArray);
  };
  service.deleteCommand = function(item) {

  };

  return service;
}]); //  services.command
