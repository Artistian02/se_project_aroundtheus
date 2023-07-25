export default class Api {
  constructor(url) {
    this._baseUrl = url.baseUrl;
    this._header = url.headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  async _request(url, options) {
    try {
      const res = await fetch(url, options);
      return this._checkRequest(res);
    } catch (error) {
      // console.error("API Request Error:", error);
      throw error;
    }
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._header,
    })
      .then(this._checkResponse)
      .catch((error) => {
        // console.error("Error fetching initial cards:", error);
        throw error;
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

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    });
  }

  likeCountAdd(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._header,
    });
  }

  likeCountRemove(cardId) {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._header,
    });
  }

  likeCount(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._header,
    });
  }

  loadData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}
