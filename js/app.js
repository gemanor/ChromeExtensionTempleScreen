'use strict';


// Declare app level module which depends on filters, and services
angular.module('templeScreen', [
    'ngRoute',
    'templeScreen.filters',
    'templeScreen.services',
    'templeScreen.directives',
    'templeScreen.controllers'
]).config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
        var oldWhiteList = $compileProvider.imgSrcSanitizationWhitelist();
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
    }]);
