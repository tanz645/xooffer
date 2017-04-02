'user strict';
app.controller('DashboardVendorPageController', function($scope,$timeout) {
  $scope.num = [1,2,3,4,5,6,7,8];
  $scope.brands = ['1.png','2.jpg','3.png','4.jpeg','5.jpeg','6.jpg','7.png','8.png'];
  $scope.brandName = ['Adidas','Nike','Loreal','Macdonalds','KFC','Apex','Bata','Georgio Armani'];
  $scope.setAllOffers = true;
  $scope.setCreateOffer = false;
  $scope.productDetails = [{}];
  $scope.outlets = [{country:"",area:"",address:"",shoppingMall:"",lat:"",lng:""}];
  /***********************************
      Change the view for dashboard
  ***********************************/
  $scope.restView = function(newView){
    $scope.setAllOffers = false;
    $scope.setCreateOffer = false;
    $scope[newView] = true;
    $('.nav .active').removeClass('active');
    $("."+newView).addClass('active');
  }

  /***********************************
      Craete Offer Map
  ***********************************/
  function initMap() {
    map = new google.maps.Map(document.getElementById('vendor-dashboard-new-offer-map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  /**************************************
    Check CreatOffer Page is activated
  **************************************/
  $scope.$watch('setCreateOffer', function () {
    if($scope.setCreateOffer){
      $timeout(function(){
        initMap();
      },100)
    }
  });

  /**************************************
    Add and remove offer location
  ***************************************/

  // add

  $scope.addLocation = function(){

    $scope.outlets.push({country:"",area:"",address:"",shoppingMall:"",lat:"",lng:""});
    console.log($scope.outlets);
  }
  $scope.removeLocation = function(){

    if($scope.outlets.length>1){
      $scope.outlets.pop();
    }

  }

});
