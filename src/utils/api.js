class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._getJsonOnError = this._getJsonOnError.bind(this);
  }

  _getJsonOnError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getJsonOnError);
  };

  createUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._getJsonOnError);
  };

  createUserAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getJsonOnError);
  };

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getJsonOnError);
  };

  createUserCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._getJsonOnError);
  };

  deleteUserCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOnError);
  };

  changeLikeCardStatus = (id, isliked) => {
    return isliked ? this.createLike(id) : this.deleteLike(id);
  };

  createLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ id }),
    }).then(this._getJsonOnError);
  };

  deleteLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOnError);
  };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "71958807-8b11-4210-86a4-64ac3be2e55a",
    "Content-Type": "application/json",
  },
});

export default api;
