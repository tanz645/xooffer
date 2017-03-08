app.factory("authService", function($http, $q, $window,Config) {
  var userInfo;
  var call;
  function login(user) {

    call = $http.post(Config.authDomain+'/api/user',{
      username: user.username,
      email: user.email,
      password: user.password
    }).then(function(res){

      return res;
    },function(err){

      return err;

    });

    return call;
  }

  return {
    login: login
  };
});
