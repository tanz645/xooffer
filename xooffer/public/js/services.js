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
    // $http.post("/api/login", {
    //   userName: userName,
    //   password: password
    // }).then(function(result) {
    //   userInfo = {
    //     accessToken: result.data.access_token,
    //     userName: result.data.userName
    //   };
    //   $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
    //   deferred.resolve(userInfo);
    // }, function(error) {
    //   deferred.reject(error);
    // });
    //
  }

  return {
    login: login
  };
});
