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
  buttonEl.style.backgroundColor = "gray";
}

function enableButton(buttonEl, { disabledButtonClass }) {
  buttonEl.classList.remove(disabledButtonClass);
  buttonEl.disabled = false;
  buttonEl.style.backgroundColor = "";
}

function toggleButtonState(inputEls, submitButton, { disabledButtonClass }) {
  const hasInvalidInputs = hasInvalidInput(inputEls);

  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, { disabledButtonClass });
  } else {
    enableButton(submitButton, { disabledButtonClass });
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options); // Call checkInputValidity here
      toggleButtonState(inputEls, submitButton, options);
    });

    // Add event listener for each input to handle invalid event
    //inputEl.addEventListener("invalid", (e) => {
    // e.preventDefault();
    // showInputError(formEl, inputEl, options);
    // });

    // inputEl.addEventListener("input", (e) => {
    //  hideInputError(formEl, inputEl, options);
    // });
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
