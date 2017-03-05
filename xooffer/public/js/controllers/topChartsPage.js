'user strict';
app.controller('TopChartsPageController', function($scope,$timeout) {
  console.log('yaaa')
  $scope.num = [1,2,3,4,5,6,7,8];
  $scope.malls = [1,2,3,4];
  $scope.deals = [{class:'woFa menFa',img:'1.png'},{class:'foodRes',img:'4.jpeg'},{class:'woFa menFa',img:'2.jpg'},
  {class:'woFa',img:'3.png'},{class:'foodRes',img:'5.jpeg'},{class:'woFa',img:'1.png'}];
  $scope.brandName = ['Adidas','Nike','Loreal','Macdonalds','KFC','Apex','Bata','Georgio Armani'];
  $scope.brands = [
      {class:'woFa menFa',img:'1.png'},{class:'foodRes',img:'4.jpeg'},{class:'woFa menFa',img:'2.jpg'},
      {class:'woFa',img:'3.png'},{class:'foodRes',img:'5.jpeg'},{class:'woFa',img:'1.png'},
      {class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},
      {class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},
      {class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},
      {class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},{class:'menFa',img:'1.png'},
      {class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},
      {class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'},{class:'woFa menFa',img:'1.png'}
    ];
  $scope.loadEnd = function(){
    $timeout(function () {
      var $grid = $('.premium-brands-grid').isotope({
        // options
        itemSelector: '.premium-brand-grid-item',
        layoutMode: 'fitRows'
      });

      $('.premium-brands-filter-button-group').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $('.premium-brands-filter-button-group').find('.active').removeClass('active');
        $(this).addClass('active');
        $grid.isotope({ filter: filterValue });
      });
    }, 100);

  }

  $timeout(function () {
    var $grid = $('.popular-deals-grid').isotope({
      // options
      itemSelector: '.popular-deals-grid-item',
      layoutMode: 'fitRows'
    });

    $('.popular-deals-filter-button-group').on( 'click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $('.popular-deals-filter-button-group').find('.active').removeClass('active');
      $(this).addClass('active');
      $grid.isotope({ filter: filterValue });
    });
  }, 100);

})
