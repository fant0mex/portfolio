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


$('a[href^="#"]').click(function() {
 $('#work').velocity('scroll', { duration: 600 });
});


$('.dias').click(function() {
  $('.dias').velocity("scroll", { duration:800, offset:-290, easing:"easeInOutQuint"});
  setTimeout(function() {
    $('.dias').velocity("scroll", { duration: 600, offset: -0}, { queue: false }),
    $('.dias').velocity({ height: "779px" }, { queue: false });
  }, 870);
  $('.dias').on('scroll touchmove mousewheel', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('html, body').css({
    'overflow': 'hidden'});
  return false;
  })
  setTimeout(function() {
    $('.dias').addClass("openWork loading")

  }, 1250);
  setTimeout(function() {
    $('.info').children().addClass("reveal"),
    $( ".dias" ).prepend( "<a class='closeBtn'>CLOSE</a>" )
  }, 1600);
});



























