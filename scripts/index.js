// Initial Cards //

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name.trim();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    showPreviewImage(cardData);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  function showPreviewImage({ name, link }) {
    imageCaption.textContent = name;
    openPopup(imageModal);
    imageElement.src = link;
    imageElement.alt = name;
  }

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", closePopupKeypress);
}

function closePopup(modalParam) {
  modalParam.classList.remove("modal_opened");
  document.removeEventListener("keyup", closePopupKeypress);
}

function closePopupKeypress(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closePopup(activeModal);
  }
}

//// Event Handlers  //////

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const titleValue = cardTitleInput.value.trim();
  const imageUrlValue = cardURLInput.value.trim();

  const newCardData = {
    name: titleValue,
    link: imageUrlValue,
  };

  const newCardElement = getCardElement(newCardData);
  cardListEl.prepend(newCardElement);
  closePopup(addCardModal);
  addCardFormElement.reset();
}

/// Event Listeners /////
profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

const nameInput = document.getElementById("profile-title-input");

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.innerText;
  openPopup(profileEditModal);
});

enlargeCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});

profileEditModal.addEventListener("mousedown", (e) => {
  if (e.target === profileEditModal || e.target === profileModalCloseButton) {
    closePopup(profileEditModal);
  }
});

addCardModal.addEventListener("mousedown", (e) => {
  if (e.target === addCardModal || e.target === addCardModalCloseButton) {
    closePopup(addCardModal);
  }
});

// Add New Card //

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
closePopup(addCardModal);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
