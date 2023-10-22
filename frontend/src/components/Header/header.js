import './header.scss';

function header(props) {
  return (
    <header className='header'>
      <h1 className='header__title'>Список задач</h1>
      <div className='header_circle'>
        <button
          className='header__new-entry'
          onClick={props.handleOpenPopupAdd}
        >
          <span className='header__add-circle material-symbols-outlined'>
            add_circle
          </span>
        </button>
      </div>
    </header>
  );
}

export default header;
