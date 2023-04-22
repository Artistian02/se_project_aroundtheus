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

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsGrid.append(cardElement);
});

// Elements//

const profileEditButton = document.querySelector("#profile__edit-button");
const modalDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const modalEditCloseButton = document.querySelector(".modal__edit-close");
const profileTitle = document.querySelector(".profile__title");
const modalTitleInput = document.querySelector("#profile-title-input");
const modalContainerClose = document.querySelector(".modal__container-close");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//functions//

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

const getCardElement = (cardData) => {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  cardImageEl.src = cardData.link;
  return cardElement;
};

// Event Handlers //

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  closePopup(profileEditModal);
}

// Event Listeners //
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
});

modalEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardListEl.prepend(cardElement);
});
