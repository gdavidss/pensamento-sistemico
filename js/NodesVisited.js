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
  function hasReachedBottom() {
    elm = document.getElementById("ProgressBar");
    var vpH = window.innerHeight, // Viewport Height
        st = window.scrollY, // Scroll Top
        rect = elm.getBoundingClientRect(),
        y = rect.top,
        elementHeight = rect.height;
  
    // Check if the element is completely within the viewport
    return y >= 0 && y + elementHeight <= vpH;
  }

  if (hasReachedBottom()) {
    console.log("has reached bottom")
    updateVisited(); 
    updateProgressBar();
  } else {

    function scrollListener (e) {
      if (hasReachedBottom()) {
        console.log("has reached bottom")
        updateProgressBar();
        updateVisited();
        document.removeEventListener("scroll", scrollListener);
      }
    }

    document.addEventListener("scroll", scrollListener);
  }
});

function updateProgressBar() {
  fetch('/js/metadata_notes_graph.json').then(r => r.json()).then(
  d => {
      const numTotalNodes = d.numNodes;
  
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
        }

        if (currentPercentage > 100) {
          currentPercentage = 100;
        }

        progressBar.style.setProperty("--current-percentage", currentPercentage + "%");
        restartBtn = "🎉 <img id='restart-btn' onClick=resetProgress(); src='../assets/restart.svg'></img>";  
        progressBar_frac.innerHTML = currentPercentage < 100?
         (numVisitedNodes + "/" + numTotalNodes): (restartBtn);

        graphWrapper = document.getElementById("graph-wrapper");
        graphWrapper.classList.add("graphWrapperTransition"); 
      } else {
        // safe case if localStorage doesn't save current node before updating the table
        // This might be unnecessary tho, as it doesn't seem to have a null localStorage
        currentPercentage = ((1 / numTotalNodes) * 100);
        progressBar.style.setProperty("--current-percentage", currentPercentage + "%");
        progressBar_frac.innerHTML += 1 + "/" + numTotalNodes;
        progressBar_frac.classList.add("ProgressBar_outside");
      }
    }
  );
}

function resetProgress() {
  localStorage.removeItem("visited");
  updateProgressBar();
}