import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/popupWithImage.js";

//Variables///
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".modal__form");

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const addCardFormElement = addCardModal.querySelector(".modal__form");

const errorMessage = addCardFormElement.querySelector(".modal__error");

const imageModal = document.querySelector("#image-preview-modal");
const addCardModalCloseButton =
  addCardModal.querySelector("#modal-close-image");
const profileTitle = document.querySelector(".profile__title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescription = document.querySelector(".profile__description");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const imageCaption = imageModal.querySelector(".modal__image-caption");
const imageElement = document.querySelector(".modal__card-image-preview");

const imageOverlay = imageModal.querySelector(".modal__overlay");

const profileFormElement = profileEditModal.querySelector(".modal__form");

// Clone the template element and its content
const template = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/// Calling Cards///
const cardsList = document.querySelector(".cards__list");

// Get the form input elements
const addCardTitleInput = addCardModal.querySelector("#card-title-input");
const addCardUrlInput = addCardFormElement.querySelector("#card-url-input");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const cardSelector = "#card-template";

// Function to RenderCard

function getCardElement(data) {
  const card = new Card(data, "#card-template");
  const cardElement = card.returnCard();
  return cardElement;
}

// // Call the renderInitialCards
// renderInitialCards(initialCards);

// Add the "submit" event listener to the form

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}
///// Functions ///////////////////////
/////////////////////

function addCard(event) {
  event.preventDefault();

  const cardData = {
    name: addCardTitleInput.value,
    link: addCardUrlInput.value,
  };

  addCardFormElement.reset();

  const newCard = getCardElement(cardData);
  cardsList.prepend(newCard);
  closeModal(addCardModal);
  addCardValidator.disableButtonState();
}

export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__card-image-preview");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

function profileEditCloseButton() {
  closeModal(profileEditModal);
}

function closeCardModal() {
  closeModal(addCardModal);
}

function enlargeCloseButton() {
  closeModal(imageModal);
}

//// Disabling Input Buttons ///////
////////

function checkEmptyInputs() {
  const inputs = addCardFormElement.querySelectorAll(".modal__input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      return true;
    }
  }
  return false;
}

// Loop over initialCards and create cards
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.appendChild(cardElement);
});

////////////EventListeners//////////////
/////////////

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", addCard);

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});

// Add a click event listener to the close button inside the image modal
const imageModalCloseButton = imageModal.querySelector(".modal__close");

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

imageModalCloseButton.addEventListener("click", (event) => {
  closeModal(imageModal);
});

// addCardFormElement.addEventListener("input", toggleSubmitButtonState);

// To close //

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openProfileEditModal(userData) {
  openModal(function () {
    fillProfileForm(userData);
    openModal(profileEditModal);
  });
}

addCardModalCloseButton.addEventListener("click", closeCardModal);

const profileModalCloseButtonElement =
  profileEditModal.querySelector(".modal__close");

profileModalCloseButtonElement.addEventListener("click", () => {
  closeModal(profileEditModal);
});

imageOverlay.addEventListener("click", (event) => {
  event.stopPropagation();
  closeModal(imageModal);
});
/////Validation

const config = {
  formElement: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileValidator = new FormValidator(config, profileFormElement);
profileValidator.enableValidation();
const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();
