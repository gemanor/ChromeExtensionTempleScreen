'use strict';

/* Controllers */

var templeScreenControllers = angular.module('templeScreen.controllers', ['templeScreen.services']);
templeScreenControllers.controller('MainCtrl', ['$scope', 'webServices', '$filter', function($scope, webServices, $filter) {
        $scope.$on('user.update', function() {
            $scope.customMessages = webServices.userObject().customMessages;
            $scope.lectures = webServices.userObject().torahLectures;
            $scope.shabbosTimes = webServices.userObject().shabbosTimes;
            $scope.contributorsSlides = webServices.userObject().contributors;
            $scope.prayersTimes = webServices.userObject().prayersList;
            $scope.banquetsList = webServices.userObject().banquets;
            $scope.threeBox = webServices.userObject().threeBox;
            loadImage("http://tattoo-env-qkrjcm3ghq.elasticbeanstalk.com/" + webServices.userObject().image, function(uri) {
                $scope.logo = uri;
            });
            $scope.predicate = 'internal_order';
        });
        var loadImage = function(uri, callback) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function() {
                callback(window.webkitURL.createObjectURL(xhr.response), uri);
            };
            xhr.open('GET', uri, true);
            xhr.send();
        };
        $scope.$on('zmanim.update', function() {
            $scope.parasha = webServices.zmanimObject().leftTitle.parashatShavua.substring(5);
            $scope.candleLighting = webServices.zmanimObject().daysTimesTable;
            var friday = $filter('filter')($scope.candleLighting, {dayInWeek: 'ששי'}, true);
            var saturday = $filter('filter')($scope.candleLighting, {dayInWeek: 'שבת'}, true);
            var removeMinutes = function(time, minsToAdd) {
                function z(n) {
                    return (n < 10 ? '0' : '') + n;
                }
                ;
                var bits = time.split(':');
                var mins = bits[0] * 60 + +bits[1] + -minsToAdd;

                return z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
            };
            if (friday.length) {
                friday = friday[0];
            }
            if (saturday.length) {
                saturday = saturday[0];
            }
            $scope.candleLighting['enter'] = removeMinutes(friday.sunset.substring(0, friday.sunset.length - 3), '40');
            $scope.candleLighting['out'] = saturday.tzaitHakochavim.substring(0, saturday.tzaitHakochavim.length - 3);
            $scope.candleLighting['outRT'] = saturday.tzaitHakochavim72.substring(0, saturday.tzaitHakochavim72.length - 3);
        });
        webServices.userObject();
        $scope.returnCssClass = function(cssClass, condition, number) {

            return condition <= number === true ? 'singleRow' : '';
        };
    }]);
templeScreenControllers.controller('adColumnCtrl', ['$scope', 'webServices', '$http', function($scope, webServices, $http) {
        $scope.$on('user.update', function() {
            $scope.ads = $scope.columnProperties.side === "right" ? webServices.userObject().rightAdColumn : webServices.userObject().leftAdColumn;
            $scope.loadImages();
        });
        $scope.isImage = function(ad) {
            return ad.type === 'fullImage' ||
                    ad.type === 'duplicatedImage' ||
                    ad.type === 'halfImage';
        };
        $scope.isText = function(ad) {
            return ad.type === 'textualAd';
        };
        var loadImage = function(uri, callback) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function() {
                callback(window.webkitURL.createObjectURL(xhr.response), uri);
            };
            xhr.open('GET', uri, true);
            xhr.send();
        };
        var isUrl = function(s) {
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test(s);
        };
        $scope.loadImages = function() {
            for (var i = 0; i < $scope.ads.length; i++) {
                var ad = $scope.ads[i];
                if (isUrl(ad.src)) {
                    loadImage(ad.src, function(blob_uri, requested_uri) {
                        $scope.$apply(function(scope) {
                            for (var k = 0; k < scope.ads.length; k++) {
                                if (scope.ads[k].src === requested_uri) {
                                    scope.ads[k].imageUrl = blob_uri;
                                }
                            }
                        });
                    });
                } else {
                    $scope.ads[i].src = JSON.parse($scope.ads[i].src);
                }
            }
        };
    }]);
templeScreenControllers.controller('MainTitleCtrl', ['$scope', 'webServices', '$interval', 'dateFilter', function($scope, webServices, $interval, dateFilter) {
        $scope.$on('zmanim.update', function() {
            $scope.rightTitle = webServices.zmanimObject().rightTitle;
            $scope.leftTitle = webServices.zmanimObject().leftTitle;
        });
        $scope.$on('user.update', function() {
            webServices.zmanimObject();
        });
        webServices.userObject();

        $scope.time = dateFilter(new Date(), 'HH:mm:ss ');
        $interval(function() {
            $scope.time = dateFilter(new Date(), 'HH:mm:ss ');
        }, 500);
        $scope.leftTitleLength = function() {
            var length = 0;
            angular.forEach($scope.leftTitle, function(value, key) {
                length += value.length;
            });
            return length;
        };
    }]);
templeScreenControllers.controller('ZmanimTableCtrl', ['$scope', '$timeout', 'webServices', function($scope, $timeout, webServices) {
        $scope.$on('zmanim.update', function() {
            $scope.zmanimTableObj = webServices.zmanimObject().daysTimesTable;
        });
        $scope.$on('user.update', function() {
            webServices.zmanimObject();
        });
    }]);

