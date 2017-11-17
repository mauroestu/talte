'use strict'

const express = require('express');
const InformationCtrl = require('../controllers/dream');
const UserCtrl = require('../controllers/user');
const api = express.Router();

//methods dream
api.get('/information',InformationCtrl.getAllInformation);
api.get('/information/:date',InformationCtrl.obtainInformation);
api.post('/save-information',InformationCtrl.saveInformation);
api.delete('/delete-information',InformationCtrl.deleteInformation);

//methods user
api.post('/save-user',UserCtrl.saveUser);
api.post('/login-user',UserCtrl.obtainUser);
api.get('/login-user',UserCtrl.getAllUser);

module.exports = api;
