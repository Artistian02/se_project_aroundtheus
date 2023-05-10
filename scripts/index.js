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

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const addNewcardButton = document.querySelector(".profile__add-button");

const addCardForm = addCardModal.querySelector(".modal__input");
const addCardFormElement = addCardModal.querySelector(".modal__input");
const cardURLInput = addCardModal.querySelector(".modal__input");
const addCardTitle = addCardForm.querySelector("add-card-input");
const addCardLink = addCardForm.querySelector("add-card-input");

const imageModal = document.querySelector("#image-preview-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");

const profileDescriptionImage = document.querySelector(
  "#profile-description-input"
);
const profileTitleImage = document.querySelector("#profile-title-image");

const profileDescriptionInput = document.querySelector(
  "#profile-description-image"
);
const imageEnlarge = imageModal.querySelector("img");
const imageCaption = imageModal.querySelector("p");
const imageElement = document.querySelector(".modal__card-image-preview");
const enlargeCloseButton = imageModal.querySelector(".modal__image-close");

const cardTitleInput = addCardFormElement.querySelector(".modal__input");
const profileFormElement = profileEditModal.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");

/////  Functions ////
function handlePreviewPicture(cardData) {
  openPopup(imageModal);
}

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
    const card = deleteButton.closest(".card");
    if (card) {
      card.remove();
    }
  });

  function showPreviewImage({ name, link }) {
    imageCaption.textContent = name;
    openPopup(imageModal);
    imageElement.src = link;
    imageElement.alt = name;
  }

  function handleCardClick(data) {
    imageModal.src = data.link;
    imageModal.alt = data.name;

    openPopup(showPreviewImage);
  }

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

//function openPopup() {
// profileTitleInput.value = profileTitle.textContent;
//  profileDescriptionInput.value = profileDescription.textContent;
//  profileEditModal.classList.add("modal_opened");
//}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

//// Event Handlers  //////

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const titleVaule = cardTitleInput.value;
  const urlVaule = cardUrlInput.value;
  console.log("titleValue", titleValue);
  return console.log("urlValue", urlValue);
  const cardElement = getCardElement();
  closePopup(addCardModal);
}

/// Event Listeners /////
profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

const nameInput = document.getElementById("profile-title-input");
const jobInput = document.getElementById("profile-description-input");

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

enlargeCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});

// Add New Card //

addNewcardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
