const theme = localStorage.getItem("darkMode");

window.addEventListener('keydown', function (e) {
    if (e.key ===  "n") {
      toggleDarkMode();
      console.log((document.body.className === "dark"? "Dark": "Light") + " mode toggled");
    }
}, false);

/* verifica se o tema armazenado no localStorage é escuro
se sim aplica o tema escuro ao body */
if (!localStorage.getItem("darkMode")) {
    console.log("didn't find any key!")
    localStorage.setItem("darkMode", "light");
  } else if (localStorage.getItem("darkMode") === "dark") {
    toggleDarkMode(caching=false);
}

function toggleDarkMode(caching=true) {
    console.log("Toggling dark mode 2...")
  
    if (caching) {
      if (localStorage.getItem("darkMode") === "dark") {
        localStorage.setItem("darkMode", "light");
      } else {
        localStorage.setItem("darkMode", "dark"); 
      }
    }

    document.body.classList.toggle("dark");
}