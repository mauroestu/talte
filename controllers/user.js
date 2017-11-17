'use strict'

const user = require('../models/user');

function getAllUser(req,res){
  user.find({},(err,data) =>{
    if(err) return res.status(500).send({message: 'Error al realizar la peticion.'});
    if(!data) return res.status(404).send({message: 'No hay informacion guardada.'});

    res.jsonp(200,{data});
  });
}

function obtainUser(req,res){
  let correo = req.body.correo;
  let password = req.body.pass;

  user.find({correo: correo, pass: password},(err,user)=>{
    if(err){
      return res.status(500).jsonp({
        message: 'Error al realizar las peticiones a la base de datos.',
        success: false
      });
    }

    if(user.length == 0){
      return res.status(404).jsonp({
        message: 'Credenciales incorrectas.',
        success: false
      });
    }

      res.status(200).jsonp({
        message: 'bienvenido.',
        success: true
      });
  });
}

function saveUser(req,res){
  let data = new user();

  data.correo = req.body.correo;
  data.pass = req.body.pass;
  data.celular = req.body.celular;
  data.codigo = 2;

  data.save((err,fact) => {
    if(err) res.status(500).send({message: 'Error al guardar en la BD.'});
    else console.log('Dato guardado.');
  });
  res.status(200).jsonp({message: 'Dato guardado.'});

  /*user.find({},(err,user)=>{
    if(err) res.status(500).jsonp({
      message: 'Error en las peticiones.',
      success: false
    });

    if(data) data.codigo = user.count + 1;
  });*/

  /*user.find({correo: data.correo},(err,data)=>{
    if(err){
      res.status(500).jsonp({
        message: 'Error al realizar las peticiones a la base de datos.',
        success: false
      });
    }

    if(data){
      data.save((err,fact) => {
        if(err){
          res.status(500).jsonp({
            message: 'Error al guardar el usuario.',
            success: false
          });
        }
        else{
          console.log('Usuario guardado.');
          res.status(200).jsonp({
            message: 'Usuario guardado exitosamente.',
            success: true
          });
        }
      });
    }
    else {
      res.status(500).jsonp({
        message: "Usuario ya registrado",
        success: false
      });
    }
  });*/

}

module.exports = {
  saveUser,
  obtainUser,
  getAllUser
};
