app.factory("ToastService", function($timeout) {
  var userInfo;
  var call;
  function show(data,max,className) {
    $('.toast').html(data);
    $('.toast').show('fast');
    $('.toast').removeClass('error').removeClass('success');
    $('.toast').addClass(className);
    if(max){
      $timeout(function(){
        $('.toast').hide('fast');
        $('.toast').html('');
      },max);
    }
    $('.toast').click(hide)


  }
  function hide(){
    $('.toast').hide('fast');
    $('.toast').html('')
  }

  return {
    show: show,
    hide: hide
  };
});

app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || false;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      if($window.localStorage[key] != undefined){
        return JSON.parse( $window.localStorage[key] || false );
      }
      return false;
    },
    remove: function(key){
      $window.localStorage.removeItem(key);
    },
    clear: function(){
      $window.localStorage.clear();
    }
  }
}]);
