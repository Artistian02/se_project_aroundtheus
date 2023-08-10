export default class Api {
  constructor(url) {
    this._baseUrl = url.baseUrl;
    this._header = url.headers;
  }

  async _checkRequest(res) {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkRequest(res);
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._header,
    });
  }

  editProfileForm(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    });
  }

  editProfileImage(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._header,
    });
  }

  addNewCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  likeCountAdd(cardID) {
    return this._request(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._header,
    });
  }

  likeCountRemove(cardID) {
    return this._request(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._header,
    });
  }

  likeCount(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      headers: this._header,
    });
  }

  loadData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  deleteCard(cardID) {
    return this._request(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._header,
    });
  }
}
