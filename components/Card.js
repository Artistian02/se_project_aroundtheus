import { handleImageModalInfo } from "../pages/index.js";
import { openModal } from "../utils/utils.js";

export default class Card {
  #card;
  #likeButton;
  #cardImage;
  #cardCaption;
  #deleteButton;
  #name;
  #link;
  #cardTemplateSelector;

  constructor({ name, link }, cardTemplateSelector) {
    this.#name = name;
    this.#link = link;
    this.#cardTemplateSelector = cardTemplateSelector;
  }

  #returnEmptyClone() {
    const cardTemplate = document.querySelector(this.#cardTemplateSelector)
      .content.firstElementChild;
    return cardTemplate.cloneNode(true);
  }

  #fillMarkupWithData() {
    this.#cardImage.src = this.#link;
    this.#cardImage.alt = this.#name;
    this.#cardCaption.textContent = this.#name;
  }

  #toggleLikeButton = (event) => {
    event.target.classList.toggle("card__like-button_inactive");
  };

  #deleteCard = (event) => {
    this.#card.remove();
  };

  #openImageModal = (event) => {
    const imageModal = document.querySelector("#image-modal");
    openModal(imageModal);
    handleImageModalInfo(event, imageModal);
  };

  #addLikeButtonEventListener() {
    this.#likeButton.addEventListener("click", this.#toggleLikeButton);
  }

  #addDeleteButtonEventListener() {
    this.#deleteButton.addEventListener("click", this.#deleteCard);
  }

  #addImageEventListener() {
    this.#cardImage.addEventListener("click", this.#openImageModal);
  }

  #addEventListeners() {
    this.#addLikeButtonEventListener();
    this.#addDeleteButtonEventListener();
    this.#addImageEventListener();
  }

  #completeNewCard() {
    this.#card = this.#returnEmptyClone();
    this.#likeButton = this.#card.querySelector(".card__like-button");
    this.#cardImage = this.#card.querySelector(".card__image");
    this.#cardCaption = this.#card.querySelector(".card__caption");
    this.#deleteButton = this.#card.querySelector(".card__delete-button");
    this.#fillMarkupWithData();
    this.#addEventListeners();
    return this.#card;
  }

  returnCard() {
    return this.#completeNewCard();
  }
}

// Loop over initialCards and create cards
document.addEventListener("DOMContentLoaded", () => {
  // renderInitialCards(initialCards);
});
