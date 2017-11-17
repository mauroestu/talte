'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  correo: {type: String, required: true},
  pass: {type: String, required: true},
  celular: {type: String, required: true},
  codigo: {type:Number, required: true}
});

module.exports = mongoose.model('user',UserSchema);
