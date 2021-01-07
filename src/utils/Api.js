class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getInitialCards() {
    return this._fetcher("/cards", "GET");
  }

  getUserData() {
    return this._fetcher("/users/me", "GET");
  }

  updateUserData(newUserData) {
    return this._fetcher("/users/me", "PATCH", newUserData);
  }

  likeCard(cardId) {
    return this._fetcher(`/cards/likes/${cardId}`, "PUT");
  }

  unLikeCard(cardId) {
    return this._fetcher(`/cards/likes/${cardId}`, "DELETE");
  }

  uploadNewCard(card) {
    return this._fetcher("/cards", "POST", card);
  }

  deleteCard(cardId) {
    return this._fetcher(`/cards/${cardId}`, "DELETE");
  }

  updateAvatar(newAvatar) {
    return this._fetcher("/users/me/avatar", "PATCH", newAvatar);
  }

  _fetcher(path, method, body) {
    const options = {
      method: method,
      headers: this._headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-16",
  headers: {
    authorization: "67c1746d-dc65-4cb3-99d8-23254d14e06e",
    "Content-Type": "application/json",
  },
});

export default api;