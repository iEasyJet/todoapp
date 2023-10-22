const { celebrate, Joi, Segments } = require('celebrate');

const postCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().required(),
    priority: Joi.string().required(),
    status: Joi.string().required(),
  }),
});

const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  postCardValidation,
  cardIdValidation,
};
