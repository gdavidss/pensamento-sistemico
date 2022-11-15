
function updateVisited() {
  currentPage = window.location.pathname;
  locationsJSON = localStorage.getItem("visited");

  if (locationsJSON) {
    locations = JSON.parse(locationsJSON);
    if (!locations.includes(currentPage)) {
      locations.push(currentPage);
      locationsJSON = JSON.stringify(locations);
    }
  } else {
    locations = new Array(currentPage);
    locationsJSON = JSON.stringify(locations);
  }

  localStorage.setItem("visited", locationsJSON);
}

document.addEventListener('DOMContentLoaded', function(e) {
  function hasReachedBottom() {
    elm = document.getElementById("progress-bar");
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    return ((y < (vpH + st)));
  }
  if (hasReachedBottom()) {
    console.log("end of the line");
    updateVisited();
  } else {
    function scrollListener (e) {
      if (hasReachedBottom()) {
        updateVisited();
        console.log("end of the line");
        document.removeEventListener("scroll", scrollListener);
      }
    }

    document.addEventListener("scroll", scrollListener);
  }
});