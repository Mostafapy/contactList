const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phoneNumber'],
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      unique: true,
    },
    notes: {
      type: String,
      required: [true, 'Please add notes'],
    },
    updatedBy: {
      type: Number,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('contact', ContactSchema);
