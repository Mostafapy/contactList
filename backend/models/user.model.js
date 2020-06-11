const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
    updateActionId: {
      type: Number,
      required: true,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', UserSchema);
