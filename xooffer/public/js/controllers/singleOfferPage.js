'user strict';
app.controller('SingleOfferPageController', function($scope) {
  console.log('inside');
  function initMap() {
    map = new google.maps.Map(document.getElementById('single-offer-map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  initMap();

});
