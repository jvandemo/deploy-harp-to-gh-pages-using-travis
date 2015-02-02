(function () {

  angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('home', {
          url: '/',
          views: {
            'content@': {
              templateUrl: 'components/homepage/homepage.html'
            }
          }
        });

    }]);

})();
