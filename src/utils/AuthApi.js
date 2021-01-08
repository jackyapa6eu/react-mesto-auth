class AuthApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getUserData(token) {
    const headers = {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
    }
    return this._fetcher("/users/me", "GET", null, headers);
  }

  createUser(userData) {
    return this._fetcher("/signup", "POST", userData);
  }

  signInUser(userData) {
    return this._fetcher("/signin", "POST", userData);
  }

  _fetcher(path, method, body, headers = this._headers) {
    const options = {
      method: method,
      headers,
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

const authApi = new AuthApi({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;