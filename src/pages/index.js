// imports
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Userinfo from "../components/Userinfo";
import Card from "../components/Card";
import Api from "../components/Api";
import {
  initialCards,
  selectors,
  config,
  containerSelector,
  imageModalSelector,
  addNewCardButton,
  profileEditButton,
  addCardFormElement,
  profileEditForm,
  profileTitleInput,
  profileDescriptionInput,
  deleteCardModalInstance,
  deleteCardModalButton,
  deleteAllCardsButton,
  submitButton,
  setAction,
} from "../utils/constants.js";
import "./index.css";

const userinfoComponent = new Userinfo(
  selectors.profileTitle,
  selectors.profileDescription
);

//Api

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
    "Content-Type": "application/json",
  },
});

// Move the card rendering logic inside the `then` block
api.getInitialCards().then((cardData) => {
  const section = new Section(
    {
      items: cardData,
      renderer: (cardData) => {
        const card = new Card(
          cardData,
          "#card-template",
          handleCardImageClick,
          (cardID) => handleDeleteClick(card, cardID),
          handleLikeClick
        );

        const cardElement = card.getView();

        console.log(cardElement);
        section.addItem(cardElement);
      },
    },
    containerSelector
  );
  section.renderItems();
});

function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

function handleDeleteClick(card, cardID) {
  deleteCardModalInstance(() => {
    submitButton(deleteCardModalButton, "Deleting...");
    api
      .deleteCard(cardID)
      .then(() => {
        card.handleDelete();
        deleteCard.close();
      })
      .catch(() => {})
      .finally(() => {
        submitButton(deleteCardModalButton, "Yes");
      });
  });
  deleteCardModalInstance.open();
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .likeCountRemove(card._id)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch(() => {});
  } else {
    api
      .likeCountAdd(card._id)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch(() => {});
  }
}

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardImageClick,
    (cardID) => handleDeleteClick(card, cardID),
    handleLikeClick
  );

  const cardElement = card.getView();
  return cardElement;
}

// Modal Image
const imagePreviewModal = new PopupWithImage(imageModalSelector);
imagePreviewModal.setEventListeners();

// Functions
function addCard(data) {
  const cardData = {
    name: data.title,
    link: data.imageURL,
  };

  renderCard(cardData);
  addCardFormPopup.close();

  api
    .addNewCard(cardData)
    .then((data) => {
      userinfoComponent.setUserImage(data.avatar);
    })
    .then(() => {
      imagePreviewModal.close();
    })
    .catch(() => {})
    .finally(() => {
      submitButton(imagePreviewModal, "Save");
    });
}

// card format
const addCardModalSelector = "#add-card-modal";
// const data = () => {};

const addCardFormPopup = new PopupWithForm(addCardModalSelector, addCard);
addCardFormPopup.setEventListeners();
addCardFormPopup.close();

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();

  addCardFormPopup.open();
});

// Profile

const profileModal = new PopupWithForm(selectors.profileModal, (data) => {
  const { title, description } = data;
  userinfoComponent.setUserInfo(title, description);
  profileModal.close();
});

profileModal.setEventListeners();

const loggedInUser = api.getUserInfo();
loggedInUser.then((result) => {
  userinfoComponent.getUserInfo({ name: result.name, job: result.about });
});

api
  .getUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value,
  })
  .then((result) => {
    console.log(result);
    userinfoComponent.setUserInfo(result.name, result.about);
  });

profileEditButton.addEventListener("click", () => {
  const profileInfo = userinfoComponent.getUserInfo();

  profileTitleInput.value = profileInfo.profileName;
  profileDescriptionInput.value = profileInfo.description;

  profileModal.open();
});

// Form Validators

const addCardFormValidator = new FormValidator(config, addCardFormElement);
const profileEditFormValidator = new FormValidator(config, profileEditForm);

addCardFormValidator.enableValidation();
profileEditFormValidator.enableValidation();
