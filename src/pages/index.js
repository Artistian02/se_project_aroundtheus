// imports
import FormValidator, { config } from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/userinfo";
import Card from "../components/Card";

import "./index.css";

// Variables
const selectors = {
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileModal: "#profile-edit-modal",
};

// Variables
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

//Variables
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".modal__form");

const modalForm = document.forms["add-card-form"];
const cardForm = document.forms["card-form"];
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

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

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}

function renderCard(card) {
  const cardElement = new Card(
    card,
    (imageData) => {
      imagePreviewModal.open(imageData);
    },
    "#card-template"
  );
  return cardElement.getView();
}

const cardSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const cardElement = renderCard(data);
    cardSection.addItem(cardElement);
  },
});

cardSection.renderItems();

export function handleImageModalInfo(event, imageModal) {
  const imageElement = imageModal.querySelector(".modal__card-image-preview");
  const imageCaption = imageModal.querySelector(".modal__image-caption");
  imageElement.src = event.target.src;
  imageElement.alt = event.target.alt;
  imageCaption.textContent = event.target.alt;
}

// Disabling Input Buttons

function checkEmptyInputs() {
  const inputs = addCardFormElement.querySelectorAll(".modal__input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      return true;
    }
  }
  return false;
}

// Define the open function for the profileEditModal

function closeModal(modal) {
  modal.style.visibility = "hidden";
  modal.removeEventListener("click", handleOverlayClick);
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
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

  addCardFormElement.reset();
  const cardElement = renderCard(cardData);

  cardSection.addItem(cardElement);
  closeModal(addCardModal);
  addCardFormPopup.disableButton();
}

// card format
const addCardModalSelector = "#add-card-modal";
const data = () => {};

const addCardFormPopup = new PopupWithForm(addCardModalSelector, addCard);
addCardFormPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

// Profile
profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();

  profileTitleInput.value = profileInfo.profileName;
  profileDescriptionInput.value = profileInfo.description;

  editFormValidator.disableButton();

  profileModal.open();
});

// Form Validators

const editFormValidator = new FormValidator(
  {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
  },
  profileEditForm
);
const addFormValidator = new FormValidator({}, addCardFormElement);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Profile

const userInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const profileModal = new PopupWithForm(selectors.profileModal, (data) => {
  userInfo.setUserInfo(data.title, data.description);
  profileModal.close();
});

profileModal.setEventListeners();
