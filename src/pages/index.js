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
  deleteCardModal,
  deleteCardModalButton,
  submitButton,
} from "../utils/constants.js";
import "./index.css";

const userinfoComponent = new Userinfo(
  selectors.profileTitle,
  selectors.profileDescription
);

//Api

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/cohort-3-en",
  headers: {
    authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((cardData) => {
  const section = new Section(
    {
      items: cardData,
      renderer: (cardData) => {
        const card = card(cardData);
        section.addItem(card);
      },
    },
    containerSelector
  );
  section.renderItems();
});

// fetch("https://around.nomoreparties.co/cohort-3-en/", {
//   method: "GET",
//   headers: {
//     authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
//     "Content-Type": "application/json",
//   },
//   // body: JSON.stringify({
//   //   name: "Lake Louise",
//   //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   // }),
// });

function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

function handleDeleteClick(card, cardID) {
  deleteCardModal.setAction(() => {
    submitButton(deleteCardModalButton, "Deleting...");
    api
      .deleteCard(cardID)
      .then(() => {
        card.handleDelete();
        deleteCardModal.close();
      })
      .catch((err) => {
        console.error(err.status);
      })
      .finally(() => {
        submitButton(deleteCardModalButton, "Yes");
      });
  });
  deleteCardModal.open();
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api
      .likeCountRemove(card._id)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch((err) => {
        console.error(err.status);
      });
  } else {
    api
      .likeCountAdd(card._id)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch((err) => {
        console.error(err.status);
      });
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
    .editProfileForm(cardData)
    .then((data) => {
      userinfoComponent.setUserImage(data.avatar);
    })
    .then(() => {
      imagePreviewModal.close();
    })
    .catch((err) => {
      console.error(err.status);
    })
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
  // userinfoComponent.setProfileAvatar(result.avatar);
});

api
  .getUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value,
  })
  .then((result) => {
    console.log(result);
    userinfoComponent.setUserInfo({ name: result.name, job: result.about });
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
