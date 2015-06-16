'use strict';

var mainModel = angular.module('app', ['ui.bootstrap', 'ngAnimate', 'ngRoute', 'ngReallyClickModule', 'ngCookies', 'ngResource', 'pascalprecht.translate',
                                        'app.usersModule', 'app.loginModule']);
mainModel.controller('MainCtrl', function ($scope, $http, $q, $location, $timeout, $window, domain) {
    $scope.url = domain;
	
});

mainModel.constant('domain','http://localhost:8080');

mainModel.config(
    [ '$routeProvider', '$locationProvider', '$httpProvider', '$translateProvider', function($routeProvider, $locationProvider, $httpProvider, $translateProvider) {

        $routeProvider.when('/', {
            templateUrl : 'app/home.html',
            controller  : 'MainCtrl'
        })
        .when('/user/register/', {
            templateUrl : 'app/users/view/userRegistration.html',
            controller  : 'UserRegistrationCtrl'
        })
        .when('/user/register/:userid', {
            templateUrl : 'app/users/view/userRegistration.html',
            controller  : 'UserRegistrationCtrl'
        })

        .when('/user', {
            templateUrl : 'app/users/view/usersList.html',
            controller  : 'UsersListCtrl'
        })
        .when('/login', {
            templateUrl : 'app/login/login.html',
            controller  : 'LoginCtrl'
        })
    ;
    /* Register error provider that shows message on failed requests or redirects to login page on
     * unauthenticated requests */
    $httpProvider.interceptors.push(function ($q, $rootScope, $location) {
            return {
                'responseError': function(rejection) {
                    var status = rejection.status;
                    var config = rejection.config;
                    var method = config.method;
                    var url = config.url;

                    if (status == 401) {
                        $location.path( "/login" );
                    } else {
                        $rootScope.error = method + " on " + url + " failed with status " + status;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    );

    /* Registers auth token interceptor, auth token is either passed by header or by query parameter
     * as soon as there is an authenticated user */
    $httpProvider.interceptors.push(function ($q, $rootScope) {
            return {
                'request': function(config) {
                    if (angular.isDefined($rootScope.authToken)) {
                        var authToken = $rootScope.authToken;

                        /* When set to false a query parameter is used to pass on the auth token.
                         * This might be desirable if headers don't work correctly in some
                         * environments and is still secure when using https. */
                        var useAuthTokenHeader = true;
                        if (useAuthTokenHeader) {
                            config.headers['X-Auth-Token'] = authToken;
                        } else {
                            config.url = config.url + "?token=" + authToken;
                        }
                    }
                    return config || $q.when(config);
                }
            };
        }
    );


    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('enUS');
    $translateProvider.useStaticFilesLoader({
        prefix: 'app/general/languages/',
        suffix: '.json'
    });
}]);

mainModel.run(function($rootScope, $location, $cookieStore, LoginService) {
    LoginService = new LoginService();
    $rootScope.$on('$viewContentLoaded', function() {
        delete $rootScope.error;
    });

    $rootScope.logout = function() {
        delete $rootScope.loggedUser;
        delete $rootScope.authToken;
        $cookieStore.remove('authToken');
        $location.path("/login");
    };

    /* Try getting valid user from cookie or go to login page */
    var originalPath = $location.path();
    $location.path("/login");
    var authToken = $cookieStore.get('authToken');
    if (authToken !== undefined) {
        $rootScope.authToken = authToken;
        var promisseUser = LoginService.getLoggerUser();
        promisseUser.then(function(user) {
            $rootScope.loggedUser = user;
            if (originalPath == "/login") {
                $location.path("/");
            } else {
                $location.path(originalPath);
            }
        }, function(reason) {
            // Print error message
        });
    }

    $rootScope.initialized = true;
});

module.run( function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        if ( $rootScope.loggedUser == null ) {
            if ( next.templateUrl == "/login" ) {
            } else {
                $location.path( "/login" );
            }
        }
    });
})