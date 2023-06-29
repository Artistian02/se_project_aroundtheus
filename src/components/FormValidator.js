export default class FormValidator {
  constructor(configObj, formElement) {
    this.config = configObj;
    this.formElement = formElement;
    this.inputList = [
      ...this.formElement.querySelectorAll(this.config.inputSelector),
    ];
    this.submitButton = this.formElement.querySelector(
      this.config.submitButtonSelector
    );
  }

  showInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.config.errorClass);
    inputElement.classList.add(this.config.inputErrorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(
      `#${inputElement.id}-error`
    );
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this.config.inputErrorClass);
  }

  checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(inputElement);
    } else {
      this.hideInputError(inputElement);
    }
  }

  isInvalid() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  toggleButtonState() {
    if (this.isInvalid()) {
      this.disableButtonState();
    } else if (this.submitButton) {
      this.submitButton.classList.remove(this.config.disabledButtonClass);
      this.submitButton.disabled = false;
    }
  }

  setEventListeners() {
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });

    this.toggleButtonState();
  }

  resetValidation() {
    this.inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });

    this.toggleButtonState();
  }

  disableButtonState() {
    if (this.submitButton) {
      this.submitButton.disabled = true;
      if (this.config.disabledButtonClass) {
        this.submitButton.classList.add(this.config.disabledButtonClass);
      }
    }
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.setEventListeners();
  }
}
