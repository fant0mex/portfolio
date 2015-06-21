$window = $(window);
if( $window.width() > 800){
  $('a[href^="#"]').on('click', function() {
  $('#work').velocity('scroll', { duration: 600 });
});
}

if( $window.width() > 800){
  $(document).ready(function(){
    $('body').css('overflow','auto');
    $('.overlay').fadeOut();
  });
}

function closeWork(){
  $('.info').find('p').removeClass('reveal');
  $('.info').find('.before').removeClass('reveal');
  $('.info').find('ul').removeClass('reveal');
  $('.closeBtn').css("display","none");
  setTimeout(function(){
    $('.slate').removeClass('openWork loading');
    $('html').removeClass('stopScroll');
  }, 370);
  setTimeout(function() {
    $('.slate').velocity({ height: "290px" }, { queue: false });
    $('#work').velocity("scroll", { duration: 600, offset: -0}, { queue: false });
  }, 370);
}

function openWork(){
  var $dias = $(this);
  var pos = $(this).position();
  var w = $( window ).height();
  $dias.hasClass('openWork')|| $dias.velocity("scroll", { duration:800, offset:-290, easing:"easeInOutQuint"});
  setTimeout(function() {
    $dias.velocity("scroll", { duration: 600, offset: -0}, { queue: false });
    if ($(window).width() > 768) {
      $dias.velocity({ height: w }, { queue: false });
  } else {
      $dias.velocity({ height: "1240px" }, { queue: false });
  }
  }, 870);
  if ($(window).width() > 768) {
    $('html').addClass('stopScroll');
  }
  setTimeout(function() {
    $dias.addClass('openWork loading');

  }, 1250);
  setTimeout(function(e) {
    $('.info').find('p').addClass('reveal');
    $('.info').find('.before').addClass('reveal');
    $('.info').find('ul').addClass('reveal');
    $('.closeBtn').css("display","inline-block").css("top", (pos.top +20) + "px");
  }, 1600);
}

$('.slate').on('click', openWork);

$('body').on('click','.closeBtn', function(e){
  e.preventDefault();
  e.stopPropagation();
  closeWork();
});