import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    console.log("-------------------------------");
    console.log(popupSelector, handleFormSubmit);
    super(popupSelector);

    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
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
    this._handleFormSubmit(inputValues);
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
