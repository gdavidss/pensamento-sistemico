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
    // Set the expiration time to 12 hours from now
    var expiration = new Date().getTime() + 12*60*60*1000;

    if (caching) {
      document.body.classList.add("dark-transition");
      if (theme === "dark") {
        localStorage.setItem("darkMode", "light", expiration);
      } else {
        localStorage.setItem("darkMode", "dark", expiration); 
      }
    }
    document.body.classList.toggle("dark");
}