var module = angular.module('app.usersModule');
module.factory('usersModuleResource', ['$q', '$http', '$rootScope', 'domain', function($q, $http, $rootScope, domain) {
        'use strict';

        /**
         *
         * @class resource
         * @param {(string|object)} [domainOrOptions] - The project domain or options object. If object, see the object's optional properties.
         * @param {string} [domainOrOptions.domain] - The project domain
         * @param {string} [domainOrOptions.cache] - An angularjs cache implementation
         * @param {object} [domainOrOptions.token] - auth token - object with value property and optional headerOrQueryName and isQuery properties
         * @param {string} [cache] - An angularjs cache implementation
         */
        var resource = (function() {
            function resource() {
                //wtv
            }
            /*function resource(options, cache) {
                cache = cache || ((typeof options === 'object') ? options.cache : cache);
                this.cache = cache;
                this.token = (typeof options === 'object') ? (options.token ? options.token : {}) : {};
            }*/

            resource.prototype.$on = function($scope, path, handler) {
                var url = domain + path;
                $scope.$on(url, function() {
                    handler();
                });
                return this;
            };

            resource.prototype.$broadcast = function(path) {
                var url = domain + path;
                //cache.remove(url);
                $rootScope.$broadcast(url);
                return this;
            };

            resource.transformRequest = function(obj) {
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
             * @name resource#setToken
             * @param {string} value - token's value
             * @param {string} headerOrQueryName - the header or query name to send the token at
             * @param {boolean} isQuery - true if send the token as query param, otherwise, send as header param
             *
             */
            resource.prototype.setToken = function(value, headerOrQueryName, isQuery) {
                this.token.value = value;
                this.token.headerOrQueryName = headerOrQueryName;
                this.token.isQuery = isQuery;
            };

            /**
             * Loads a list of User
             * @method
             * @name resource#getUserList
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
            resource.prototype.getUserList = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
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
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
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
                    options.transformRequest = resource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
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
             * @name resource#postUser
             * @param {} body -
             *
             */
            resource.prototype.postUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
                var path = '/users/';

                var body;
                var queryParameters = {};
                var headers = {};
                var form = {};

                if (parameters['body'] !== undefined) {
                    body = parameters['body'];
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
                    method: 'POST',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = resource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
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
             * @name resource#getUser
             * @param {string} userid - Identifier of the User
             *
             */
            resource.prototype.getUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
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
                var cached = parameters.$cache && parameters.$cache.get(url);
                if (cached !== undefined && parameters.$refresh !== true) {
                    deferred.resolve(cached);
                    return deferred.promise;
                }
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
                    options.transformRequest = resource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
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
             * @name resource#putUser
             * @param {string} userid - Identifier of the User
             * @param {} body -
             *
             */
            resource.prototype.putUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
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

                if (parameters['body'] !== undefined) {
                    body = parameters['body'];
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
                    method: 'PUT',
                    url: url,
                    params: queryParameters,
                    data: body,
                    headers: headers
                };
                if (Object.keys(form).length > 0) {
                    options.data = form;
                    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    options.transformRequest = resource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
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
             * @name resource#deleteUser
             * @param {string} userid - Identifier of the User
             *
             */
            resource.prototype.deleteUser = function(parameters) {
                if (parameters === undefined) {
                    parameters = {};
                }
                var deferred = $q.defer();

                var domain = this.domain;
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
                    options.transformRequest = resource.transformRequest;
                }
                $http(options)
                    .success(function(data, status, headers, config) {
                        deferred.resolve(data);
                        if (parameters.$cache !== undefined) {
                            parameters.$cache.put(url, data, parameters.$cacheItemOpts ? parameters.$cacheItemOpts : {});
                        }
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

            return resource;
        })();

        return resource;
    }]);