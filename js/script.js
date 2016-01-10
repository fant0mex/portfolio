"use strict";

var WorkTile = (function() {

  function dataJS(selector) {
    return document.querySelectorAll("[data-js=" + selector + "]");
  }

  function toggleState($elem, one, two) {
    $elem.attr("data-state", $elem.attr("data-state") == one ? two : one);

    var state = $elem.attr("data-state");

    if(state === one) {
      openTile($elem);
    } else {
      closeTile($elem);
    }
  }

  function openTile($elem) {
    var w = $(window).height();
    $elem.velocity("scroll", { duration:800, offset:-290, easing:"easeInOutQuint"});

    setTimeout(function() {
      $elem.velocity("scroll", { duration: 600, offset: -0}, { queue: false });
      if ($(window).width() > 768) {
        $elem.velocity({ height: w }, { queue: false });
      } else {
        $elem.velocity({ height: "1240px" }, { queue: false });
      }
    }, 870);

    setTimeout(function() {
      $elem.addClass("openWork loading");
    }, 1250);

    setTimeout(function() {
      $elem.find(".info").find("p").toggleClass("reveal");
      $elem.find(".info").find(".before").toggleClass("reveal");
      $elem.find(".info").find("ul").addClass("reveal");
    }, 1600);

    $(".out").on("click", function(evt) {
      evt.stopPropagation();
    });

    if ($(window).width() > 768) {
      $("html").addClass("stopScroll");
    }
  }

  function closeTile($elem) {
    $elem.find(".info").find("p").toggleClass("reveal");
    $elem.find(".info").find(".before").toggleClass("reveal");
    $elem.find(".info").find("ul").toggleClass("reveal");

    setTimeout(function(){
      $elem.removeClass("openWork loading");
      $("html").removeClass("stopScroll");
    }, 370);

    setTimeout(function() {
      $elem.velocity({ height: "290px" }, { queue: false });
      $("#work").velocity("scroll", { duration: 600, offset: -0}, { queue: false });
    }, 370);
  }

  function init(attr) {
    var elem = dataJS(attr);
    var select = function() {
      var $slate = $(this);
      toggleState($slate, "open", "closed");
    };

    for (var i = 0; i < elem.length; i++) {
      var self = elem[i];
      self.onclick = select;
    }
  }

  return {
    init: init
  };
})();

$(document).ready(function(){
  WorkTile.init("slate");
  var $window = $(window);
  if($window.width() > 800){
    $("a[href^=\"#\"]").on("click", function() {
      $("#work").velocity("scroll", { duration: 600 });
    });
  }
});
