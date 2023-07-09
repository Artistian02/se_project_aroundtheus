export default class FormValidator {
  constructor(config, formElement) {
    this._inputElement = config.inputElement;
    this._submitButton = document.querySelector(config.submitButton);
    this._disableButton = config.disableButton;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.classList.add(this._errorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.classList.remove(this._errorClass);
    errorMessageElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  isInvalid() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this.isInvalid()) {
      this.disableButton();
    } else if (this._submitButton) {
      this._submitButton.classList.remove(this._disableButton);
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this._inputElement)
    );

    //this._submitbutton = document.querySelector(this.submitButtonSector)
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });

    this.toggleButtonState();
  }

  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this.toggleButtonState();
  }

  disableButton() {
    {
      this._submitButton.disabled = true;
      console.log(1);
      console.log(this._disableButton);
      this._submitButton.classList.add(this._disableButton);
    }
  }

  enableButton() {
    this._submitButton.classList.remove(this._disableButton);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.setEventListeners();
  }
}
