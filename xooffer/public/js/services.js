app.factory("AuthService", function($http, $q, $window,Config,$localstorage,$location,jwtHelper,$rootScope) {
  var userInfo;
  var call;
  function register(user) {

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

  function resendEmail(email){
    call = $http.post(Config.authDomain+'/api/user/register/resend',{
      email: email
    }).then(function(res){

      return res;
    },function(err){

      return err;

    });

    return call;
  }

  function login(user){
    call = $http.post(Config.authDomain+'/api/user/login',{
      username: user.username,
      password: user.password,
    }).then(function(res){

      $localstorage.set('xoof_token',res.data.data.token);
      $localstorage.setObject('xoof_user',res.data.data.user);
      $rootScope.isAuthenticated = true;

      if(res.data.data.user.accountType === Config.accountType.vendor){

        $location.path( "/dashboard/vendor/"+res.data.data.user._id );

      }else if(res.data.data.user.accountType === Config.accountType.basic){

        $location.path( "/dashboard/user/"+res.data.data.user._id );
      }else{

        $location.path( "/");
      }

      return res;

    },function(err){

      return err;

    });

    return call;
  }

  function authenticate(accountType){
    //Authentication logic here
    console.log(accountType);
    var token = $localstorage.get('xoof_token');

    if(token){
      var tokenPayload = jwtHelper.decodeToken(token);
      var user = $localstorage.getObject('xoof_user');
      console.log(user);
      if(!jwtHelper.isTokenExpired(token)){
          //If authenticated, return anything you want, probably a user object
          if(user.username === tokenPayload._doc.username && user.accountType === accountType){
            $rootScope.isAuthenticated = true;
              return true;
          }else{
            // $rootScope.isAuthenticated = false;
            return $q.reject('Not Authenticated');
          }

      } else {
          $rootScope.isAuthenticated = false;
          return $q.reject('Not Authenticated');
      }
    }else{
      $rootScope.isAuthenticated = false;
      return $q.reject('Not Authenticated');
    }

  }

  function logout(){
    $rootScope.isAuthenticated = false;
    $localstorage.remove('xoof_token');
    $localstorage.remove('xoof_user');
    $location.path('/login');

  }

  return {
    register: register,
    login: login,
    resendEmail: resendEmail,
    authenticate: authenticate,
    logout: logout
  };
});
