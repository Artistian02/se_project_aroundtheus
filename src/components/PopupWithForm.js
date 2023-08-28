import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  _submitForm = () => {
    const inputValues = this._getInputValues();
    this._loadingState = true;
    this.showLoading(true);
    this._handleFormSubmit(inputValues);
  };

  showLoading(isLoading = true) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = "Save";
    }
  }

  hideLoading() {
    this.showLoading(false);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._popupForm.reset();
  }
}

export default PopupWithForm;
