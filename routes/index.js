'use strict'

const express = require('express');
const InformationCtrl = require('../controllers/dream');
const UserCtrl = require('../controllers/user');
const api = express.Router();

//methods dream
api.get('/information',InformationCtrl.getAllInformation);
api.get('/tips/:date',InformationCtrl.tips);
api.get('/reporte/:date',InformationCtrl.report);
api.post('/save-information',InformationCtrl.saveInformation);
api.delete('/delete-information',InformationCtrl.deleteInformation);

//methods user
api.post('/save-user',UserCtrl.saveUser);
api.post('/login-user',UserCtrl.obtainUser);
api.get('/users',UserCtrl.getAllUser);

module.exports = api;
