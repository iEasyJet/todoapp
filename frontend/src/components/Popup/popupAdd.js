import { useRef } from 'react';
import './popup.scss';

function PopupAdd(props) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();

  function addNewCard() {
    props.addNewCard({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
      priority: priorityRef.current.value,
      status: statusRef.current.value,
    });
    titleRef.current.value = '';
    descriptionRef.current.value = '';
  }
  return (
    <div
      className={`popup popup-add-card ${props.isOpen ? 'popup_opened' : ''}`}
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
            placeholder='Краткое наименование задачи(Обязательно)'
            required
            ref={titleRef}
          />
          <textarea
            className='form__description'
            type='text'
            placeholder='Описание задачи(Обязательно)'
            required
            ref={descriptionRef}
          ></textarea>
          <input className='form__date' type='date' required ref={dateRef} />
          <label htmlFor='priority' className='form__label'>
            Приоритет задачи:
            <select
              required
              className='form__select form__priority'
              id='priority'
              ref={priorityRef}
            >
              <option value='white'>Низкий</option>
              <option value='green'>Нормальный</option>
              <option value='red'>Высокий</option>
            </select>
          </label>
          <label htmlFor='status' className='form__label'>
            Статус задачи:
            <select
              required
              className='form__select form__status'
              id='status'
              ref={statusRef}
            >
              <option value='new'>Новая</option>
              <option value='atWork'>В работе</option>
            </select>
          </label>
          <button type='button' className='form__ready' onClick={addNewCard}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupAdd;
