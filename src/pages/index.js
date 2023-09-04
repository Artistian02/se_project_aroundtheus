// imports
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Userinfo from "../components/Userinfo";
import Card from "../components/Card";
import Api from "../components/Api";
import {
  initialCards,
  selectors,
  // config,
  containerSelector,
  imageModalSelector,
  addNewCardButton,
  profileEditButton,
  addCardFormElement,
  profileEditForm,
  profileTitleInput,
  profileDescriptionInput,
  modalButton,
  formValidatorConfig,
  profileAvatarButton,
  editAvatarForm,
  // profileAvatar,
} from "../utils/constants.js";
import "./index.css";

const userInfoComponent = new Userinfo(
  selectors.profileTitle,
  selectors.profileDescription,
  selectors.profileAvatar
);

////// Api /////////

const apiURL = {
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
    "Content-Type": "application/json",
  },
};
let currentUserId;

// // // Add Card Popup//
// // const addCardPopup = new PopupWithForm(
// //   "#add-card-modal",
// //   "Save"
// );

// Delete Card //
const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-modal",
  "Deleting..."
);
deleteCardPopup.setEventListeners();

function handleDeleteClick(card, cardID) {
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.showLoading();
    api
      .deleteCard(card._cardID)
      .then(() => {
        card.deleteCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        deleteCardPopup.hideLoading();
      });
  });

  deleteCardPopup.open();
}

// Editing Profile //
const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  (inputValues) => {
    editAvatarPopup.renderLoading(true);

    const avatarData = {
      avatar: inputValues.imageURL,
    };

    api
      .editProfileImage(avatarData)
      .then(() => {
        userInfoComponent.setAvatar(inputValues.imageURL);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.error("Error updating avatar:", err);
      })
      .finally(() => {
        editAvatarPopup.hideLoading();
      });
  },
  "Save"
);

profileAvatarButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

editAvatarPopup.setEventListeners();

// Likes///
function handleLikeClick(card) {
  const isLiked = card.isLiked();
  const cardID = card._cardID;

  if (isLiked) {
    api
      .likeCountRemove(cardID)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  } else {
    api
      .likeCountAdd(cardID)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch((error) => {
        console.error("Error adding like:", error);
      });
  }
}

// Functions

function createCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  );

  return card.getView();
}

function addCard(data) {
  const cardData = {
    name: data.title,
    link: data.imageURL,
  };

  // Show loading state

  addCardFormPopup.renderLoading(true);
  api
    .addNewCard(cardData)
    .then((newCard) => {
      const cardElement = createCardElement(newCard);
      section.addItem(cardElement);
      addCardFormPopup.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      addCardFormPopup.hideLoading();
    });
}
const api = new Api(apiURL);

const imagePreviewModal = new PopupWithImage(imageModalSelector);
imagePreviewModal.setEventListeners();

function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

let section;

api
  .getUserInfo()
  .then((currentUser) => {
    currentUserId = currentUser._id;

    userInfoComponent.setUserInfo(currentUser.name, currentUser.about);
    userInfoComponent.setAvatar(currentUser.avatar);

    // Set the user info on the profile modal
    profileTitleInput.value = currentUser.name;
    profileDescriptionInput.value = currentUser.about;

    api
      .getInitialCards()
      .then((cardData) => {
        section = new Section(
          {
            items: cardData,
            renderer: (card) => {
              const cardElement = createCardElement(card);
              section.addItem(cardElement);
            },
          },
          containerSelector
        );
        section.renderItems();
      })
      .catch((error) => {
        console.error("Error fetching initial cards:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching user info:", error);
  });

// card format
const addCardModalSelector = "#add-card-modal";

const addCardFormPopup = new PopupWithForm(addCardModalSelector, addCard);
addCardFormPopup.setEventListeners();

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();

  addCardFormPopup.open();
});

// Profile

const profileModal = new PopupWithForm(selectors.profileModal, (data) => {
  const { title, description } = data;
  userInfoComponent.setUserInfo(title, description);
  profileModal.close();
});

profileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const profileInfo = userInfoComponent.getUserInfo();

  profileTitleInput.value = profileInfo.profileName;
  profileDescriptionInput.value = profileInfo.description;

  profileModal.open();
});

// Form Validators

const addCardFormValidator = new FormValidator(
  formValidatorConfig,
  addCardFormElement
);
addCardFormValidator.enableValidation();

const profileEditFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  formValidatorConfig,
  editAvatarForm
);
avatarFormValidator.enableValidation();
