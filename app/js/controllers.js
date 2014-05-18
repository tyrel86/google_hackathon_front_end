'use strict';

/* Controllers */

var userControllersMod = angular.module('usersControllers', []);

userControllersMod.controller('UsersCtrl', ['$scope', '$http', 'User',

	function($scope, $http, User) {
		//After ajax call
		User.query(function(data) {
			$scope.users = data;
		});

		$scope.type = 'survivor';
	}
]);

userControllersMod.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User', '$http',
	function($scope, $routeParams, User, $http) {
		$http({
			url: window.apiURL + '/users/' + $routeParams.userId,
			method: 'GET'
		}).success(function(data) {
			$scope.user = data
			console.log($scope)
		});
	}
]);


userControllersMod.controller('HeaderCtrl', ['$scope', '$http', 'User',
    function($scope, $http, User) {
			$scope.message = "Welcome to.."
    }
]);


userControllersMod.controller('RegisterCtrl', ['$scope', '$routeParams', '$location', '$http',
    function($scope, $routeParams, $location, $http) {
        $scope.goTo = function(path) {

            var tempUser = {
                user_first_name: $scope.newUser.firstName,
                user_last_name: $scope.newUser.lastName,
                user_cell_phone: $scope.newUser.mainPhone
            };
            $http({
                url: window.apiURL + '/users/create',
                params: tempUser,
                method: 'GET'
            }).success(function(data) {
                $location.path(path + '/' + data.user.id);
            });
        }


    }
]);
userControllersMod.controller('Register1Ctrl', ['$scope', '$routeParams', '$location', '$http',
    function($scope, $routeParams, $location, $http) {


        var userId = $routeParams.id;
        // debugger;

        // have access to the newUser in the DOM
        $scope.newUser = {};

        // get just created user info
        $http.get(window.apiURL + '/users/' + userId).success(function(data) {
            $scope.newUser = data;
            $scope.newUser.familyMembers = [];
            // debugger;
        })

        $scope.addFamilyMember = function() {
            $scope.newUser.familyMembers.push({
                firstName: "",
                lastName: "",
                dob: ""
            });
        },
        $scope.submit = function() {
            console.log('submit the data!');
        }
    }
]);
userControllersMod.controller('StartCtrl', ['$scope', '$routeParams', '$location', 'User',
    function($scope, $routeParams, $location, User) {
        $scope.goTo = function(path) {
            $location.path(path);
        }
    }
]);

userControllersMod.filter('userPropFilter', function() {
    return function(input, filterProp) {
			if (!input) {
					return true;
			}

			var results = [];
			for (var i = 0; i < input.length; i++) {
					if (input[i].type == filterProp) {
							results.push(input[i]);
					}
			}
			SaveMyAss.draw_map(results);
			return results;
    }
})
