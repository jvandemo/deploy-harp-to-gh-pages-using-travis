(function () {

  angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('homepage', {
          url: '/homepage',
          views: {
            'content@': {
              templateUrl: 'components/homepage/homepage.html'
            }
          }
        });

    }]);

})();
