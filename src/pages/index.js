// imports

import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
// import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithImage from "../components/PopupWithImage.js";
import index from "../pages/index.css";
// import userInfo from "../components/userInfo.js";

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

// card elements

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

const cardSelector = "#card-template";

// Function to RenderCard
const handleCardClick = (card) => {};

// const card = new Card(handleCardClick);
// function getCardElement(data) {
//   const card = new Card(data, "#card-template", handleCardClick);
//   const cardElement = card.returnCard();
//   return cardElement;
// }

// Add the "submit" event listener to the form

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  closeModal(profileEditModal);
}

///// Functions
function renderCard(card) {
  const cardElement = new Card(
    card,
    (imageData) => {
      cardImagePopup.open(imageData);
    },
    selectors.cardTemplate
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

//// Disabling Input Buttons

function checkEmptyInputs() {
  const inputs = addCardFormElement.querySelectorAll(".modal__input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() === "") {
      return true;
    }
  }
  return false;
}

// // Loop over initialCards and create cards
// initialCards.forEach((cardData) => {
//   const cardElement = getCardElement(cardData);
//   cardListEl.appendChild(cardElement);
// });

// Define the open function for the profileEditModal
function openProfileEditModal() {
  profileEditModal.style.visiblity = "visible";
}

// Define the open function for the addCardModal
function openAddCardModal() {
  console.log(addCardModal);
  addCardModal.style.visiblity = "visible";
}

// Modal Image
const previewImagePopup = new PopupWithImage(imageModal);
previewImagePopup.setEventListeners();

// cards portion
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = renderCard(data);

      cardSection.addItem(card);
    },
  },

  selectors.cardList
);

cardSection.renderItems(initialCards);

// card format

const addCardFormPopup = new PopupWithForm(selectors.addCardModal, (data) => {
  const newCard = renderCard(data);

  cardSection.addItem(newCard);

  addCardFormPopup.close();
  addFormValidator.toggleButtonState();
});

addCardFormPopup.setEventListeners();

// EventListeners

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
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
  openImageModal(imageModal);
});

// Form

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// To close //

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
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

const profileValidator = new FormValidator(config, profileFormElement);
profileValidator.enableValidation();
const addCardValidator = new FormValidator(config, addCardFormElement);
addCardValidator.enableValidation();

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
