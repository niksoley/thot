function fingerSwipe() {
  if (navigator.msMaxTouchPoints) {

    $('#sliderPlanos').addClass('ms-touch');

    // $('#sliderPlanos').on('scroll', function() {
    //   $('.slidePlanos').css('transform', 'translate3d(-' + (200 - $(this).scrollLeft() / 6) + 'px,0,0)');
    // });

  } else {

    var slider = {

      el: {
        slider: $("#sliderPlanos"),
        holder: $(".holder")
        // imgSlide: $(".slidePlanos")
      },

      slideWidth: $('#sliderPlanos').width(),
      touchstartx: undefined,
      touchmovex: undefined,
      movex: undefined,
      index: 0,
      longTouch: undefined,

      init: function() {
        this.bindUIEvents();
      },

      bindUIEvents: function() {

        this.el.holder.on("touchstart", function(event) {
          slider.start(event);
        });

        this.el.holder.on("touchmove", function(event) {
          slider.move(event);
        });

        this.el.holder.on("touchend", function(event) {
          slider.end(event);
        });

      },

      start: function(event) {
        // Test for flick.
        // this.longTouch = false;
        // setTimeout(function() {
        //   window.slider.longTouch = true;
        // }, 250);

        this.longTouch = false;
        setTimeout(() => {
          this.longTouch = true;
          console.log(this.longTouch);
        }, 250);



        // Get the original touch position.
        this.touchstartx = event.originalEvent.touches[0].pageX;

        // The movement gets all janky if there's a transition on the elements.
        $('.animate').removeClass('animate');
      },

      move: function(event) {
        // Continuously return touch position.
        this.touchmovex = event.originalEvent.touches[0].pageX;
        // Calculate distance to translate holder.
        this.movex = this.index * this.slideWidth + (this.touchstartx - this.touchmovex);
        // Defines the speed the images should move at.
        var panx = 400 - this.movex / 6;
        if (this.movex < 1800) { // Makes the holder stop moving when there is no more content.
          this.el.holder.css('transform', 'translate3d(-' + this.movex + 'px,0,0)');
        }
        // if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
        //   this.el.imgSlide.css('transform', 'translate3d(-' + panx + 'px,0,0)');
        // }

      },

      end: function(event) {
        // Calculate the distance swiped.
        var absMove = Math.abs(this.index * this.slideWidth - this.movex);
        // Calculate the index. All other calculations are based on the index.
        if (absMove > this.slideWidth / 2 || this.longTouch === false) {
          if (this.movex > this.index * this.slideWidth && this.index < 2) {
            this.index++;
          } else if (this.movex < this.index * this.slideWidth && this.index > 0) {
            this.index--;
          }
        }
        // Move and animate the elements.
        this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index * this.slideWidth + 'px,0,0)');
        // this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100 - this.index * 50 + 'px,0,0)');

      }

    };

    slider.init();
  }
}
if (screen.width < 992) {
  fingerSwipe();
}

document.getElementsByTagName("BODY")[0].onresize = function() {
  if (screen.width < 992) {
    fingerSwipe();
  }
};

(function() {
  var _overlay = document.getElementById('sliderPlanos');
  var _clientY = null; // remember Y position on touch start

  _overlay.addEventListener('touchstart', function(event) {
    if (event.targetTouches.length === 1) {
      // detect single touch
      _clientY = event.targetTouches[0].clientY;
    }
  }, false);

  _overlay.addEventListener('touchmove', function(event) {
    if (event.targetTouches.length === 2) {
      // detect single touch
      disableRubberBand(event);
    }
  }, false);

  function disableRubberBand(event) {
    var clientY = event.targetTouches[0].clientY - _clientY;

    if (_overlay.scrollTop === 0 && clientY > 0) {
      // element is at the top of its scroll
      event.preventDefault();
    }

    if (isOverlayTotallyScrolled() && clientY < 0) {
      //element is at the top of its scroll
      event.preventDefault();
    }
  }

  function isOverlayTotallyScrolled() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
    return _overlay.scrollHeight - _overlay.scrollTop <= _overlay.clientHeight;
  }
}())