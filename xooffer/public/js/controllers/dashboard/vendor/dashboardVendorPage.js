'user strict';
app.controller('DashboardVendorPageController', function($scope,$timeout,$localstorage,OfferService) {
  $scope.num = [1,2,3,4,5,6,7,8];
  $scope.brands = ['1.png','2.jpg','3.png','4.jpeg','5.jpeg','6.jpg','7.png','8.png'];
  $scope.brandName = ['Adidas','Nike','Loreal','Macdonalds','KFC','Apex','Bata','Georgio Armani'];
  $scope.setAllOffers = true;
  $scope.setCreateOffer = false;
  $scope.productDetails = [{}];
  $scope.offer = {};
  $scope.offer.brandId = $localstorage.getObject('xoof_user')._id;
  $scope.outlets = [{feature:""}];
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

  $scope.addLocation = function(){

    $scope.outlets.push({country:"",area:"",address:"",shoppingMall:"",lat:"",lng:""});
  }
  $scope.removeLocation = function(){

    if($scope.outlets.length>1){
      $scope.outlets.pop();
    }

  }

  /**************************************
    Add and remove Product Details
  ***************************************/
  $scope.addProductDetails = function(){

    $scope.productDetails.push({feature:""});
  }
  $scope.removeProductDetails = function(){

    if($scope.productDetails.length>1){
      $scope.productDetails.pop();
    }

  }
  /*********************
      Create Offer
  **********************/
  $scope.submit = function(valid){
    console.log($scope.outlets);
    console.log($scope.offer);

    OfferService.create().$promise.then(function(res){
      console.log(res);
    })
  }
});
