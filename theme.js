const toggleButton = document.querySelector("#toggle-theme");
const aboutPage = document.querySelector("#about");

function themeToggle() {
    if (document.documentElement.dataset["theme"] === "light") {
        document.documentElement.dataset["theme"] = "spooky";
        try {
            localStorage.setItem("theme", spooky);
        } catch (error) {
            console.warn("The theme preference could not be saved.");
        }
        return;
    }
    document.documentElement.dataset["theme"] = "light";
    try {
        localStorage.setItem("theme", light);
    } catch (error) {
        console.warn("The theme preference could not be saved.");
    }
}

function showToggle() {
    toggleButton.hidden = false;
    let currTheme = localStorage.getItem("theme") || "light";
    document.documentElement.dataset["theme"] = currTheme;
}

function amazingTransition() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    changePage();
    return;
  } else {
    if (!document.startViewTransition) {
        changePage();
      return;
    }
    document.startViewTransition(function () {
      changePage();
    });
  }
}

showToggle();
toggleButton.addEventListener("click", themeToggle);
aboutPage.addEventListener("click",amazingTransition);

