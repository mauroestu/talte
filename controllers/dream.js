'use strict'

const information = require('../models/model');

function getAllInformation(req,res){
	information.find({},(err,data) =>{
		if(err) return res.status(500).send({message: 'Error al realizar la peticion.'});
		if(!data) return res.status(404).send({message: 'No hay informacion guardada.'});

		res.jsonp(200,{data});
	});
}

function saveInformation(req,res){
	let data = new information();

	data.luz = req.body.luz;
	data.contaminacion = req.body.contaminacion;
	data.temperatura = req.body.temperatura;
	data.humedad = req.body.humedad;
	data.ruido = req.body.ruido;
	data.movimiento = req.body.movimiento;

	data.save((err,fact) => {
		if(err) res.status(500).send({message: 'Error al guardar en la BD.'});
		else console.log('Dato guardado.');
	});
	res.status(200).jsonp({message: 'Dato guardado.'});
}

function obtainInformation(req,res){

	let fecha = req.params.date;

	information.find({fecha: fecha},(err,data)=>{
		res.jsonp(200,{data});
	});


}

function deleteInformation(req,res){
	information.find({},(err,data) =>{
		if(err) res.status(500).send({message: 'Error al borrar la informacion.'});

		information.remove((err) => {
			if(err) res.status(500).send({message: 'Error al borrar la informacion.'});
			res.status(200).send({message: 'La data ha sido eliminada.'});
		});
	});
}

module.exports = {
	getAllInformation,
	saveInformation,
	obtainInformation,
	deleteInformation
}
