class Api {
  constructor(config) {
    this._url = config.url;
  }

  // Анализирование ответа
  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`Произошла ошибка со статус-кодом ${res.status}`)
    );
  }

  // Получение карточек с сервера
  getInitalCards() {
    return fetch(`${this._url}/cards`).then((res) => this._parseResponse(res));
  }

  // Добавление новой карточки
  addNewCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: card.title,
        description: card.description,
        date: card.date,
        priority: card.priority,
        status: card.status,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
    }).then((res) => this._parseResponse(res));
  }

  // Смена данных в карточке
  changeCard(card) {
    return fetch(`${this._url}/cards/edit/${card.cardId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: card.title,
        description: card.description,
        date: card.date,
        priority: card.priority,
        status: card.status,
      }),
    }).then((res) => this._parseResponse(res));
  }
}

const configApi = {
  url: 'http://localhost:3003',
};

const api = new Api(configApi);

export default api;
