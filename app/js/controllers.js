'use strict';

/* Controllers */

var userControllersMod = angular.module('usersControllers', []);

userControllersMod.controller('UserCtrl', ['$scope', '$http', 'User',
    function($scope, $http, User) {
        $scope.users = [];
        User.query(function(data) {
            $scope.users = data;
        });

        $scope.type = 'survivor';
    }
]);

userControllersMod.controller('HeaderCtrl', ['$scope', '$http', 'User',
    function($scope, $http, User) {
			$scope.message = "Welcome to.."
    }
]);

userControllersMod.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
    function($scope, $routeParams, User) {
        $scope.user = User.get({
            userId: $routeParams.guid
        }, function(user) {
            $scope.mainImageUrl = user.picture;
        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImageUrl = imageUrl;
        }
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
            // console.log($http);
            // debugger;
            // initial create user on server
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
            // debugger;
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
        return results;
    }
})
