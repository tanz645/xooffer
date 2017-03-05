'user strict';
app.controller('DashboardVendorPageController', function($scope,$timeout) {
  $scope.num = [1,2,3,4,5,6,7,8];
  $scope.brands = ['1.png','2.jpg','3.png','4.jpeg','5.jpeg','6.jpg','7.png','8.png'];
  $scope.brandName = ['Adidas','Nike','Loreal','Macdonalds','KFC','Apex','Bata','Georgio Armani'];
  $scope.show = false;
  $scope.productDetails = [{}];
  function initMap() {
    map = new google.maps.Map(document.getElementById('vendor-dashboard-new-offer-map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  $timeout(function(){
    initMap();
  },100)


});
