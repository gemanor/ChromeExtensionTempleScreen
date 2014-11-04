'use strict';

/* Directives */
var templeScreenDirectives = angular.module('templeScreen.directives', []);
templeScreenDirectives.directive('adColumn', [function() {
        return {
            controller: "adColumnCtrl",
            templateUrl: "partials/adColumn.html",
            scope: {
                columnProperties: "=columnProperties"
            }
        };
    }]);
templeScreenDirectives.directive('ngSmallClass', [function() {
        return {
            scope: {
                "smallerString": "="
            },
            link: function(scope, element, attr) {
                scope.$watch('smallerString', function() {
                    isSmall();
                });
                var isSmall = function() {
                    if (scope.smallerString <= attr.smallerFrom) {
                        console.log(element.addClass('singleRow'));
                    }
                };
            }
        };
    }]);
templeScreenDirectives.directive('ngAutomaticFontSize', [function() {
        return {
            scope: {
                autoSizeData: "="
            },
            link: function(scope, element, attr) {
                var parentHeight = function() {
                    if (attr.parentHeight) {
                        return parseInt(attr.parentHeight);
                    }
                    return parseInt(element.parent().css('height')) - parseInt(element.parent().css('paddingTop')) - parseInt(element.parent().css('paddingBottom'));
                };
                var selfHeight = function() {
                    return parseInt(element.css('height'));
                };
                scope.$watch('autoSizeData', function() {
                    fontChangeLoop();
                });
                var fontChangeLoop = function() {
                    while (selfHeight() - 2 > parentHeight()) {
                        element.css({fontSize: "-=1"});
                    }
                    element.css({fontSize: "+=1"});
                };
            }
        };
    }]);
templeScreenDirectives.directive('mainTitle', [function() {
        return {
            controller: 'MainTitleCtrl',
            restrict: "E",
            templateUrl: "partials/mainTitle.html"
        };
    }]);
templeScreenDirectives.directive('clock', function($timeout, dateFilter) {
    return function(scope, element, attrs) {
        var timeoutId; // timeoutId, so that we can cancel the time updates

        // schedule update in one second
        function updateLater() {
            // save the timeoutId for canceling
            timeoutId = $timeout(function() {
                element.text(dateFilter(new Date(), 'HH:mm:ss '));
                updateLater(); // schedule another update
            }, 1000);
        }

        // listen on DOM destroy (removal) event, and cancel the next UI update
        // to prevent updating time ofter the DOM element was removed.
        element.bind('$destroy', function() {
            $timeout.cancel(timeoutId);
        });

        updateLater(); // kick off the UI update process.
    }
});
templeScreenDirectives.directive('daysPrayersTime', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/daysPrayersTime.html"
        };
    }]);
templeScreenDirectives.directive('compile', function($compile) {
// directive factory creates a link function
    return function(scope, element, attrs) {
        scope.$watch(
                function(scope) {
                    return scope.$eval(attrs.compile);
                },
                function(value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                }
        );
    };
});
templeScreenDirectives.directive('cycle', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var attrs = attrs;
            function setCycle(type) {
                var slideAttrs,
                        visibleElements = attrs.cycleVisible || 0,
                        speed = Math.floor(Math.random() * (3500 - 3000 + 1)) + 3000;
                if (visibleElements < $(element).children().length) {
                    if (attrs.cycle === 'vertCarousel') {
                        slideAttrs = {
                            fx: 'carousel',
                            slides: "> li",
                            timeout: 2000,
                            carouselVisible: visibleElements,
                            speed: 1000,
                            log: true,
                            carouselVertical: true};
                    } else if (attrs.cycle === 'messagesFade') {
                        slideAttrs = {
                            slides: "> article",
                            speed: speed,
                            fx: 'scrollHorz',
                            log: false
                        };
                    }
                    $(element).cycle(slideAttrs);
                }
            }
            function destroyCycle() {
                var visibleElements = attrs.cycleVisible || 0;
                if (visibleElements < $(element).children().length) {
                    $(element).cycle('destroy');
                }
            }
            scope.$on('user.start', function() {
                destroyCycle();
            });
            scope.$on('user.update', function() {
                setTimeout(function() {
                    setCycle();
                }, 1);
            });
        }
    };
});
templeScreenDirectives.directive('slick', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var attrs = attrs;
            function setCycle(type) {
                var slideAttrs,
                        visibleElements = attrs.cycleVisible || 0;
                if (visibleElements < $(element).children().length) {
                    if (attrs.slick === 'vertCarousel') {
                        slideAttrs = {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            accessibility: false,
                            arrows: false,
                            autoplay: true,
                            autoplaySpeed: 4000,
                            speed: 1000,
                            vertical: true,
                            dots: false
                        };
                    }
                    else if (attrs.slick === 'messagesFade') {
                        slideAttrs = {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            accessibility: false,
                            arrows: false,
                            dots: false,
                            autoplay: true,
                            autoplaySpeed: 6000,
                            speed: 2000
                        };
                    }
                    $(element).unslick();
                    $(element).find('.slick-list').remove();
                    setTimeout(function() {
                        console.log($(element).slick(slideAttrs));
                    }, 100);
                }
            }
            scope.$on('user.update', function() {
                setTimeout(function() {
                    setCycle();
                }, 1);
            });
        }
    };
});
templeScreenDirectives.directive('customMessages', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/customMessages.html"
        };
    }]);
templeScreenDirectives.directive('shabbosPrayersTime', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/shabbosPrayersTime.html"
        };
    }]);
templeScreenDirectives.directive('parnasHayom', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/parnasHayom.html"
        };
    }]);
templeScreenDirectives.directive('banquetMessages', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/banquet.html"
        }
    }]);
templeScreenDirectives.directive('zmanimTable', [function() {
        return {
            controller: 'ZmanimTableCtrl',
            restrict: "E",
            templateUrl: "partials/zmanimTable.html"
        };
    }]);
templeScreenDirectives.directive('timesOfTorah', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/timesOfTorah.html"
        };
    }]);
templeScreenDirectives.directive('threeBox', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/threeBox.html"
        };
    }]);
templeScreenDirectives.directive('bottomRow', [function() {
        return {
            restrict: "E",
            templateUrl: "partials/bottomRow.html"
        };
    }]);
