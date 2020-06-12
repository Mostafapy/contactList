const contactModel = require('./../models/contact.model');

const { createResponse } = require('./../utils/response.util');

const logger = require('./../utils/logger.util')(
  'Controllers:ContactController',
);

const addContact = async (req, res) => {
  try {
    const { name, phoneNumber, address, notes } = req.body;

    const createdContact = await contactModel.create({
      name,
      phoneNumber,
      address,
      notes,
    });

    return res
      .status(200)
      .json(createResponse(true, 'Done', null, { createdContact }));
  } catch (err) {
    logger.error('@addContact() [error: %S]'.red, err.stack);

    return res
      .status(500)
      .json(createResponse(false, err.message, err.stack, null, 500));
  }
};

const getAll = async (req, res) => {
  try {
    const { page } = req.param;
    const perPage = 5;

    const contacts = await contactModel.find
      .limit(perPage)
      .skip(perPage * parseInt(page));

    return res
      .status(200)
      .json(createResponse(true, 'Done', null, { contacts }));
  } catch (err) {
    logger.error('@getAll() [error: %S]'.red, err.stack);

    return res
      .status(500)
      .json(createResponse(false, err.message, err.stack, null, 500));
  }
};

const getByFilter = async (req, res) => {
  try {
    const { phoneNumber, address } = req.body;

    let phoneNumberCondition = {};

    let addressCondition = {};

    if (phoneNumber) {
      phoneNumberCondition = { phoneNumber };
    }

    if (address) {
      addressCondition = { address };
    }

    const filter = { ...phoneNumberCondition, ...addressCondition };

    const foundContact = await contactModel.find(filter);

    return res
      .status(200)
      .json(createResponse(true, 'Done', null, { contact: foundContact }));
  } catch (err) {
    logger.error('@getByFilter() [error: %S]'.red, err.stack);

    return res
      .status(500)
      .json(createResponse(false, err.message, err.stack, null, 500));
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.user;

    const { name, phoneNumber, address, notes } = req.body;

    const updatedContact = await contactModel.update(
      {
        phoneNumber,
        address,
        notes,
        updatedBy: id,
      },
      { name, phoneNumber, address },
    );

    return res
      .status(200)
      .json(createResponse(true, 'Done', null, { contact: updatedContact }));
  } catch (err) {
    logger.error('@updateContact() [error: %S]'.red, err.stack);

    return res
      .status(500)
      .json(createResponse(false, err.message, err.stack, null, 500));
  }
};

const deleteContactById = async (req, res) => {
  try {
    const { id } = req.param;

    await contactModel.remove({ _id: id });

    return res.status(200).json(createResponse(true, 'Done', null, null));
  } catch (err) {
    logger.error('@deleteContactById() [error: %S]'.red, err.stack);

    return res
      .status(500)
      .json(createResponse(false, err.message, err.stack, null, 500));
  }
};

module.exports = {
  addContact,
  getAll,
  getByFilter,
  updateContact,
  deleteContactById,
};
