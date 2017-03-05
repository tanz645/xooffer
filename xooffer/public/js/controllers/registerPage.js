'user strict';
app.controller('RegisterPageController', function($scope,authService,$q) {

  var _$ = $scope;
  _$.submit = function(isValid) {

    if(isValid){

      authService.login(_$.user).then(function(data){
          console.log(data)
      });
      

    }

  }


});
