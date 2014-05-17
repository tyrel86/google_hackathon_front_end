'use strict';

/* Controllers */

var userControllersMod = angular.module('usersControllers', []);

userControllersMod.controller('UserCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('json/survivors.json').success(function(data) {
            $scope.users = data;
        })
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

userControllersMod.controller('RegisterCtrl', ['$scope', '$routeParams', 'User',
    function($scope, $routeParams, User) {
    }
]);
userControllersMod.controller('StartCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
      $scope.goTo = function(path) {
        $location.path(path);
      }
    }
]);
