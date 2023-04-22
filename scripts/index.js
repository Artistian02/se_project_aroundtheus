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
  const cardsGrid = document.querySelector(".cards__list");

  // elements//
  const cardTemplate = document.querySelector("#card-template");
  const profileEditButton = document.querySelector("#profile__edit-button");
  const modalDescriptionInput = document.querySelector(
    "#profile-description-input"
  );
  const profileModal = document.querySelector(".modal_profile");
  const modalEditCloseButton = document.querySelector(".modal__edit-close");
  const profileTitle = document.querySelector(".profile__title");
  const modalTitleInput = document.querySelector("#profile-title-input");
  const modalContainerClose = document.querySelector(".modal__container-close");

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

  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsGrid.append(cardElement);
  });

  //functions//

  function openPopup(popup) {
    popup.classList.add("modal_opened");
  }

  function closePopup(popup) {
    popup.classList.remove("modal_opened");
  }

  // Event Handlers //
  function handleProfileEditSubmit(e) {
    console.log("Save Button Clicked!");
    e.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closePopup(profileModal);
  }

  // Event Listeners //

  function handleEditClick() {
    console.log("Edit Button Clicked!");
    openPopup(profileModal);
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
  }

  profileEditButton.addEventListener("click", handleEditClick);

  const modalFormButton = document.getElementById("modal__form-button");

  modalFormButton.addEventListener("click", function () {
    const modal = document.getElementById("myModal");
    modal.classList.add("modal_opened");
  });

  const editButton = document.getElementById("profile__edit-button");
  editButton.addEventListener("click", handleEditClick);
});
