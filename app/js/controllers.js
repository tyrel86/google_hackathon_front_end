'use strict';

/* Controllers */

// var phonecatControllers = angular.module('phonecatControllers', []);

// phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
//   function($scope, Phone) {
//     $scope.phones = Phone.query();
//     $scope.orderProp = 'age';
//   }]);

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });

//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);

// phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
//     function($scope, $http) {
//         $http.get('phones/phones.json').success(function(data) {
//             $scope.phones = data;
//         });

//         $scope.orderProp = 'age';
//     }
// ]);

var usersControllers = angular.module('usersControllers', []);

usersControllers.controller('UserCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('json/survivors.json').success(function(data) {
            $scope.users = data;
        })
    }
]);

usersControllers.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User',
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