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
const addCardModalCloseButton =
  addCardModal.querySelector("#modal-close-image");
const addNewCardButton = document.querySelector(".profile__add-button");

const addCardForm = addCardModal.querySelector(".modal__form");
const cardURLInput = addCardModal.querySelector("#profile-title-input");

const imageModal = document.querySelector("#image-preview-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");

const profileTitleImage = document.querySelector("#profile-title-image");

const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const imageCaption = imageModal.querySelector(".modal__image-caption");
const imageElement = document.querySelector(".modal__card-image-preview");
const enlargeCloseButton = imageModal.querySelector(".modal__image-close ");
const addCardFormElement = addCardModal.querySelector(".modal__form");

const cardDescriptionInput = addCardFormElement.querySelector("#link-input");

const profileFormElement = profileEditModal.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template");
const cardListEl = document.querySelector(".cards__list");

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

function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const titleValue = cardTitleInput.value;
  const imageUrlValue = cardImageUrlInput.value;
  const linkUrlValue = document.getElementById("link-input").value; // Access the link URL input field

  const newCardData = {
    title: titleValue,
    imageUrl: imageUrlValue,
    linkUrl: linkUrlValue,
  };

  const newCardElement = getCardElement(newCardData);
  cardListEl.prepend(newCardElement);
  closePopup(addCardModal);
  addCardForm.reset();
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

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

enlargeCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});

// Add New Card //

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
