import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import * as utils from "../utils/utils.js";

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

//Variables///
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton =
  addCardModal.querySelector("#modal-close-image");
const addNewCardButton = document.querySelector(".profile__add-button");

const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const cardTitleInput = addCardModal.querySelector("#card-title-input");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardURLInput = addCardFormElement.querySelector("#card-url-input");

const errorMessage = addCardFormElement.querySelector(".modal__error");

const imageModal = document.querySelector("#image-preview-modal");
const profileTitle = document.querySelector(".profile__title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescription = document.querySelector(".profile__description");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const imageCaption = imageModal.querySelector(".modal__image-caption");
const imageElement = document.querySelector(".modal__card-image-preview");
const enlargeCloseButton = imageModal.querySelector(".modal__close ");

const imageOverlay = imageModal.querySelector(".modal__overlay");

const profileFormElement = profileEditModal.querySelector(".modal__form");

/// Calling Cards///
const cardsList = document.querySelector(".cards__list");
const cardSelector = "#card-template";

/////  Functions ////

function addCard(event) {
  event.preventDefault();

  const addCardTitleInput =
    addCardFormElement.querySelector("#card-title-input");
  const addCardLinkInput = addCardFormElement.querySelector("#card-link-input");

  const cardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  const newCard = new Card(cardData, "#card-template").returnCard();

  cardsList.prepend(newCard);
  addCardModal.querySelector(".modal__form").reset();
  utils.closeModal(addCardModal);
  addCardValidator.disableButtonState();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileUserName.textContent = modalInputUserName.value;
  profileSubtext.textContent = modalInputSubtext.value;

  utils.closeModal(profileEditModal);
}

function openProfileModal() {
  utils.openModal(profileEditModal);
  fillProfileForm();
}

function fillProfileForm() {
  modalInputUserName.value = profileUserName.textContent;
  modalInputSubtext.value = profileSubtext.textContent;
}

export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__image");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

function openCardModal() {
  utils.openModal(addCardModal);
}

function closeProfileModal() {
  utils.closeModal(profileEditModal);
}

function closeCardModal() {
  utils.closeModal(addCardModal);
}

function closeImageModal() {
  utils.closeModal(imageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate);
  return card.returnCard();
}

// Loop over initialCards and create cards
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.appendChild(cardElement);
});

//eventListeners//////
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", addCard);

profileEditButton.addEventListener("click", openProfileModal);
enlargeCloseButton.addEventListener("click", closeImageModal);

addCardModal.addEventListener("click", openCardModal);
addCardModalCloseButton.addEventListener("click", closeCardModal);

imageOverlay.addEventListener("click", closeImageModal);

/////Validation////

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileValidator = new FormValidator(config, "#profile-edit-modal");
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, "#add-card-form");
addCardValidator.enableValidation();

// Function to RenderCard ////

function getCardElement(data) {
  const card = new Card(data, "#card-template");
  const cardElement = card.getView();
  return cardElement;
}

function renderInitialCards(initialCards) {
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsList.appendChild(cardElement);
  });
  function renderCard(cardData, cardsList, cardSelector) {
    const card = new Card(cardData, cardsList, cardSelector);
    cardsList.prepend(card.getView());
  }
}

// Loop over initialCards and create cards
renderInitialCards(initialCards);
