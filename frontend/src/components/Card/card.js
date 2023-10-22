import './card.scss';

function card(props) {
  function handleEditCardClick() {
    props.handleEditCardClick(props.card);
  }

  function handleCardClick() {
    props.handleCardClick(props.card);
  }

  function deleteCard() {
    props.deleteCard(props.card._id);
  }

  return (
    <li className='card'>
      <div className='card__wrapper'>
        <div
          className={`card__priority card__priority_${props.card.priority}`}
        ></div>
        <p className='card__title'>{props.card.title}</p>
      </div>
      <div className='card__wrapper'>
        <span
          className='card__button material-symbols-outlined'
          onClick={handleCardClick}
        >
          resize
        </span>
        <span
          className='card__button material-symbols-outlined'
          onClick={handleEditCardClick}
        >
          edit
        </span>
        <span
          className='card__button material-symbols-outlined'
          onClick={deleteCard}
        >
          delete
        </span>
      </div>
    </li>
  );
}

export default card;
