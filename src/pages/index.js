// imports
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import UserinfoComponent from "../components/Userinfo";
import Card from "../components/Card";
import { initialCards, selectors, config } from "../utils/constants.js";
import "./index.css";

const userinfoComponent = new UserinfoComponent(
  selectors.profileTitle,
  selectors.profileDescription
);

// Card
function handleCardImageClick() {}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  section.addItem(card.getCardElement());
}
export const cardListEl = document.querySelector(".cards__list");

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
  const createCardTitleInput = document.getElementById("card-title-input");
  const createCardDescriptionInput = document.getElementById("card-url-input");

  // const cardData = {
  //   name: createCardTitleInput.value,
  //   link: createCardDescriptionInput.value,
  // };

  // addCardFormElement.reset();
  const cardElement = renderCard(cardData);

  cardSection.addItem(cardElement);
  // closeModal(addCardModal);
  addCardFormPopup.disableButton();
  addCardFormPopup.close();
}

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
    profileTitleInput.value,
    profileDescriptionInput.value
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
