const express = require('express');
const router = express.Router();

const controladorDirectores = require('../controladores/controladorDirectores')


router.route('/')
    .get(controladorDirectores.obtenerDirectores)

module.exports = router;