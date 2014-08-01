$('a[href^="#"]').click(function() {
  $('html,body').animate({ scrollTop: $(this.hash).offset().top}, 500);
    return false;
    e.preventDefault();
});


$('li.dias').click(function(){
  $('li.dias').animate({height:'779px'}, 500);
});


(function($) {
  $.fn.parallax = function(options) {

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
}(jQuery));

$('.parallax').parallax({
speed : -0.5
});

var fadeStart=150, // 100px scroll or less will equiv to 1 opacity
fadeUntil=650, // 200px scroll or more will equiv to 0 opacity
fading = $('.default');

$(window).bind('scroll', function(){
    var offset = $(document).scrollTop(),
      opacity=0;
    if( offset<=fadeStart ){
        opacity=1;
    }else if( offset<=fadeUntil ){
        opacity=1-offset/fadeUntil;
    }
    fading.css('opacity', opacity);
});
