'use strict';

/* App Module */

var usersApp = angular.module('usersApp', [
    'ngRoute',
    'phonecatAnimations',
    'usersControllers',
    'usersFilters',
    'usersServices',
]);

usersApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/start', {
            templateUrl: 'partials/start.html',
            controller: 'StartCtrl'
        }).
        when('/register', {
            templateUrl: 'partials/registration-0.html',
            controller: 'RegisterCtrl'
        }).
        when('/register1/:id', {
            templateUrl: 'partials/registration-1.html',
            controller: 'Register1Ctrl'
        }).
        when('/users', {
            templateUrl: 'partials/users-list.html',
            controller: 'UsersCtrl'
        }).
        when('/users/:userId', {
            templateUrl: 'partials/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/pet_finder', {
            templateUrl: 'partials/pet-finder.html',
            controller: 'PetFinderCtrl'
        }).
        otherwise({
            redirectTo: '/start'
        });
    }
]);

window.SaveMyAss = {}
SaveMyAss.markers = [];
SaveMyAss.map_init = function() {
	var mapOptions = {
		center: new google.maps.LatLng(40, -106),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	SaveMyAss.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
SaveMyAss.clear_markers = function() {
	$.each(SaveMyAss.markers, function(index, marker) {
		marker.setMap(null)
	});
	SaveMyAss.markers = []
}
SaveMyAss.addMarkers = function(results) {

	$.each(results, function(index, user) {
		var userLatlng = new google.maps.LatLng(user.last_lat, user.last_lng);
		var marker = new google.maps.Marker({
				position: userLatlng,
				title: user.first_name + " " + user.last_name
		});

		var contentString = "<div>" +
			"<a href='#/users/" + user.id + "'>" +
			"<h3>" + user.first_name + " " + user.last_name + "</h3></a>" +
			"<p><a href='mailto:" + user.email + "'>" + user.email + "</a></p>" +
			"<a href='tel:" + user.phone + "'>" + user.phone + "</a>" +
			"<p>" + user.type + "</p>" +
			"</div>";

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(SaveMyAss.map,marker);
		});

		SaveMyAss.markers.push(marker);
	});

	$.each(SaveMyAss.markers, function(index, markers) {
		markers.setMap(SaveMyAss.map);
	});
}
SaveMyAss.draw_map = function(results) {
	SaveMyAss.map_init();
	SaveMyAss.clear_markers();
	SaveMyAss.addMarkers(results);
}
