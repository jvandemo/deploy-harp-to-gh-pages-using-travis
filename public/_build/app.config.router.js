(function () {

  angular.module('app')
    .config(enableHtml5Routing)
    .config(addDefaultRoutes);

  /**
   * Enable HTML5 routing mode
   */
  function enableHtml5Routing($locationProvider) {
    // $locationProvider.html5Mode(true);
  }

  // Inject dependencies;
  enableHtml5Routing.$inject = ['$locationProvider'];

  /**
   * Set up basic routes
   *
   * All other routes should ideally live in their own file
   * inside a component directory
   *
   * @param $stateProvider
   * @param $urlRouterProvider
   */
  function addDefaultRoutes($stateProvider, $urlRouterProvider){

    // If the url is ever invalid, e.g. '/unknown-url', then redirect to '/' aka the home state
    $urlRouterProvider
      .otherwise('#!/homepage');
  }

  // Inject dependencies;
  addDefaultRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

})();
