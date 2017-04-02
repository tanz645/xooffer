'user strict';
app.controller('LoginPageController', function($scope,AuthService,$q,ToastService) {

  var  _$ = $scope;

  _$.submit = function(valid){


    if(valid){

        AuthService.login(_$.user).then(function(data){
          ToastService.show(data.data.message,null,data.data.class);

        });
    }
  }
});
