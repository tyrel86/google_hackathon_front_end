'use strict';

/* Services */

window.apihost = 'http://10.21.1.82:3000';

var usersServices = angular.module('usersServices', ['ngResource']);

usersServices.factory('User', ['$resource',
    function($resource) {
        return $resource(window.apihost + '/api/v1/users/search', {}, {
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
