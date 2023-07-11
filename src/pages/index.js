// imports
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserinfoComponent from "../components/Userinfo";
import Card from "../components/Card";
import {
  initialCards,
  selectors,
  config,
  cardListEl,
  imageModalSelector,
  addNewCardButton,
  profileEditButton,
  addCardFormElement,
  profileEditForm,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";
import "./index.css";

const userinfoComponent = new UserinfoComponent(
  selectors.profileTitle,
  selectors.profileDescription
);

// Card
function handleCardImageClick() {}

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
  cardListEl
);

section.renderItems();

// Modal Image
const imagePreviewModal = new PopupWithImage(imageModalSelector);
imagePreviewModal.setEventListeners();

// Functions
function addCard(data) {
  const cardData = {
    name: data["card-title-input"],
    link: data["card-url-input"],
  };

  renderCard(cardData);
  addCardFormPopup.close();
}
const cardElement = renderCard(cardData);
section.addItem(cardElement);

// card format
const addCardModalSelector = "#add-card-modal";
const data = () => {};

const addCardFormPopup = new PopupWithForm(addCardModalSelector, addCard);
addCardFormPopup.setEventListeners();
addCardFormPopup.close();

addNewCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

// Profile
const profileModal = new PopupWithForm(selectors.profileModal, (data) => {
  userinfoComponent.setUserInfo(
    data.profileTitleInput,
    data.profileDescriptionInput
  );
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
