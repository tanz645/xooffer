'user strict';
app.controller('LandingPageController', function($scope) {

  $scope.test = function(){
    console.log('working')
    $('.sub-menu').addClass('open-sub-menu');

  };
  $scope.num = [1,2,3,4,5,6,7,8];
  $scope.brands = ['1.png','2.jpg','3.png','4.jpeg','5.jpeg','6.jpg','7.png','8.png'];
  $scope.brandName = ['Adidas','Nike','Loreal','Macdonalds','KFC','Apex','Bata','Georgio Armani'];
  $scope.districts = [{
    name:"Dhaka",
    districts:['DHAKA',
    "FARIDPUR",
    'GAZIPUR',
    'GOPALGANJ',
    'JAMALPUR',
    'KISHOREGONJ',
    'MADARIPUR',
    'MANIKGANJ',
    'MUNSHIGANJ',
    'MYMENSINGH',
    'NARAYANGANJ',
    'NARSINGDI',
    'NETRAKONA',
    'RAJBARI',
    'SHARIATPUR',
    'SHERPUR',
    'TANGAIL']
    },
    {
      name:'Chittagong',
        districts:['BANDARBAN',
        'BRAHMANBARIA',
        'CHANDPUR',
        'CHITTAGONG',
        'COMILLA',
        "COX'S BAZAR",
        'FENI',
        'KHAGRACHHARI',
        'LAKSHMIPUR',
        'NOAKHALI',
        'RANGAMATI' ]
      },
      {
        name:'Khulna',
        districts:['BAGERHAT',
        'CHUADANGA',
        'JESSORE',
        'JHENAIDAH',
        'KHULNA',
        'KUSHTIA',
        'MAGURA',
        'MEHERPUR',
        'NARAIL',
        'SATKHIRA']
      },
      {
        name:'Rajshahi',
        districts:['BOGRA',
        'CHAPAINABABGANJ',
        'JOYPURHAT',
        'PABNA',
        'NAOGAON',
        'NATORE',
        'RAJSHAHI',
        'SIRAJGANJ']
      }];


  /*************************************
      Drop Down Filter Items
  *************************************/
  $scope.toggleDisplay = function(id){
    // $('.filterItems-dropdown-box').hide();
    $('#'+id).toggle();
  }
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }

  initMap();

});
