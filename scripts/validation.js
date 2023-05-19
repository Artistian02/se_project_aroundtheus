function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMessageEl) {
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const element = `#${inputEl.id}-error`;
  const errorMessageEl = formEl.querySelector(element);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (inputEl.validity.valid) {
    hideInputError(formEl, inputEl, options);
  } else {
    return showInputError(formEl, inputEl, options);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(buttonEl, { disabledButtonClass }) {
  buttonEl.classList.add(disabledButtonClass);
  buttonEl.disabled = true;
}

function enableButton(buttonEl, { disabledButtonClass }) {
  buttonEl.classList.remove(disabledButtonClass);
  buttonEl.disabled = false;
}

function toggleButtonState(inputEls, submitButton, { disabledButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, { disabledButtonClass });
  } else {
    enableButton(submitButton, { disabledButtonClass });
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  toggleButtonState(inputEls, submitButton, options);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
