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
document.addEventListener("DOMContentLoaded", () => {
  const cardsGrid = document.querySelector(".cards__grid");
  if (!cardsGrid) return;

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsGrid.append(cardElement);
  });

  // elements//
  const cardTemplate = document.querySelector("#card-template");
  const profileEditButton = document.querySelector("#profile__edit-button");
  const profileModal = document.querySelector("#profile-edit-modal");
  const modalContainerClose = document.querySelector(".modal__container-close");
  const modalEditCloseButton = document.querySelector(".modal__close");
  const profileTitle = document.querySelector("#profile__title");
  const profileDescription = document.querySelector("#profile__description");
  const modalTitleInput = document.querySelector("#profile-title-input");
  const modalDescriptionInput = document.querySelector(
    "#profile-description-input"
  );

  //functions//

  function openPopup(popup) {
    popup.classList.add("modal_opened");
  }

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
    cardImageEl.alt = cardTitleEl.textContent;
    cardImageEl.src = cardData.link;
    return cardElement;
  };

  // Event Handlers //
  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closePopup(profileModal);
  }

  function handleEditClick(event) {
    console.log("Button Clicked!");
    openPopup(profileModal);
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
  }

  // Event Listeners //
  const modalFormButton = document.getElementById("modal__form-button");
  modalFormButton.addEventListener("click", handleProfileEditSubmit);

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    document.querySelector(".cards__grid").append(cardElement);
  });

  profileEditButton.addEventListener("click", handleEditClick);
  modalContainerClose.addEventListener("click", () => {
    closePopup(profileModal);
  });
  modalEditCloseButton.addEventListener("click", () => {
    closePopup(profileModal);
  });
});
