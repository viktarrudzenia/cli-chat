const { Schema, model } = require('mongoose');

const thingSchema = new Schema({
  title:  {
    type: String,
    required: true,
  },
  body: String,
  _deletedAt: { type: Date, default: null },
});

module.exports = model('things', thingSchema);
