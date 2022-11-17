

function updateVisited() {
  currentPage = window.location.pathname;
  visitedNodesJSON = localStorage.getItem("visited");

  if (visitedNodesJSON) {
    locations = JSON.parse(visitedNodesJSON);
    if (!locations.includes(currentPage)) {
      locations.push(currentPage);
      visitedNodesJSON = JSON.stringify(locations);
    }
  } else {
    locations = new Array(currentPage);
    visitedNodesJSON = JSON.stringify(locations);
  }

  localStorage.setItem("visited", visitedNodesJSON);
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
      const numTotalNodes = d.default.numNodes;
  
      progressBar = document.getElementById("Progress");
      progressBar_frac = document.getElementById("ProgressBar-frac");

      visitedNodesJSON = localStorage.getItem("visited");
      let currentPercentage;

      if (visitedNodesJSON) {
        visitedNodes = JSON.parse(visitedNodesJSON);
        numVisitedNodes = visitedNodes.length; 
        
        currentPercentage = ((numVisitedNodes / numTotalNodes) * 100);

        if (currentPercentage < 50) {
          progressBar_frac.classList.add("ProgressBar_outside");
          //progressBar.classList.add("ProgressBar_outside");
        }

        progressBar.style.setProperty("--current-percentage", currentPercentage + "%");
        progressBar_frac.innerHTML += numVisitedNodes + "/" + numTotalNodes;
      } else {
        // safe case if localStorage doesn't save current node before updating the table
        // This might be unnecessary tho, as it doesn't seem to have a null localStorage
        currentPercentage = ((1 / numTotalNodes) * 100);
        progressBar.style.setProperty("--current-percentage", currentPercentage + "%");
        progressBar_frac.innerHTML += 1 + "/" + numTotalNodes;
        if (currentPercentage < 50) {
          progressBar_frac.classList.add("ProgressBar_outside");
        }
      }
    }
  );
}