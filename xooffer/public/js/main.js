
var app = angular.module("app", ['ngRoute','slick','ngAnimate','ngResource','ngAria','ngMessages','ngMaterial','angular-jwt']);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html",
        controller:"LandingPageController"
    })
    .when("/topcharts", {
        templateUrl : "views/topcharts.html",
        controller:"TopChartsPageController"
    })
    .when("/offer/:id", {
        templateUrl : "views/singleOffer.html",
        controller:"SingleOfferPageController"
    })
    .when("/brand/:id", {
        templateUrl : "views/singleBrand.html",
        controller:"SingleBrandPageController"
    })
    .when("/mall/:id", {
        templateUrl : "views/singleMall.html",
        controller:"SingleMallPageController"
    })
    .when("/category/:name", {
        templateUrl : "views/singleCategory.html",
        controller:"SingleCategoryPageController"
    })
    .when("/compare", {
        templateUrl : "views/compare.html",
        controller:"ComparePageController"
    })
    .when("/register", {
        templateUrl : "views/register.html",
        controller:"RegisterPageController"
    })
    .when("/login", {
        templateUrl : "views/login.html",
        controller:"LoginPageController"
    })
    .when("/logout", {
        templateUrl : "views/login.html",
        controller:function(AuthService){
          console.log(AuthService);
          AuthService.logout();
        }
    })
    .when("/dashboard", {
        templateUrl : "views/dashboard/user/dashboardUser.html",
        controller:function($localstorage,$location){
          var user = $localstorage.getObject('xoof_user');
          if(user.accountType === 'BASIC'){
            $location.path( "/dashboard/user/"+user._id );
          }else if(user.accountType === 'VENDOR'){
            $location.path( "/dashboard/vendor/"+user._id );
          }
        }
    })
    .when("/dashboard/user/:id", {
        templateUrl : "views/dashboard/user/dashboardUser.html",
        controller:"DashboardUserPageController",
        resolve : {
            permission : function(AuthService,Config){
                return AuthService.authenticate(Config.accountType.basic);
            }
        }
    })
    .when("/dashboard/vendor/:id", {
        templateUrl : "views/dashboard/vendor/dashboardUser.html",
        controller:"DashboardVendorPageController",
        resolve : {
            permission : function(AuthService,Config){
                return AuthService.authenticate(Config.accountType.vendor);
            }
        }
    })
    .otherwise({
        templateUrl : "views/404.html"
    });

    $locationProvider.hashPrefix('');

}).run(function($rootScope, $location){
    //If the route change failed due to authentication error, redirect them out

    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      console.log(previous.originalPath);
        if(rejection === 'Not Authenticated'){
          $rootScope.isAuthenticated = false;
          $location.path('/login');
        }
    })
});
