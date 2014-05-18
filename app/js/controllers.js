'use strict';

/* Controllers */

var userControllersMod = angular.module('usersControllers', []);

userControllersMod.controller('UsersCtrl', ['$scope', '$http', 'User',
	function($scope, $http, User) {
		User.query(function(data) {
      for(var i=0; i < data.length; i++) {
        data[i].selected = false;
      }
			$scope.users = data;
		});

    $scope.selectUser = function(user) {
      user.selected = !user.selected;
    }

    $scope.selectNone = function() {
      for(var i=0; i < $scope.users.length; i++) {
        $scope.users[i].selected = false;
      }
    }

    $scope.sendText = function(user) {
      $http({
        url: window.apiURL + '/users/' + user.id + '/text',
        params: {body: $scope.messageBody},
        method: 'GET'
      })
    }

    $scope.sendTexts = function() {
      for(var i=0; i < $scope.users.length; i++) {
        if($scope.users[i].selected) {
          $scope.sendText($scope.users[i]);
        }
      }
      $scope.selectNone();
      $('#myModal').modal('hide')
    }

		$scope.type = 'survivor';

    window.lol = $scope;
	}
]);

userControllersMod.controller('UserDetailCtrl', ['$scope', '$routeParams', 'User', '$http',
    function($scope, $routeParams, User, $http) {
        $scope.user = {};

        $http({
            url: window.apiURL + '/users/' + $routeParams.userId,
            method: 'GET'
        }).success(function(data) {
            $scope.user = data;
            if ($scope.user.other_concerns){
            $scope.user.other_concerns.split(',').map(function(item,index){$scope.user[item]= true})
            };
            // debugger;
            if ($scope.user.last_lat){
                $scope.user.mapurl = "http://maps.google.com/maps?q=description+(name)+%40"+$scope.user.last_lat+","+$scope.user.last_lng+"&output=embed";
                $scope.user.map = true;
                // document.mapbox.location.href = $scope.user.mapurl;
            };
            // debugger;
        });
    }
]);


userControllersMod.controller('HeaderCtrl', ['$scope', '$http', 'User',
    function($scope, $http, User) {
        $scope.message = "Welcome to.."
    }
]);

userControllersMod.controller('PetFinderCtrl', ['$scope',
    function($scope) {
        $scope.animal_types = ["barnyard", "bird", "cat", "dog", "horse", "pig", "reptile", "smallfurry"];
        $scope.animal_type = "cat";


        $scope.refresh = function() {
            var typeFilter = '&animal=' + $scope.animal_type;
            $.getJSON('http://api.petfinder.com/pet.find?format=json&key=f6c88b745b5f55ea539c65ebac486d05&location=80211&callback=?' + typeFilter)
                .done(function(petApiData) {
                    $scope.pets = petApiData.petfinder.pets.pet;
                    $scope.$apply();
                })
                .error(function(err) {
                    alert('Error retrieving data!');
                });
        }

        $scope.refresh();
    }
]);

userControllersMod.controller('RegisterCtrl', ['$scope', '$routeParams', '$location', '$http',
    function($scope, $routeParams, $location, $http) {
        $scope.set_coordinates = function(position) {
            $scope.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        }

        navigator.geolocation.getCurrentPosition($scope.set_coordinates);

        $scope.goTo = function(path) {
            var tempUser = {
                user_first_name: $scope.newUser.firstName,
                user_last_name: $scope.newUser.lastName,
                user_cell_phone: $scope.newUser.mainPhone
            };
            // initial create user on server
            $http({
                url: window.apiURL + '/users/create',
                params: tempUser,
                method: 'GET'
            }).success(function(data) {
                $scope.setLocation(data.user.id);
                $location.path(path + '/' + data.user.id);
            });
        }

        $scope.setLocation = function(user_id) {
            if (!$scope.location) {
                return true;
            }
            $http({
                url: window.apiURL + '/users/' + user_id + '/update_last_location',
                params: $scope.location,
                method: 'GET'
            })
        }
    }
]);
userControllersMod.controller('Register1Ctrl', ['$scope', '$routeParams', '$location', '$http',
    function($scope, $routeParams, $location, $http) {
        var userId = $routeParams.id;

        // have access to the newUser in the DOM
        $scope.newUser = {};

        // empty family members array
        $scope.familyMembers = [];

        // get just created user info
        $http.get(window.apiURL + '/users/' + userId).success(function(data) {
            $scope.newUser = data;
        })

        $scope.addFamilyMember = function() {
            // debugger;
            $scope.familyMembers.push({
                firstName: "",
                lastName: "",
                dob: ""
            });
        },
        $scope.submit = function() {
            // debugger;
            console.log('submit the data!');
            var concerns = "concerns";
            if ($scope.newUser.medical){
                concerns = concerns + ",medical"
            }
            if ($scope.newUser.financial){
            concerns = concerns + ",financial"
            }
            if ($scope.newUser.food){
            concerns = concerns + ",food"
            }
            var updateUser = {
                id: $scope.newUser.id,
                user_email:$scope.newUser.email,
                user_other_concerns: concerns
            }

            $http({
                url: window.apiURL + '/users/update',
                params: updateUser,
                method: 'GET'
            }).success(function(data) {
                // debugger;
                $location.path('/users/' + data.user.id);
            });
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
        if(window.previousFilterCount != results.length) {
          window.previousFilterCount = results.length;
          SaveMyAss.draw_map(results);
        }
        return results;
    }
})
