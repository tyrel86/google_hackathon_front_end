'use strict';

/* App Module */

// var phonecatApp = angular.module('phonecatApp', [
//   'ngRoute',
//   'phonecatAnimations',

//   'phonecatControllers',
//   'phonecatFilters',
//   'phonecatServices'
// ]);

// phonecatApp.config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/phones', {
//         templateUrl: 'partials/phone-list.html',
//         controller: 'PhoneListCtrl'
//       }).
//       when('/phones/:phoneId', {
//         templateUrl: 'partials/phone-detail.html',
//         controller: 'PhoneDetailCtrl'
//       }).
//       otherwise({
//         redirectTo: '/phones'
//       });
//   }]);

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
        when('/users', {
            templateUrl: 'partials/users-list.html',
            controller: 'UserCtrl'
        }).
        when('/users/:userId', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        otherwise({
            redirectTo: '/users'
        });
    }
]);