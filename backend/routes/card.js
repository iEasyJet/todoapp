const router = require('express').Router();
const {
  postCardValidation,
  cardIdValidation,
} = require('../middlewares/validation');
const {
  getCards,
  postCard,
  deleteCard,
  editCard,
} = require('../controllers/card');

router.get('/cards', getCards);
router.post('/cards', postCardValidation, postCard);
router.patch('/cards/edit/:cardId', cardIdValidation, editCard);
router.delete('/cards/:cardId', cardIdValidation, deleteCard);

module.exports = router;
