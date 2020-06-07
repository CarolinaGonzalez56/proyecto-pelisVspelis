const express = require('express');
const router = express.Router();

const controladorActores = require('../controladores/controladorActores')


router.route('/')
    .get(controladorActores.obtenerActores)

module.exports = router;