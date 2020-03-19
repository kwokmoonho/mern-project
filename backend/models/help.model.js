const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const helpSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
}, {
  timestamps: true,
});

const Help = mongoose.model('Help', helpSchema);

module.exports = Help;