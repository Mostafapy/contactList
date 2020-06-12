const express = require('express');

/** Controllers */
const {
  addContact,
  getAll,
  getByFilter,
  updateContact,
  deleteContactById,
} = require('../controllers/contact.controller');

const authorization = require('../middlewares/authorization.middleware');

const router = express.Router();

router.post('/addContact', authorization(), addContact);

router.get('/getAll/:page', authorization(), getAll);

router.post('/updateContact', authorization(), updateContact);

router.post('/getByFilter', authorization(), getByFilter);

router.delete('/deleteContactById/:id', authorization(), deleteContactById);

module.exports = router;
