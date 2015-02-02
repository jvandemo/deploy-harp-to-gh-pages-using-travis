describe('app module', function(){

  var module,
    dependencies = [];

  function requiresModule(module) {
    return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {
    module = angular.module('app');
    dependencies = module.requires;
  });

  it('should exist', function(){
    expect(module).to.be.ok;
  });

  it('should require the app.config module', function(){
    expect(requiresModule('app.config')).to.be.ok;
  });

});