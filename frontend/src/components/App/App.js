import './App.scss';
import Header from '../Header/header';
import Status from '../Status/status';
import Container from '../Container/container';
import PopupAdd from '../Popup/popupAdd';
import PopupView from '../Popup/popupView';
import PopupEdit from '../Popup/popupEdit';
import { useState, useEffect } from 'react';

import api from '../../utils/api';

function App() {
  const [ispopupAdd, setPopupAdd] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    title: '',
    description: '',
    date: '',
    priority: '',
    status: '',
  });
  const [editCard, setEditCard] = useState({
    isOpen: false,
    title: '',
    description: '',
    date: '',
    priority: '',
    status: '',
  });
  const [containerTitle, setContainerTitle] = useState('');
  const [cards, setCards] = useState([]);
  const [filtredCards, setFiltredCards] = useState([]);

  const [filtredCardsNew, setFiltredCardsNew] = useState([]);
  const [filtredCardsAtWork, setFiltredCardsAtWork] = useState([]);
  const [filtredCardsReady, setFiltredCardsReady] = useState([]);
  const [filtredCardsOverDue, setFiltredCardsOverDue] = useState([]);

  /* Открытие попапа для просмотра карточки */
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      title: card.title,
      description: card.description,
      date: card.date,
      priority: card.priority,
      status: card.status,
    });
  }

  function handleEditCardClick(card) {
    setEditCard({
      isOpen: true,
      cardId: card._id,
      title: card.title,
      description: card.description,
      date: card.date,
      priority: card.priority,
      status: card.status,
    });
  }

  /* Открытие попапа для добавления новой карточки */
  function handleOpenPopupAdd() {
    setPopupAdd(true);
  }

  /* Закрытие всех попапов */
  function handleCloseAllPopups() {
    setPopupAdd(false);
    setSelectedCard({
      isOpen: false,
      title: '',
      description: '',
      date: '',
      priority: '',
      status: '',
    });
    setEditCard({
      isOpen: false,
      cardId: '',
      title: '',
      description: '',
      date: '',
      priority: '',
      status: '',
    });
  }

  /* Закрытие по оверлею */
  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      handleCloseAllPopups();
    }
  }

  /* Получение карточек с сервера и фильтрация "В работе" */
  const getCards = () => {
    api
      .getInitalCards()
      .then((res) => {
        setCards(res.cards);
        return res;
      })
      .then((res) => {
        setLoading(true);
        setContainerTitle('Задачи в работе');
        setFiltredCards(res.cards.filter((i) => i.status === 'atWork'));
      })
      .catch(() => {
        console.log('Err!');
      });
  };

  /*Формат даты*/
  function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();

    return yy + '-' + mm + '-' + dd;
  }
  /* Фильтрация "Новые" */
  const isNewCards = () => {
    setContainerTitle('Новые задачи');
    setFiltredCards(cards.filter((i) => i.status === 'new'));
  };

  /* Фильтрация "В работе" */
  const isCardsAtWork = () => {
    setContainerTitle('Задачи в работе');
    setFiltredCards(cards.filter((i) => i.status === 'atWork'));
  };

  /* Фильтрация "Готовые" */
  const isReadyCards = () => {
    setContainerTitle('Задачи выполненные');
    setFiltredCards(cards.filter((i) => i.status === 'ready'));
  };

  /* Фильтрация "Просроченные" */
  const isOverdueCards = () => {
    setContainerTitle('Просроченные задачи');
    setFiltredCards(
      cards.filter(
        (i) => i.date < formatDate(new Date()) && i.status !== 'ready'
      )
    );
  };

  /* Удаление карточки */
  const deleteCard = (id) => {
    api
      .deleteCard(id)
      .then(() => {
        setFiltredCards(filtredCards.filter((i) => i._id !== id));
      })
      .catch(() => {
        console.log('Err!');
      });
  };

  /* Добавление новой карточки */
  const addNewCard = (card) => {
    api
      .addNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        /* setFiltredCards([res, ...filtredCards]); */
        handleCloseAllPopups();
      })
      .then(() => {
        setFiltredCards(cards);
      })
      .catch(() => {
        console.log('Err!');
      });
  };

  /* Внесение изменений в карточку */
  function editNewCard(card) {
    api
      .changeCard(card)
      .then((res) => {
        setCards(res.cards);
        handleCloseAllPopups();
      })
      .catch(() => {
        console.log('Err!');
      });
  }

  /* Эффект для получения карточек */
  useEffect(() => {
    getCards();
  }, []);

  return isLoading ? (
    <>
      <Header handleOpenPopupAdd={handleOpenPopupAdd} />
      <Status
        isNewCards={isNewCards}
        isCardsAtWork={isCardsAtWork}
        isReadyCards={isReadyCards}
        isOverdueCards={isOverdueCards}
      />
      <Container
        containerTitle={containerTitle}
        handleCardClick={handleCardClick}
        handleEditCardClick={handleEditCardClick}
        cards={filtredCards}
        deleteCard={deleteCard}
      />

      <PopupAdd
        isOpen={ispopupAdd}
        isClose={handleCloseAllPopups}
        isCloseOnOverlay={closeOnOverlay}
        addNewCard={addNewCard}
      />
      <PopupEdit
        editNewCard={editNewCard}
        editCard={editCard}
        isClose={handleCloseAllPopups}
        isCloseOnOverlay={closeOnOverlay}
      />
      <PopupView
        card={selectedCard}
        isClose={handleCloseAllPopups}
        isCloseOnOverlay={closeOnOverlay}
      />
    </>
  ) : (
    <></>
  );
}

export default App;
