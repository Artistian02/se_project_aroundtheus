export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popup
    this.popup.classList.add("open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this.popup.classList.remove("open");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    // listens for esc button
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // sets event listeners
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    this.overlay.addEventListener("click", () => {
      this.close();
    });
  }
}
