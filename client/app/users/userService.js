var module = angular.module('app.usersModule');
module.factory('UsersModuleResource', ['$q', '$http', '$rootScope', 'domain', function($q, $http, $rootScope, domain) {
        'use strict';

        /**
         *
         * @class UsersModuleResource
         * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
         * @param {string} [domainOrOptions.domain] - The project domain
         * @param {string} [domainOrOptions.cache] - An angularjs cache implementation
         * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
         * @param {string} [cache] - An angularjs cache implementation
         */
        var UsersModuleResource = (function() {
            function UsersModuleResource() { }

            UsersModuleResource.prototype.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            UsersModuleResource.prototype.$broadcast = function(path) {
                var url = domain + path;
                $rootScope.$broadcast(url);
                return this;
            };

            UsersModuleResource.transformRequest = function(obj) {
                var str = [];
                for (var p in obj) {
                    var val = obj[p];
                    if (angular.isArray(val)) {
                        val.forEach(function(val) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                        });
                    } else {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(val));
                    }
                }
                return str.join("&");
            };

            /**
             * Set Token
             * @method
             * @name UsersModuleResource#setToken
             * @param {string} value - token's value
             * @param {string} headerOrQueryName - the header or query name to send the token at
             * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
             *
             */
            UsersModuleResource.prototype.setToken = function(value, headerOrQueryName, isQuery) {
                this.token.value = value;
                this.token.headerOrQueryName = headerOrQueryName;
                this.token.isQuery = isQuery;
            };

            /**
             * Loads a list of User
             * @method
             * @name UsersModuleResource#getUserList
             * @param {string} email - Allows to filter the collections of result by the value of field email
             * @param {string} id - Allows to filter the collections of result by the value of field id
             * @param {string} password - Allows to filter the collections of result by the value of field password
             * @param {string} $size - Size of the page to retrieve. Integer value
             * @param {string} login - Allows to filter the collections of result by the value of field login
             * @param {string} $sort - Order in which to retrieve the results. Mutliple sort criteria can be passed. Example: sort=age ASC,height DESC
             * @param {string} $page - Number of the page to retrieve. Integer value.
             * @param {string} name - Allows to filter the collections of result by the value of field name
             *
             */
            UsersModuleResource.prototype.getUserList = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['email'] !== undefined) {
                    queryParameters['email'] = parameters['email'];
                }

                if (parameters['id'] !== undefined) {
                    queryParameters['id'] = parameters['id'];
                }

                if (parameters['password'] !== undefined) {
                    queryParameters['password'] = parameters['password'];
                }

                if (parameters['$size'] !== undefined) {
                    queryParameters['$size'] = parameters['$size'];
                }

                if (parameters['login'] !== undefined) {
                    queryParameters['login'] = parameters['login'];
                }

                if (parameters['$sort'] !== undefined) {
                    queryParameters['$sort'] = parameters['$sort'];
                }

                if (parameters['$page'] !== undefined) {
                    queryParameters['$page'] = parameters['$page'];
                }

                if (parameters['name'] !== undefined) {
                    queryParameters['name'] = parameters['name'];
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'GET',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = UsersModuleResource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Adds a User
             * @method
             * @name UsersModuleResource#saveUser
             * @param {} user -
             *
             */
            UsersModuleResource.prototype.saveUser = function(user) {
                if (user === undefined) {
                    user = {};
                    // remember to throw exception
                }
                var deferred = $q.defer();
                var path = '/users/';

                var headers = {};

                var url = domain + path;
                var options = {
                    method: 'POST',
                    url: url,
                    data: {id: user.id, name: user.name, email: user.email, login: user.login, password: user.password},
                    headers: headers
                };
                options.headers['Content-Type'] = 'application/json';

                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Loads a User
             * @method
             * @name UsersModuleResource#getUser
             * @param {string} userid - Identifier of the User
             *
             */
            UsersModuleResource.prototype.getUser = function(userid) {
                if (userid === undefined) {
                    // remember to throw exception
                }
                var deferred = $q.defer();

                var path = '/users/{userid}';
                path = path.replace('{userid}', userid);

                var url = domain + path;
                var options = {
                    method: 'GET',
                    url: url
                };
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Stores a User
             * @method
             * @name UsersModuleResource#updateUser
             * @param {string} userid - Identifier of the User
             * @param {} body -
             *
             */
            UsersModuleResource.prototype.updateUser = function(user) {
                if (user === undefined) {
                    // remember to throw exception
                }
                var deferred = $q.defer();


                var headers = {};

                var path = '/users/{userid}';
                path = path.replace('{userid}', user.id);
                var url = domain + path;
                var options = {
                    method: 'PUT',
                    url: url,
                    data: {name: user.name, email: user.email, login: user.login, password: user.password},
                    headers: headers
                };
                options.headers['Content-Type'] = 'application/json';

                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };
            /**
             * Deletes a User
             * @method
             * @name UsersModuleResource#deleteUser
             * @param {string} userid - Identifier of the User
             *
             */
            UsersModuleResource.prototype.deleteUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var path = '/users/{userid}';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                path = path.replace('{userid}', parameters['userid']);

                if (parameters['userid'] === undefined) {
                    deferred.reject(new Error('Missing required  parameter: userid'));
                    return deferred.promise;
                }

                if (parameters.$queryParameters) {
                    Object.keys(parameters.$queryParameters)
                        .forEach(function(parameterName) {
                            var parameter = parameters.$queryParameters[parameterName];
                            queryParameters[parameterName] = parameter;
                        });
                }

                var url = domain + path;
                var options = {
                    timeout: parameters.$timeout,
                    method: 'DELETE',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = UsersModuleResource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        deferred.reject({
                            status: status,
                            headers: headers,
                            config: config,
                            body: data
                        });
                    });

                return deferred.promise;
            };

            return UsersModuleResource;
        })();

        return UsersModuleResource;
    }]);