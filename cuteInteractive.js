  class CuteInteractive extends HTMLElement {
    static get observedAttributes(){
      return ["colour"];
    }

    constructor() {
      super();
      this.colours = ["#e66664", "#EB7400", "#FFE42E", "#1F8A00", "#52FFF8", "#2736B2", "#411157"];
      this.i = 0;  
    }

    async connectedCallback() {
      const button = document.querySelector("#show-message");
      this.messages = document.querySelector("#messages");
      this.statusZone = document.querySelector('#status-zone');

    if (this.hasAttribute("colour")) {
      this.messages.style.color = this.getAttribute("colour");
    }

      button.addEventListener("click", async () => {
          const fact = await loadFact();
          const message = document.createElement("p");
          message.textContent = "Congratulations! You found the secret button!";
          const factoid = document.createElement("p");
          factoid.textContent = `HEY DID YOU KNOW: ${fact}`;
          this.messages.appendChild(message);
          this.messages.appendChild(factoid);
      });
    }
  

    attributeChangedCallback(attrName, oldValue, newValue){
      if (attrName ==="colour"&& newValue!== null && this.messages){
        this.messages.style.color = newValue;
         console.log(`Attribute ${attrName} has changed from ${oldValue} to ${newValue}.`);
      }
    }
  }

    async function loadFact() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
      const data = await response.json();
      if (typeof data?.text !== "string") {
        throw new Error("Expected a message in the response.");
      }
      console.log(data.text);
      const fact = data.text;
      return fact;
    } catch (error) {
      // Report the failure and its cause, such as a network error or invalid JSON.
      console.error("Could not load the message.", error);
      return "unfortch, we could not get you a silly little fact at the moment :("
    }
  }

  customElements.define('cute-interactive', CuteInteractive);

  function colourChangeButton(){
    const colourChange = document.querySelector("#teeny-secret");
    const cute = document.querySelector('cute-interactive');
    const key = "cute-interactive-colour"
    const colourButton = document.querySelector("#keep-colour");

    let currColour = cute.colours[0];

    try {
      const currSaved = localStorage.getItem(key);
      if (currSaved !== null && cute.colours.includes(currColour)){
        currColour = currSaved;
      }
    } catch(error){
        console.warn("The colour could not be read");
    }
      cute.setAttribute("colour", currColour);
      cute.i = (cute.colours.indexOf(currColour) + 1)%cute.colours.length;

    colourChange.addEventListener("click", () => {
        const curr = cute.i % (cute.colours.length);
        cute.setAttribute("colour", cute.colours[curr]);
        try{
          localStorage.setItem(key, cute.colours[curr]);
        }
        catch(error){
          console.warn("the colour could not be saved");
        }
        cute.i++;
        colourButton.removeAttribute('hidden');
    });
    colourButton.addEventListener("click", ()=>{
      const savedTextColour = cute.getAttribute("colour");
      if (cute.colours.includes(savedTextColour)) {
      try {
        localStorage.setItem(key, savedTextColour);
      } catch (error) {
        console.warn("The colour could not be saved");
      }
      colourButton.textContent = "this colour was saved";
    }
  });
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", colourChangeButton);
} else {
  colourChangeButton();
}
