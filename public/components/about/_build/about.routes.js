(function () {

  angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('about', {
          url: '/about',
          views: {
            'content@': {
              templateUrl: 'components/about/about.html'
            }
          }
        });

    }]);

})();
