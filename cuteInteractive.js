  class CuteInteractive extends HTMLElement {
    connectedCallback() {
        const button = document.querySelector("#show-message");
        const messages = document.querySelector("#messages");
        button.addEventListener("click", () => {
        const message = document.createElement("p");
        message.textContent = "You activated the button.";
        messages.appendChild(message);
    });
    }
  }

  customElements.define("cute-interactive", CuteInteractive);