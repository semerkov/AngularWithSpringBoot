angular.module('app.loginModule').factory('LoginService', function($q, $http, $resource, domain) {

    var LoginService = (function() {

        function LoginService() { }

        LoginService.transformRequest = function(obj) {
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

        LoginService.prototype.authenticate = function(user) {
            var deferred = $q.defer();
            var headers = {};

            var path = '/login/authenticate/';
            var url = domain + path;
            var options = {
                method: 'POST',
                url: url,
                data: user,
                headers: headers,
                transformRequest: LoginService.transformRequest
            };
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';

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

        LoginService.prototype.getLoggerUser = function() {
            var deferred = $q.defer();

            var path = '/login/';
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

        return new LoginService();
    })();

    return LoginService;

});