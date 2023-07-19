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
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    // "Content-Type" "application/json"
  },
  body: JSON.stringify({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist",
  }),
});
// Card
function handleCardImageClick(cardData) {
  imagePreviewModal.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  const cardElement = card.getView();
  section.addItem(cardElement);
}

const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  containerSelector
);

section.renderItems();

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
