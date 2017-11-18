'use strict'

const information = require('../models/model');

function getAllInformation(req,res){
	information.find({},(err,data) =>{
		if(err) return res.status(500).send({message: 'Error al realizar la peticion.'});
		if(!data) return res.status(404).send({message: 'No hay informacion guardada.'});

		res.jsonp(200,{data});
	});
}

function tips(req,res){
	let fecha = req.params.date;

	information.find({fecha: fecha},(err,data)=>{
		if(err) res.status(500).jsonp({message: 'Error al filtrar datos.'});

		let MediaData = {luz:0, contaminacion:0, temperatura:0, humedad:0, cantidad:0};

		data.forEach((value,key) => {
			MediaData.luz += value.luz;
			MediaData.contaminacion += value.contaminacion;
			MediaData.temperatura += value.temperatura;
			MediaData.humedad += value.humedad;
			MediaData.cantidad = (key + 1);
		});

		MediaData.luz /= MediaData.cantidad;
		MediaData.contaminacion /= MediaData.cantidad;
		MediaData.temperatura /= MediaData.cantidad;
		MediaData.humedad /= MediaData.cantidad;

		data = execTips(MediaData);

		res.status(200).jsonp({data});
	});
}

function execTips(MediaData) {
	let returnTip = {}, messages = '';

	if(between(MediaData.luz,0,50))
	{ messages += '* La luz está en el grado optimo para dormir bien. \n'; }
	else if(between(MediaData.luz,51,1024))
	{ messages += '* La luz es muy alta y no ayuda a tener un sueño óptimo, bajé el nivel de luz en su ambiente. \n'; }

	if(between(MediaData.contaminacion,0,55))
	{ messages += '* La calidad del aire es bastante adecuada. \n'; }
	else if(between(MediaData.contaminacion,56,65))
	{ messages += '* La calidad del aire es normal, pero se mantiene para una calidad de sueño aceptable. \n'; }
	else if(between(MediaData.contaminacion,74,400))
	{ messages += '* La calidad del aire contiene mucho dióxido de carbono, se recomienda limpiar su ambiente.\n'; }
	else if(between(MediaData.contaminacion,401,1024))
	{ messages += '* La contaminación en su cuarto es exageradamente grande, abandone ese lugar.\n'; }

	if(between(MediaData.temperatura,0,10))
	{ messages += '* El ambiente es demasiado frío, se aconseja subir la temperatura de su ambiente para evitar frío. \n'; }
	else if(between(MediaData.temperatura,10,26))
	{ messages += '* La temperatura del ambiente es óptima para una buena calidad de sueño. \n'; }
	else if(between(MediaData.temperatura,26,1024))
	{ messages += '* La temperatura es demasiado alta, se aconseja bajar la temperatura de su ambiente para evitar insomnio por calor. \n'; }

	if(between(MediaData.humedad,0,49))
	{ messages += '* El ambiente es demasiado seco para el sistema respiratorio, se recomiendo el uso de humificadores. \n'; }
	else if(between(MediaData.humedad,50,60))
	{ messages += '* La humedad en el ambiente es bastante óptima para una buena calidad de sueño. \n'; }
	else if(between(MediaData.humedad,60,1024))
	{ messages += '* La humedad es demasiado alta en su ambiente, poniendo en riesgo su salud del sistema respiratorio.\n'; }

	returnTip.message = messages;
	return returnTip;
}

function report(req,res){
	let fecha = req.params.date;

	information.find({fecha: fecha},(err,data)=>{
		if(err) res.status(500).jsonp({message: 'Error al filtrar datos.'});

		let MediaData = {ruido: 0, movimiento: 0, cantidad: 0};

		data.forEach((value,key) => {
			MediaData.ruido += value.luz;
			MediaData.movimiento += value.contaminacion;
			MediaData.cantidad = (key + 1);
		});

		MediaData.ruido /= MediaData.cantidad;
		MediaData.movimiento /= MediaData.cantidad;

		data = execReport(MediaData);

		res.status(200).jsonp({data});
	});
}

function between(x, min, max) {
  return x >= min && x <= max;
}

function execReport(MediaData) {
	let returnTip = {}, message = '';

	if(MediaData.ruido <= 200 && MediaData.movimiento <= 0.2)
		message = 'Su preocupación es muy baja, fue una gran noche de sueño.';
	else if(between(MediaData.ruido,201,500) && between(MediaData.movimiento,0.21,0.5))
		message= 'Debería considerar no estresarse mucho para una mejor calidad de sueño al dormir.';
	else if(between(MediaData.ruido,501,800) && between(MediaData.movimiento,0.51,0.8))
		message = 'Su calidad de sueño está siendo afectada seriamente por su día a día, se aconseja evitar la preocupación excesiva para que su salud no se vea afectada.';
	else if(between(MediaData.ruido,801,1024) && between(MediaData.movimiento,0.81,1))
		message = 'Su calidad de sueño se ve seriamente afectada, favor visitar a un médico para corregir serios niveles de estrés o preocupación.';

	returnTip.message = message;

	return returnTip;
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
	deleteInformation,
	tips,
	report
}
