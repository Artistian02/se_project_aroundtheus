import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { openModal, closeModal } from "../utils/utils.js";

//Variables///
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");

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
const cardTitleInput = addCardModal.querySelector("#card-title-input");
const cardURLInput = addCardFormElement.querySelector("#card-url-input");

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

// function getCardElement(data) {
//   const card = new Card(data, "#card-template");
//   const cardElement = card.getView();
//   return cardElement;
// }

// export function renderInitialCards(cardsData) {
//   cardsData.forEach((cardData) => {
//     const card = new Card(cardData, "#card-template");
//     const cardElement = card.returnCard();
//     cardListEl.appendChild(cardElement);
//   });
// }

// // Call the renderInitialCards
// renderInitialCards(initialCards);

// Add the "submit" event listener to the form
function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.innerText;

  closeModal(profileEditModal);
}

///// Functions

function addCard(event) {
  event.preventDefault();

  const addCardTitleInput =
    addCardFormElement.querySelector("#card-title-input");
  const addCardLinkInput = addCardFormElement.querySelector("#card-link-input");

  const cardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };

  // const newCard = new Card(cardData, "#card-template").returnCard();
  cardsList.prepend(newCard);
  addCardModal.querySelector(".modal__form").reset();
  closeModal(addCardModal);
  addCardValidator.disableButtonState();
}

function openProfileModal() {
  openModal(profileEditModal);
  fillProfileForm();
}

function fillProfileForm() {
  const nameInput = document.querySelector("#profile-title-input");

  nameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.innerText;
}

export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__image");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

// function openPopup() {
//   openPopup(addCardModal);
// }

function profileModalCloseButton() {
  closeModal(profileEditModal);
}

function closeCardModal() {
  closeModal(addCardModal);
}

function enlargeCloseButton() {
  closeModal(imageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template");
  return card.returnCard();
}

function modalImageClose() {}

// Loop over initialCards and create cards
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.appendChild(cardElement);
});

//eventListeners
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", addCard);

profileEditButton.addEventListener("click", openProfileModal);

addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", closeCardModal);

/////Validation

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

// // Loop over initialCards and create cards
// renderInitialCards(initialCards);
