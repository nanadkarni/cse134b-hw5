  class CuteInteractive extends HTMLElement {
    static get observedAttributes(){
      return ["colour"];
    }

    constructor() {
      super();
      this.colours = ["#f57f7d", "#EB7400", "#FFE42E", "#1F8A00", "#52FFF8", "#2736B2", "#411157"];
      this.i = 0;  
    }

    async connectedCallback() {
      const button = document.querySelector("#show-message");
      this.messages = document.querySelector("#messages");
      const colourChange = document.querySelector("#teeny-secret");

      colourChange.addEventListener("click", () => {
        const curr = this.i % (this.colours.length);
        this.setAttribute("colour", this.colours[curr]);
        this.i++;
      });

      let clicked = false;
      button.addEventListener("click", async () => {
        if (clicked == false){
          const fact = await loadFact();
          const message = document.createElement("p");
          message.textContent = "Congratulations! You found the secret button!";
          const factoid = document.createElement("p");
          factoid.textContent = `HEY DID YOU KNOW: ${this.fact}`;
          this.messages.appendChild(message);
          this.messages.appendChild(factoid);
          clicked = true;
        }
      });
    }
  

    attributeChangedCallback(name, oldValue, newValue){
      if (name ==="colour"&& newValue!== null && this.messages){
        this.messages.style.color = newValue;
         console.log(
          `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
        );
      }
    }
  }
  
  

    async function loadFact() {
    const url = "https://uselessfacts.jsph.pl/api/v2/facts/random";
    // Run these steps in order. If one throws an error, jump to catch.
    try {
        const response = await fetch(url);
      // Even an HTTP error such as 404 returns a response. Check its status.
      if (!response.ok) {
        // Stop here and pass the status code to the catch block.
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      if (typeof data?.text !== "string") {
        throw new Error("Expected a message in the response.");
      }
      // The response passed both checks. Show the message in the Console.
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