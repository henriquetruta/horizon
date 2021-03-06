var horizonApp = angular.module('hz', ['hz.conf', 'hz.utils', 'ngCookies'])
  .config(['$interpolateProvider', '$httpProvider',
    function ($interpolateProvider, $httpProvider) {
      $interpolateProvider.startSymbol('{$');
      $interpolateProvider.endSymbol('$}');
      $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    }])
  .run(['hzConfig', 'hzUtils', '$cookieStore',
    function (hzConfig, hzUtils, $cookieStore) {
      //expose the configuration for horizon legacy variable
      horizon.conf = hzConfig;
      horizon.utils = hzUtils;
      angular.extend(horizon.cookies = {}, $cookieStore);
      horizon.cookies.put = function (key, value) {
        //cookies are updated at the end of current $eval, so for the horizon
        //namespace we need to wrap it in a $apply function.
        angular.element('body').scope().$apply(function () {
          $cookieStore.put(key, value);
        });
      };
    }]);

