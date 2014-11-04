'use strict';
/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var templeScreenServices = angular.module('templeScreen.services', []);
templeScreenServices.factory('webServices', function($http, $rootScope, $interval) {
    var zmanimServiceHost = 'http://zmanimapi-dev-env.elasticbeanstalk.com';
    var dataObjects = {};
    var webRequest = function(action) {
        var url,
                requestObj = null;
        if (action === 'user') {
            url = 'http://tattoo-env-qkrjcm3ghq.elasticbeanstalk.com/';
            webRequestSelf(url, action);
        } else if (action === 'zmanim') {
            if (!dataObjects['user']) {
                return;
            }
            var shulLocation;
            shulLocation = dataObjects.user.location;
            url = zmanimServiceHost + '/getZmanim?lat=' + shulLocation.lat + '&lng=' + shulLocation.lng + '&locationName=Jerusalem, IL&elevation=' + shulLocation.eva;
            webRequestSelf(url, action);
        }
    };
    var webRequestSelf = function(url, action) {
        $rootScope.$broadcast(action + '.start');
        $http.get(url)
                .success(function(data) {
                    if (typeof data !== 'object') {
                        if (chrome.app.window) {
                            chrome.app.window.create('login.html', {}, function(window) {
                                window.onClosed.addListener(function() {
                                    console.log(webRequest('user'));
                                });
                            });
                            return;
                        } else {
                            window.location.href = 'http://tattoo-env-qkrjcm3ghq.elasticbeanstalk.com/';
                        }
                    }
                    dataObjects[action] = data;
                    $rootScope.$broadcast(action + '.update');
                })
                .error(function(data) {
                    
                });
    };
    var webRequestInterval = function(action) {
        $interval(function() {
            webRequest(action);
        }, (60*1000*10));
    };
    return {
        zmanimObject: function() {
            if (dataObjects['zmanim'] === undefined) {
                dataObjects['zmanim'] = {};
                webRequest('zmanim');
                webRequestInterval('zmanim');
                return;
            }
            return dataObjects['zmanim'];
        },
        userObject: function() {
            if (dataObjects['user'] === undefined) {
                dataObjects['user'] = {};
                webRequest('user');
                webRequestInterval('user');
                return;
            }
            return dataObjects['user'];
        }
    };
});