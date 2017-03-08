app.factory("toastService", function($timeout) {
  var userInfo;
  var call;
  function show(data,max,className) {
    $('.toast').html(data);
    $('.toast').show('fast');
    $('.toast').removeClass('error').removeClass('success');
    $('.toast').addClass(className);
    $timeout(function(){
      $('.toast').hide('fast');
      $('.toast').html('')
    },max)
  },
  function hide(){
    $('.toast').hide('fast');
    $('.toast').html('')
  }

  return {
    show: show,
    hide: hide
  };
});
