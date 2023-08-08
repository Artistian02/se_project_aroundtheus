class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDeleteClick;
    this._handleLike = handleLikeClick;
    this._likes = Array.isArray(data.likes) ? data.likes : [];
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const cardImage = this._element.querySelector(".card__image");

    likeButton.addEventListener("click", () => this._handleLikeIcon());

    deleteButton.addEventListener("click", () => this._handleDelete(this));

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  updateLikesCount(likes) {
    this._likes = likes;
    const likesCountElement = this._element.querySelector(".card__likes-count");
    likesCountElement.textContent = this._likes;
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDelete(card) {
    this._handleDelete(card);
    // this._element.remove();
    // this._element = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");

    cardImage.src = this._link;
    cardImage.alt = `Photo of ${this._name}`;
    const cardTitle = this._element.querySelector(".card__title");
    cardTitle.textContent = this._name;
    const likesCountElement = this._element.querySelector(".card__likes-count");
    likesCountElement.textContent = this._likes.length;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
