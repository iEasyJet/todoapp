const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ cards });
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { title, description, date, priority, status } = req.body;

  Card.create({
    title,
    description,
    date,
    priority,
    status,
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы неккоркетные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    })
    .then((card) => {
      Card.findByIdAndRemove(card._id).then(() => {
        res.send({ message: 'Карточка удалена успешно!' });
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы неккоректные данные'));
      } else {
        next(err);
      }
    });
};

const editCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, req.body, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      Card.find({}).then((cards) => {
        res.send({ cards });
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new ValidationError(
            'Переданы некорректные данные при обновлении профиля'
          )
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  editCard,
};
