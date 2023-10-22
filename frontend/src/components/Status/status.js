import './status.scss';

function status(props) {
  return (
    <div className='status'>
      <div className='status__group'>
        <button className='status__button' onClick={props.isOverdueCards}>
          <span className='status__word'>Просроченные</span>
          <span className='status__icon material-symbols-outlined'>
            sentiment_dissatisfied
          </span>
        </button>
        <button className='status__button' onClick={props.isNewCards}>
          <span className='status__word'>Новые</span>
          <span className='status__icon material-symbols-outlined'>
            sentiment_neutral
          </span>
        </button>
      </div>
      <div className='status__group'>
        <button className='status__button' onClick={props.isCardsAtWork}>
          <span className='status__word'>В работе</span>
          <span className='status__icon material-symbols-outlined'>
            sentiment_satisfied
          </span>
        </button>
        <button className='status__button' onClick={props.isReadyCards}>
          <span className='status__word'>Завершенные</span>
          <span className='status__icon material-symbols-outlined'>mood</span>
        </button>
      </div>
    </div>
  );
}

export default status;
