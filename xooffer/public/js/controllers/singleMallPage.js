'user strict';
app.controller('SingleMallPageController', function($scope) {
  console.log('inside');
  function initMap() {
    map = new google.maps.Map(document.getElementById('single-mall-map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  initMap();

});
