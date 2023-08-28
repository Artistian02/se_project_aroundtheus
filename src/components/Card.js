class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDeleteClick;
    this._handleLike = handleLikeClick;
    this._likes = Array.isArray(data.likes) ? data.likes : [];
    this._cardID = data._id;
    this._isLiked = data.isLiked;
    this._currentUserId = currentUserId;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._owner._id);
  }

  likeCountAdd() {
    this._handleLike(this);
  }

  likeCountRemove() {
    this._handleLikeRemove(this._cardID);
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const cardImage = this._element.querySelector(".card__image");

    likeButton.addEventListener("click", () => this._handleLike(this));

    if (this._owner._id === this._currentUserId) {
      deleteButton.style.display = "block"; // Show the trash button
      deleteButton.addEventListener("click", () => {
        this._handleDelete(this, this._cardID);
        deleteButton.remove();
      });
    } else {
      deleteButton.style.display = "none"; // Hide the trash button
    }

    cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeClick() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  // _handleDeleteClick() {
  //   this.deleteCard();
  // }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _renderLikes() {
    const likesCountElement = this._element.querySelector(".card__likes-count");
    likesCountElement.textContent = this._likes.length;

    const likeButton = this._element.querySelector(".card__like-button");

    if (this.isLiked()) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  setLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }

  getView() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".card__image");

    cardImage.src = this._link;
    cardImage.alt = `Photo of ${this._name}`;
    const cardTitle = this._element.querySelector(".card__title");
    cardTitle.textContent = this._name;

    this._renderLikes();
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
