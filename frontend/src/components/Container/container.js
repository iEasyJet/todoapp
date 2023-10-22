import './container.scss';
import Card from '../Card/card';

function container(props) {
  return (
    <>
      <div className='container'>
        <ul className='container__wrapper'>
          <li className='container__title'>{props.containerTitle}</li>
          {props.cards.map((i) => (
            <Card
              handleCardClick={props.handleCardClick}
              key={i._id}
              card={i}
              deleteCard={props.deleteCard}
              handleEditCardClick={props.handleEditCardClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default container;
