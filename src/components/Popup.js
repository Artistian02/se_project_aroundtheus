export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector("#add-card-modal");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // opens popup
    this._popupElement.classList.add("open");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popup
    this._popupElement.classList.remove("open");
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
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
