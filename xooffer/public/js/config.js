app.factory("Config", function($http, $q, $window) {

  return {
    appSecret: '',
    authDomain: 'http://localhost:3005',
    accountType:{
      basic:'BASIC',
      admin:'ADMIN',
      vendor:'VENDOR'
    },
    api:{
      offer:'http://localhost:3010'
    }
  };
});
