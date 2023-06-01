import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as utils from "../utils/utils.js";
import initialCards from "../utils/constants.js";

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

/////  Functions ////

function addCard(event) {
  event.preventDefault();

  const cardData = {
    name: addCardTitleInput.value,
    link: addCardLinkInput.value,
  };
  const newCard = new Card(cardData, "#card-template").returnCard();

  cardsGrid.prepend(newCard);
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
  const card = new Card(cardData, "#card-template");
  return card.returnCard();
}

//Render Initial cards onto the page

const gridHandler = new Section(
  {
    items: initialCards,
    renderer: (dataObj) => {
      const card = new Card(dataObj, "#card-template");
      const cardElement = card.returnCard();
      gridHandler.addItem(cardElement);
    },
  },
  ".cards__grid"
);

gridHandler.renderItems();

//eventListeners//////

profileEditButton.addEventListener("click", openProfileModal);
editProfileModalCloseButton.addEventListener("click", closeProfileModal);

addButton.addEventListener("click", openCardModal);
modalAddCardCloseButton.addEventListener("click", closeCardModal);

imageModalCloseButton.addEventListener("click", closeImageModal);

modalEditForm.addEventListener("submit", handleProfileFormSubmit);
addCardModal.addEventListener("submit", addCard);

/////Validation////

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  disabledButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileValidator = new FormValidator(config, "#profile-edit-form");
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, "#add-card-modal");
addCardValidator.enableValidation();
