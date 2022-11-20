let darkModeBtn = document.getElementById("dark-mode-btn");

window.addEventListener('keydown', function (e) {
    if (e.key ===  "n") {
      toggleDarkMode();
      console.log((document.body.className === "dark"? "Dark": "Light") + " mode toggled");
    }
}, false);

const theme = localStorage.getItem("darkMode");
if (!theme) {
  const now = new Date().getHours()
  if (now >= 20 || now <= 6) {
    darkModeBtn.src = "../assets/moon.svg";
    localStorage.setItem("darkMode", "dark");
    toggleDarkMode(caching=false);
  } else {
    darkModeBtn.src = "../assets/sun.svg";
    localStorage.setItem("darkMode", "light");
  } 
} else if (theme === "dark") {
  //darkModeBtn.src = "../assets/moon.svg";
  toggleDarkMode(caching=false);
}
/* } else {
  darkModeBtn.src = "../assets/sun.svg";  
} */

function toggleDarkMode(caching=true) {
    const theme = localStorage.getItem("darkMode");
    if (caching) {
      document.body.classList.add("dark-transition");
      if (theme === "dark") {
        localStorage.setItem("darkMode", "light");
      } else {
        localStorage.setItem("darkMode", "dark"); 
      }
    }
    document.body.classList.toggle("dark");
}