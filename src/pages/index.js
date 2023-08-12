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
  avatarEditModal,
  profileAvatarButton,
} from "../utils/constants.js";
import "./index.css";

const userinfoComponent = new Userinfo(
  selectors.profileTitle,
  selectors.profileDescription
);

//Api

const apiURL = {
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/",
  headers: {
    authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
    "Content-Type": "application/json",
  },
};

// Add Card Popup//
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  (cardData) => {
    addCardPopup.renderLoading();
    api
      .addNewCard(cardData)
      .then((card) => {
        renderCard(card);
        addCardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        addCardPopup.hideLoading();
      });
  },
  "Saving..."
);

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

    api
      .editProfileImage(inputValues)
      .then(() => {
        profileAvatar.src = inputValues.link;
        editAvatarPopup.close();
      })

      .catch((err) => console.error(err))
      .finally(() => {
        editAvatarPopup.renderLoading();
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
  if (card.isLiked()) {
    api
      .likeCountRemove(card)
      .then((updatedCard) => {
        card.setLikes(updatedCard.likes);
      })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  } else {
    api
      .likeCountAdd(card)
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
    handleLikeClick
  );

  return card.getView();
}

function addCard(data) {
  const cardData = {
    name: data.title,
    link: data.imageURL,
  };

  const cardElement = renderCard(cardData);
  section.addItem(cardElement);

  addCardFormPopup.close();

  api
    .addNewCard(cardData)
    .then((newCardData) => {
      renderCard(newCardData);

      userinfoComponent.setUserImage(newCardData.avatar);
      imagePreviewModal.close();
    })
    .catch((error) => {
      console.error("Error adding new card:", error);
    })
    .finally(() => {});
}

const api = new Api(apiURL);

const imagePreviewModal = new PopupWithImage(imageModalSelector);
imagePreviewModal.setEventListeners();

function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

api.getInitialCards().then((cardData) => {
  cardData.forEach((cardItem) => {
    const card = new Card(
      cardItem,
      "#card-template",
      handleCardImageClick,
      (cardID) => handleDeleteClick(card, cardID),
      handleLikeClick
    );

    const cardElement = card.getView();

    section.addItem(cardElement);
  });

  section.renderItems();
});

// card format
const addCardModalSelector = "#add-card-modal";

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

api
  .getUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value,
  })
  .then((result) => {
    userinfoComponent.setUserInfo(result.name, result.about);
  });

profileEditButton.addEventListener("click", () => {
  const profileInfo = userinfoComponent.getUserInfo();

  profileTitleInput.value = profileInfo.profileName;
  profileDescriptionInput.value = profileInfo.description;

  profileModal.open();
});

// Form Validators

const addCardFormValidator = new FormValidator(
  formValidatorConfig,
  addCardFormElement
);
const profileEditFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditForm
);

addCardFormValidator.enableValidation();
profileEditFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  formValidatorConfig,
  avatarEditModal
);
avatarFormValidator.enableValidation();
