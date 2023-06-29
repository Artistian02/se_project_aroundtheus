// imports
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserInfo from "../components/UserInfo";

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
  // ...
];

//Variables
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const formElement = document.querySelector(".modal__form");

const modalForm = document.forms["add-card-form"];
const cardForm = document.forms["card-form"];
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");

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

// card elements
const imageCaption = imageModal.querySelector(".modal__image-caption");
const imageElement = imageModal.querySelector(".modal__card-image-preview");
const imageOverlay = imageModal.querySelector(".modal__overlay");

// Functions
function addCard(event) {
  event.preventDefault();

  const addCardTitleInput = addCardModal.querySelector("#card-title-input");
  const addCardUrlInput = addCardModal.querySelector("#card-url-input");
  // Add card logic here
}

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
      ImagePopup.open(imageData);
    },
    cardSelector
  );
  return cardElement.getView();
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

function openProfileEditModal() {
  profileEditModal.style.visibility = "visible";
}

// Define the open function for the addCardModal
function openAddCardModal() {
  addCardModal.style.visibility = "visible";
}

// Modal Image
const imagePreviewModal = new PopupWithImage(imageModal);
imagePreviewModal.setEventListeners();

// // cards portion

const cardSection = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, () => {}, "#card-template");
    const cardElement = card.createCard();
    cardSection.addItem(cardElement);
  },
});

class Card {
  constructor(data, handleCardClick, cardSelector) {
    this.data = data;
    this.handleCardClick = handleCardClick;
    this.cardSelector = cardSelector;
  }

  createCard() {
    const cardElement = document
      .querySelector(this.cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = this.data.link;
    cardImage.alt = this.data.name;
    cardTitle.textContent = this.data.name;

    return cardElement;
  }
}
// card format
const addCardModalSelector = "#add-card-modal";
const data = () => {};

const addCardFormPopup = new PopupWithForm(addCardModalSelector, data);

addCardFormPopup.setEventListeners();

// EventListeners

modalForm.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", addCard);

addNewCardButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  addCardFormPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.info;

  editFormValidator.disableButton();

  profileModal.open();
});

// Add a click event listener to the close button inside the image modal
const imageModalCloseButton = imageModal.querySelector(".modal__close");

addNewCardButton.addEventListener("click", () => {
  openAddCardModal(addCardModal);
});

imageModalCloseButton.addEventListener("click", (event) => {
  imagePreviewModal.open(imageModal);
});

// Form Validators

const editFormValidator = new FormValidator({}, profileEditForm);
const addFormValidator = new FormValidator({}, addCardFormElement);
console.log(editFormValidator);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// // To close //

// function fillProfileForm() {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// }

// addCardModalCloseButton.addEventListener;

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
