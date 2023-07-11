export const initialCards = [
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

// Variables
export const selectors = {
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  profileModal: "#profile-edit-modal",
};

export const cardTemplate = document.querySelector("#card-template");

export const profileEditButton = document.querySelector(
  "#profile__edit-button"
);
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditCloseButton =
  profileEditModal.querySelector(".modal__close");
export const addCardModal = document.querySelector("#add-card-modal");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const formElement = document.querySelector(".modal__form");
export const addCardFormElement = document.querySelector("#add-card-form");
export const cardListEl = document.querySelector(".cards__list");
export const modalForm = document.forms["add-card-form"];
export const cardForm = document.forms["card-form"];
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const submitButton = document.querySelector(".modal__button");

export const errorMessage = addCardFormElement.querySelector(".modal__error");

export const imageModalSelector = "#image-preview-modal";
export const imageModal = document.querySelector(imageModalSelector);
export const imageModalCloseButton = imageModal.querySelector(".modal__close");
export const addCardModalCloseButton =
  addCardModal.querySelector("#modal-close-image");
export const profileTitle = document.querySelector(".profile__title");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export const config = {
  formElement: ".modal__form",
  inputElement: ".modal__input",
  submitButton: ".modal__button",
  disableButton: "modal__button_disabled",
  inputErrorClass: "modal__error_visible",
  errorClass: "modal__error_visible",
};
