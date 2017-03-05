app.factory("Config", function($http, $q, $window) {

  return {
    appSecret: '',
    authDomain: 'http://localhost:3005'
  };
});
