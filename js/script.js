(function($) {
  $.fn.parallax = function(options) {
    $window = $(window);
    if( $window.width() > 800){
        var windowHeight = $(window).height();

        // Establish default settings
        var settings = $.extend({
            speed        : 0.15
        }, options);

        // Iterate over each object in collection
        return this.each( function() {

          // Save a reference to the element
          var $this = $(this);

          // Set up Scroll Handler
          $(document).scroll(function(){

            var scrollTop = $(window).scrollTop();
            var offset = $this.offset().top;
            var height = $this.outerHeight();

                // Check if above or below viewport
            if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
            return;
            }

            var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

                      // Apply the Y Background Position to Set the Parallax Effect
            $this.css('background-position', 'center ' + yBgPosition + 'px');

          });
        });
      }
    };
}(jQuery));


$('.parallax').parallax({
  speed : -0.5
});

$window = $(window);
if( $window.width() > 800){
  $('a[href^="#"]').click(function() {
  $('#work').velocity('scroll', { duration: 600 });
});
}

$('.header-sub').css('background-image').load(function() {
  $('.overlay').fadeOut();
});


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
  setTimeout(function(e) {
    $dias.addClass('openWork loading');

  }, 1250);
  setTimeout(function() {
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