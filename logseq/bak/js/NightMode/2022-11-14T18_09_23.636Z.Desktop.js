window.addEventListener('keydown', function (e) {
    if (e.key ===  "n") {
      toggleDarkMode();
      graphToggleDarkMode();
      console.log((document.body.className === "dark"? "Dark": "Light") + " mode toggled");
    }
}, false);

if (!localStorage.getItem("darkMode")) {
  console.log("didn't find any key!")
  localStorage.setItem("darkMode", "light");
} else if (localStorage.getItem("darkMode") === "dark") {
  toggleDarkMode(caching=false);
  const observer = new MutationObserver(() => {
  if ((document.getElementsByClassName("nodes").length) > 0) {
    graphToggleDarkMode();
    observer.disconnect();
    }

  const observer2 = new MutationObserver(() => {
    if ((document.getElementsByClassName("tooltip-wrapper").length) > 0) {
      graphToggleToolTi();
      observer2.disconnect();
    }
  });

  const target = document.querySelector("body"); 
  const config = { attributes: true, childList: true, subtree: true  };
  observer.observe(target, config);  
}

function toggleDarkMode(caching=true) {
  console.log("Toggling dark mode...")

  if (caching) {
    if (localStorage.getItem("darkMode") === "dark") {
      localStorage.setItem("darkMode", "light");
    } else {
      localStorage.setItem("darkMode", "dark"); 
    }
  }

  HTMLCollections = getHtmlCollections();

  document.body.classList.toggle("dark");
   
  for (collection of HTMLCollections) {
    for (element of collection) {
        //console.log(document.getElementsByTagName("a"));
        element.classList.toggle("dark");
      }
    }
  
  tooltipWrapper = document.getElementById('tooltip-wrapper');
  tooltipWrapper.classList.toggle("dark");
}


function getHtmlCollections() {
  HTMLCollections = [document.getElementsByTagName("a")];
  console.log("a is: ") 
  console.log(HTMLCollections);
  HTMLCollections = HTMLCollections.concat([document.getElementsByTagName("hr")]);
  HTMLCollections = HTMLCollections.concat([document.getElementsByTagName("blockquote")]);
  return HTMLCollections;
}

// The graph takes longer to load, so it works best if it's in another function

function graphToggleDarkMode() {
  let graphWrapper = document.getElementById('graph-wrapper');
  graphWrapper.classList.toggle("dark");
  let graphElements = getGraphElements();
  for (collection of graphElements) {
    for (element of collection) {
        element.classList.toggle("dark");
      }
    }
}

function getGraphElements() {
  let graphElements = [document.getElementsByClassName("nodes")];
  graphElements = graphElements.concat([document.getElementsByClassName("text")]);
  return graphElements; 
}


