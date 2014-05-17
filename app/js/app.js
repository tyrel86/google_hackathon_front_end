'use strict';

/* App Module */

var usersApp = angular.module('usersApp', [
    'ngRoute',
    'phonecatAnimations',

    'usersControllers',
    'usersFilters',
    'usersServices'
]);

usersApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/start', {
            templateUrl: 'partials/start.html',
            controller: 'StartCtrl'
        }).
        when('/register', {
            templateUrl: 'partials/registration-0.html',
            controller: 'RegisterCtrl'
        }).
        when('/users', {
            templateUrl: 'partials/users-list.html',
            controller: 'UserCtrl'
        }).
        when('/users/:userId', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        otherwise({
            redirectTo: '/start'
        });
    }
]);
