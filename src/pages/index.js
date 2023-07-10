// imports
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserinfoComponent from "../components/Userinfo";
import Card from "../components/Card";
import { initialCards } from "../utils/constants.js";
import "./index.css";

const config = {
  formElement: ".modal__form",
  inputElement: ".modal__input",
  submitButton: ".modal__button",
  disableButton: "modal__button_disabled",
  inputErrorClass: "modal__error_visible",
  errorClass: "modal__error_visible",
};

//Variables
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".modal__form");
const addCardFormElement = document.querySelector("#add-card-form");

const modalForm = document.forms["add-card-form"];
const cardForm = document.forms["card-form"];
const profileEditForm = profileEditModal.querySelector(".modal__form");
const submitButton = document.querySelector(".modal__button");

const errorMessage = addCardFormElement.querySelector(".modal__error");

const imageModalSelector = "#image-preview-modal";
const imageModal = document.querySelector(imageModalSelector);
const imageModalCloseButton = imageModal.querySelector(".modal__close");
const addCardModalCloseButton =
  addCardModal.querySelector("#modal-close-image");
const profileTitle = document.querySelector(".profile__title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescription = document.querySelector(".profile__description");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// card elements
const imageCaption = imageModal.querySelector(".modal__image-caption");
const imageElement = imageModal.querySelector(".modal__card-image-preview");
const imageOverlay = imageModal.querySelector(".modal__overlay");

const userinfoComponent = new UserinfoComponent(
  selectors.profileTitle,
  selectors.profileDescription
);

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}

// Card
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  section.addItem(card.getCardElement());
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListEl
);

section.renderItems();
export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__card-image-preview");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

// Modal Image
const imagePreviewModal = new PopupWithImage(imageModalSelector);
imagePreviewModal.setEventListeners();

// Functions
function addCard(data) {
  const createCardTitleInput = document.getElementById("card-title-input");
  const createCardDescriptionInput = document.getElementById("card-url-input");

  const cardData = {
    name: createCardTitleInput.value,
    link: createCardDescriptionInput.value,
  };

  // addCardFormElement.reset();
  const cardElement = renderCard(cardData);

  cardSection.addItem(cardElement);
  // closeModal(addCardModal);
  addCardFormPopup.disableButton();
  addCardFormPopup.close();
}

// card format
const addCardModalSelector = "#add-card-modal";
const data = () => {};

const addCardFormPopup = new PopupWithForm(addCardModalSelector, addCard);
addCardFormPopup.setEventListeners();
addCardFormPopup.close();

addNewCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

// Profile

const profileModal = new PopupWithForm(selectors.profileModal, (data) => {
  userinfoComponent.setUserInfo(
    profileTitleInput.value,
    profileDescriptionInput.value
  );
  profileModal.close();
});

profileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const profileInfo = userinfoComponent.getUserInfo();

  profileTitleInput.value = profileInfo.profileName;
  profileDescriptionInput.value = profileInfo.description;

  profileModal.open();
});

// Form Validators

const addCardFormValidator = new FormValidator(config, addCardFormElement);
const profileEditFormValidator = new FormValidator(config, profileEditForm);

addCardFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
