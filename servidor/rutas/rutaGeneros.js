const express = require('express');
const router = express.Router();

const controladorGeneros = require('../controladores/controladorGeneros')


router.route('/')
    .get(controladorGeneros.obtenerGeneros)

module.exports = router;