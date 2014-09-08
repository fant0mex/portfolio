// (function($) {
//   $.fn.parallax = function(options) {

//     var windowHeight = $(window).height();

//     // Establish default settings
//     var settings = $.extend({
//         speed        : 0.15
//     }, options);

//     // Iterate over each object in collection
//     return this.each( function() {

//       // Save a reference to the element
//       var $this = $(this);

//       // Set up Scroll Handler
//       $(document).scroll(function(){

//         var scrollTop = $(window).scrollTop();
//         var offset = $this.offset().top;
//         var height = $this.outerHeight();

//             // Check if above or below viewport
//         if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
//         return;
//         }

//         var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

//                   // Apply the Y Background Position to Set the Parallax Effect
//         $this.css('background-position', 'center ' + yBgPosition + 'px');

//       });
//     });
//   };
// }(jQuery));

// $('.parallax').parallax({
//   speed : -0.5
// });

var parallaxElements = [];
var windowHeight = 0;

$(document).ready(function() {

  windowHeight = $(window).height();
  $('html,body').scrollTop(1); // auto scroll to top

  // touch event check stolen from Modernizr
  var touchSupported = (('ontouchstart' in window) ||
              window.DocumentTouch && document instanceof DocumentTouch);

  // if touch events are supported, tie our animation to the position to these events as well
  if (touchSupported) {

    $(window)
      .bind('touchmove', function(e) {
        var val = e.currentTarget.scrollY;
        parallax(val);
      });
  }

  $(window)
    .bind('scroll', function(e) {
      var val = $(this).scrollTop();
      parallax(val);
    });

  // update vars used in parallax calculations on window resize
  $(window).resize(function() {
    windowHeight = $(this).height();

    for (var id in parallaxElements) {
      parallaxElements[id].initialOffsetY = $(parallaxElements[id].elm).offset().top;
      parallaxElements[id].height = $(parallaxElements[id].elm).height();
    }
  });


  // get parallax elements straight away as they wont change
  // this will minimise DOM interactions on scroll events
  $('.parallax').each(function(){

    $elm = $(this);
    var id = $elm.data('id');

    // use data-id as key
    parallaxElements[id] = {
      id: $elm.data('id'),
      start: $elm.data('start'),
      stop: $elm.data('stop'),
      speed: $elm.data('speed'),
      elm: $elm[0],
      initialOffsetY: $elm.offset().top,
      height: $elm.height(),
      width: $elm.outerWidth()
    };

  });
});

function parallax(scrollTop) {

  for (var id in parallaxElements) {

    // distance of element from top of viewport
    var viewportOffsetTop = parallaxElements[id].initialOffsetY - scrollTop;

    // distance of element from bottom of viewport
    var viewportOffsetBottom = windowHeight - viewportOffsetTop;

    if ((viewportOffsetBottom >= parallaxElements[id].start) && (viewportOffsetBottom <= parallaxElements[id].stop)) {
      // element is now active, fix the position so when we scroll it stays fixed

      var speedMultiplier = parallaxElements[id].speed || 1;
      var pos = (windowHeight - parallaxElements[id].start);

      $(parallaxElements[id].elm)
        .css({
          position: 'fixed',
          top: pos+'px',
          left: '50%',
          marginLeft: -(parallaxElements[id].width/2) +'px'
        });

    } else if (viewportOffsetBottom > parallaxElements[id].stop) {
      // scrolled past the stop value, make position relative again

      $(parallaxElements[id].elm)
        .css({
          position: 'relative',
          top: (parallaxElements[id].stop-parallaxElements[id].start)+'px',
          left: 'auto',
          marginLeft: 'auto'
        });

    } else if (viewportOffsetBottom < parallaxElements[id].start) {
      // scrolled up back past the start value, reset position

      $(parallaxElements[id].elm)
        .css({
          position: 'relative',
          top: 0,
          left: 'auto',
          marginLeft: 'auto'
        });

    }
  }
}

$('a[href^="#"]').click(function() {
 $('#work').velocity('scroll', { duration: 600 });
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






