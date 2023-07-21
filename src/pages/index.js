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
} from "../utils/constants.js";
import "./index.css";

const userinfoComponent = new Userinfo(
  selectors.profileTitle,
  selectors.profileDescription
);

//Api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/users/me ",
  headers: {
    authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
    "Content-Type": "application/json",
  },
});

fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
  method: "PATCH",
  headers: {
    authorization: "a1101938-3641-4790-a37b-6b7f03e0e338",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist",
  }),
});

let cardList;

api.getInitialCards().then((result) => {
  const section = new Section(
    {
      items: result,
      renderer: (item) => {
        const cardElement = createCard(item);
        section.addItem(cardElement);
      },
    },
    ".cards__list"
  );

  section.renderItems();

  cardList = section;
});

// Card
function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  containerSelector
);

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  const cardElement = card.getView();
  section.addItem(cardElement);
}
section.renderItems();

const cardSelector = selectors.cardTemplate;

handleDeleteClick: () => {
  deleteCardPopup.setAction(() => {
    setSubmitButtonText(deleteCardModalButton, "Deleting...");
    api
      .deleteCard(card._id)
      .then(() => {
        cardElement.handleDelete();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error(err.status);
      })
      .finally(() => {
        setSubmitButtonText(deleteCardModalButton, "Yes");
      });
  });
  deleteCardPopup.open();
};

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
      setSubmitButtonText(imagePreviewModal, "Save");
    });
}

// card format
const addCardModalSelector = "#add-card-modal";
const data = () => {};

const addCardFormPopup = new PopupWithForm(addCardModalSelector, addCard);
addCardFormPopup.setEventListeners();
addCardFormPopup.close();

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton(); // Disable the submit button

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
  userinfoComponent.updateUserInfo({ name: result.name, job: result.about });
  userinfoComponent.updateProfileAvatar(result.avatar);
});

api
  .getUserInfo({
    name: profileTitleInput.value,
    about: profileDescriptionInput.value,
  })
  .then((result) => {
    console.log(result);
    userinfoComponent.updateUserInfo({ name: result.name, job: result.about });
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
