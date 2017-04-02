'user strict';
app.controller('RegisterPageController', function($scope,AuthService,$q,ToastService) {

  var  _$ = $scope;
  _$.submit = function(isValid) {

    if(isValid){

      AuthService.register(_$.user).then(function(data){
          console.log(data)
          ToastService.show(data.data.message,null,data.data.class);
      });

    }

  }
  _$.resendEmail = function(isValid){
    if(isValid){

      AuthService.resendEmail(_$.user.email).then(function(data){
          console.log(data)
          ToastService.show(data.data.message,null,data.data.class);
      });

    }
  }


});
