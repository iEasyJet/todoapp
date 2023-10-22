import './popup.scss';

function PopupView(props) {
  return (
    <div
      className={`popup popup-add-card ${
        props.card.isOpen ? 'popup_opened' : ''
      }`}
      onClick={props.isCloseOnOverlay}
    >
      <div className='popup-add-card__wrapper'>
        <span
          className='popup-add-card__close material-symbols-outlined'
          onClick={props.isClose}
        >
          cancel
        </span>
        <form className='form'>
          <input
            className='form__title'
            type='text'
            placeholder='Краткое наименование задачи'
            required
            value={props.card.title}
            readOnly
          />
          <textarea
            className='form__description form__description_view-mod'
            type='text'
            placeholder='Описание задачи'
            required
            value={props.card.description}
            readOnly
          ></textarea>
          <p className='form__label'>Дата выполнения: {props.card.date}</p>
          <p className='form__label'>
            Приоритет задачи:
            {props.card.priority === 'white'
              ? ' Низкий'
              : props.card.priority === 'red'
              ? ' Высокий'
              : ' Нормальный'}
          </p>
          <p className='form__label'>
            Статус задачи:{' '}
            {props.card.status === 'new'
              ? ' Новая'
              : props.card.status === 'atWork'
              ? ' В работе'
              : ' Завершенная'}
          </p>
        </form>
      </div>
    </div>
  );
}

export default PopupView;
