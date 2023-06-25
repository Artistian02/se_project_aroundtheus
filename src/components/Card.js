class Card {
  constructor({ name, link }, cardTemplateSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.cardTemplateSelector = cardTemplateSelector;
    this.handleCardClick = handleCardClick;
  }

  returnEmptyClone() {
    const cardTemplate = document.querySelector(this.cardTemplateSelector)
      .content.firstElementChild;
    return cardTemplate.cloneNode(true);
  }

  fillMarkupWithData() {
    this.cardImage.src = this.link;
    this.cardImage.alt = this.name;
    this.cardCaption.textContent = this.name;
  }

  toggleLikeButton(event) {
    event.target.classList.toggle("card__like-button_active");
  }

  deleteCard(event) {
    this.card.remove();
  }

  addLikeButtonEventListener() {
    this.likeButton.addEventListener("click", this.toggleLikeButton);
  }

  addDeleteButtonEventListener() {
    this.deleteButton.addEventListener("click", this.deleteCard.bind(this));
  }

  addImageEventListener() {
    this.cardImage.addEventListener("click", () => {
      this.handleCardClick(this);
    });
  }

  addEventListeners() {
    this.addLikeButtonEventListener();
    this.addDeleteButtonEventListener();
    this.addImageEventListener();
  }

  completeNewCard() {
    this.card = this.returnEmptyClone();
    this.likeButton = this.card.querySelector(".card__like-button");
    this.cardImage = this.card.querySelector(".card__image");
    this.cardCaption = this.card.querySelector(".card__caption");
    this.deleteButton = this.card.querySelector(".card__delete-button");
    this.fillMarkupWithData();
    this.addEventListeners();
    return this.card;
  }

  returnCard() {
    return this.completeNewCard();
  }
}

export default Card;
