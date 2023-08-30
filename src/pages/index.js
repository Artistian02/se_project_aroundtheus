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

// Add Card Popup//
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  (cardData) => {
    handleFormSubmit(cardData); // Call the form submission handler
  },
  "Saving..."
);

// Function to handle form submission
function handleFormSubmit(cardData) {
  addCardPopup.showLoading();

  api
    .addNewCard(cardData)
    .then((newCardData) => {
      renderCard(newCardData);
      addCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      addCardPopup.hideLoading();
    });
}

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
      .deleteCard(cardID)
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
    editAvatarPopup.renderLoading();

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
  "Saving..."
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

const section = new Section({}, containerSelector);

// Functions

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardImageClick,
    (cardID) => handleDeleteClick(card, cardID),
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
  addNewCardButton.classList.add("showLoading");
  api
    .addNewCard(cardData)
    .then((newCard) => {
      const cardElement = renderCard(newCard);
      section.addItem(cardElement);
      addCardFormPopup.close();
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    })
    .finally(() => {
      addNewCardButton.classList.remove("hideLoading");
    });
}
const api = new Api(apiURL);

const imagePreviewModal = new PopupWithImage(imageModalSelector);
imagePreviewModal.setEventListeners();

function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

api
  .getUserInfo()
  .then((currentUser) => {
    currentUserId = currentUser._id;

    api
      .getInitialCards()
      .then((cardData) => {
        cardData.forEach((cardItem) => {
          const card = new Card(
            cardItem,
            "#card-template",
            handleCardImageClick,
            handleDeleteClick,
            handleLikeClick,
            currentUserId
          );

          const cardElement = card.getView();
          section.addItem(cardElement);
        });
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
// addCardFormPopup.close();

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();

  addCardFormPopup.renderLoading(false);
  addCardFormPopup.open();
});

// Profile

const profileModal = new PopupWithForm(selectors.profileModal, (data) => {
  const { title, description } = data;
  userInfoComponent.setUserInfo(title, description);
  profileModal.close();
});

profileModal.setEventListeners();

api
  .getUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value,
  })
  .then((result) => {
    userInfoComponent.setUserInfo(result.name, result.about);
    userInfoComponent.setAvatar(result.avatar);
  })
  .catch((error) => {
    // Handle error from getUserInfo
    console.error("Error updating user info:", error);
  });

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
