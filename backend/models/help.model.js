const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const helpSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Help = mongoose.model('Help', helpSchema);

module.exports = Help;