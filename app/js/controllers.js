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
        $scope.newUser = {
            firstName: "Bob",
            lastName: "Bobiton",
            mainPhone: "303-123-1234",
            email: "",
            familyMembers: []
        };
        $scope.addFamilyMember = function() {
            $scope.newUser.familyMembers.push({
                firstName: "",
                lastName: "",
                dob: ""
            });
        },
        $scope.submit = function() {
            debugger;
        }
    }
]);
userControllersMod.controller('StartCtrl', ['$scope', '$routeParams', '$location',
    function($scope, $routeParams, $location) {
        $scope.goTo = function(path) {
            $location.path(path);
        }
    }
]);

userControllersMod.filter('userPropFilter', function() {
  return function(input, filterProp) {
    if(!input) { return true;  }

    var results = [];
    for(var i=0; i < input.length; i++) {
      if(input[i].type == filterProp) {
        results.push(input[i]);
      }
    }
    return results;
  }
})
