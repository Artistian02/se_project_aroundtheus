import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, loadingButtonText) {
    super({ popupSelector });

    this._popupSubmitButton =
      this._popupElement.querySelector(".modal__button");
    this._buttonText = this._popupSubmitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  setSubmitAction(callBack) {
    this._handleSubmit = callBack;
  }

  setEventListeners() {
    super.setEventListeners();
    // Set the event listener for the submit button
    this._popupSubmitButton.addEventListener("click", () => {
      if (this._handleSubmit) {
        this._handleSubmit();
      }
    });
  }

  showLoading() {
    this._popupSubmitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._popupSubmitButton.textContent = this._buttonText;
  }
}

export default PopupWithConfirmation;
