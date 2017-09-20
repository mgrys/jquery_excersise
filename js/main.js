/*var span = $("span");
span.each(function(index, element) {});
span.each(function(index, element) {
  if (index % 2 == 0) {
    $(element).css("color", "red");
  }
});
$("span:odd").css("color", "blue");

var paragraphs = $("p");
paragraphs.each(function(index, element) {
  var button = '<button class="btn" data-tmp="' + index + '">Click me</button>';
  $(element).append(button);
});

$("button").click(function(){
	alert($(this).attr("data-tmp"));
});
*/
$(function() {
  var animateTimer = 3000;
  var pictureWidth = 900;
  var indicators = $(".carousel #indicators");
  var carouselList = $(".carousel .sliders ul");
  var indicatorList = $(".carousel .indicators ul");
  var carouselState = 'run';
  var carousel = $(".carousel");
  var sliders = $(".sliders");
  var $prev = carousel.find("#prev");
  var $next = carousel.find("#next");
  var $ul = sliders.find("ul");
  var $li = $ul.find("li");
  var numSlides = carouselList.find("li").length;
  var scrollNext = function() {
    changeSlide(getIndex("next"));
  };

  var scrollPrev = function() {
    changeSlide(getIndex("prev"));
  };
      // uruchomienie karuzeli
      function startCarousel() {
        carousel = setInterval(changeSlide, animateTimer);
    }
    // Zatrzymanie karuzeli
    function stopCarousel() {
        clearInterval(carousel);
    }
  // Pobieranie indeksu elementu
  function getIndex(element) {
    if (element == "active") {
      return carouselList.find("li.active").index();
    } else if (element == "prev") {
      if (getIndex("active") == 0) {
        return numSlides - 1;
      } else {
        return getIndex("active") - 1;
      }
    }
    if (getIndex("active") == numSlides - 1) {
      return 0;
    } else {
      return getIndex("active") + 1;
    }
  }
  // Zmiana aktywnej klasy na elemencie
  function changeActiveClass(active, next) {
    carouselList
      .find("li")
      .eq(active)
      .removeClass("active");
    carouselList
      .find("li")
      .eq(next)
      .addClass("active");
    indicatorList
      .find("li")
      .eq(active)
      .removeClass("active");
    indicatorList
      .find("li")
      .eq(next)
      .addClass("active");
  }
  // zmiana slajdu
  function changeSlide(slide) {
    var activeElem = getIndex("active"),
      nextElem = getIndex("next");
    if ($.isNumeric(slide)) {
      nextElem = slide;
    }
    carouselList.animate(
      {
        marginLeft: -(pictureWidth * nextElem)
      },
      animateTimer
    );
    changeActiveClass(activeElem, nextElem);
  }

  indicators.on("click", "[data-slide-go]", function(event) {
    event.preventDefault();
    if (carouselState == 'run') {
        stopCarousel();
    }
    changeSlide($(this).attr("data-slide-go"));
      // Starts carousel if it was running
      if (carouselState == 'run') {
        startCarousel();
    }
  });

  carouselList.find("li:first").addClass("active");
  indicatorList.find("li:first").addClass("active");
  startCarousel();
  $prev.bind("click", scrollPrev);
  $next.bind("click", scrollNext);
});
