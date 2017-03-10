
var app = angular.module("app", ['ngRoute','slick','ngAnimate','ngAria','ngMessages','ngMaterial']);

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
    .when("/login", {
        templateUrl : "views/login.html",
        controller:"LoginPageController"
    })
    .when("/register", {
        templateUrl : "views/register.html",
        controller:"RegisterPageController"
    })
    .when("/dashboard/user/:id", {
        templateUrl : "views/dashboard/user/dashboardUser.html",
        controller:"DashboardUserPageController"
    })
    .when("/dashboard/vendor/:id", {
        templateUrl : "views/dashboard/vendor/dashboardUser.html",
        controller:"DashboardVendorPageController"
    })
    .otherwise({
        templateUrl : "views/404.html"
    });

    $locationProvider.hashPrefix('');

});
