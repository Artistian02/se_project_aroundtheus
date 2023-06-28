export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = popupSelector;
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
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("popup") ||
        evt.taget.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
    // // sets event listeners
    // this.closeButton.addEventListener("click", () => {
    //   this.close();
    // });

    // this.overlay.addEventListener("click", () => {
    //   this.close();
    // });
  }
}
