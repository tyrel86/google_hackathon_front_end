'use strict';

/* Filters */

// angular.module('phonecatFilters', []).filter('checkmark', function() {
//   return function(input) {
//     return input ? '\u2713' : '\u2718';
//   };
// });


angular.module('usersFilters', []).filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});