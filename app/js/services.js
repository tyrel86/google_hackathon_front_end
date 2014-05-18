'use strict';

/* Services */

window.apiURL = 'http://localhost:3000/api/v1';


var usersServices = angular.module('usersServices', ['ngResource']);

usersServices.factory('User', ['$resource',
	function($resource) {
		return $resource(window.apiURL + '/users/search', {}, {
				query: {
						method: 'GET',
						isArray: true
				}
		});
	}
]);

usersServices.factory('CurrentUser', ['$resource',
    function($resource) {
        var current = {};

        return current;
    }
]);
