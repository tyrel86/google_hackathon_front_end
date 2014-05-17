'use strict';

/* Services */

// var phonecatServices = angular.module('phonecatServices', ['ngResource']);

// phonecatServices.factory('Phone', ['$resource',
//   function($resource){
//     return $resource('phones/:phoneId.json', {}, {
//       query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//     });
//   }]);

// phones/phones.json :id   -> phoneId.json


var usersServices = angular.module('usersServices', ['ngResource']);

usersServices.factory('User', ['$resource',
    function($resource) {
        return $resource('json/survivors.json', {}, {
            query: {
                method: 'GET',
                params: {
                    userId: 'users'
                },
                isArray: true
            }
        });
    }
]);