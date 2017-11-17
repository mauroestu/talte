'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let hoy = new Date();
let fecha = hoy.getDate() + (hoy.getMonth() + 1) +  hoy.getFullYear();


const InformationSchema = Schema({
	luz: {type: Number, required: true},
	contaminacion: {type: Number, required: true},
	temperatura: {type: Number, required: true},
	humedad: {type: Number, required: true},
	ruido: {type: Number, required: true},
	movimiento: {type: Number, required: true},
	fecha: { type: Number, default: fecha},
	codigo: {type: Number, default: 1}
});

module.exports = mongoose.model('information',InformationSchema);
