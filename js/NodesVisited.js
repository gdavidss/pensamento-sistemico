

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
 updateProgressBar();

 // GD: Refactor this to not use JQuery, because JQuery is slow as fuck
  function hasReachedBottom() {
    elm = document.getElementById("ProgressBar");
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

function updateProgressBar() {
  const graphMetadataPromise = import('./metadata_notes_graph.json', {
    assert: {
        type: 'json'
    }
  });
  
  graphMetadataPromise.then(d => {
      const numberNodes = d.default.numNodes;
      progressBar = document.getElementById("Progress");
      locationsJSON = localStorage.getItem("visited");
      if (locationsJSON) {
        locations = JSON.parse(locationsJSON);
        currentPercentage = ((locations.length / numberNodes) * 100) + "%";
        progressBar.style.setProperty("--current-percentage", currentPercentage);
      } else {
        currentPercentage = ((1 / numberNodes) * 100) + "%";
        progressBar.style.setProperty("--current-percentage", currentPercentage);
      }
    }
  );
}