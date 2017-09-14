'use strict'

const express = require('express');
const InformationCtrl = require('../controllers/dream');
const api = express.Router();


api.get('/information',InformationCtrl.getAllInformation);
api.get('/information/:date',InformationCtrl.obtainInformation);
api.post('/save-information',InformationCtrl.saveInformation);
api.delete('/delete-information',InformationCtrl.deleteInformation);

module.exports = api;