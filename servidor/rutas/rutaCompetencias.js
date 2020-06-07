const express = require('express');
const router = express.Router();

const controladorCompetencias = require('../controladores/controladorCompetencias')

router.route('/')
    .get(controladorCompetencias.listarCompetencias)
    .post(
        controladorCompetencias.revisarCantidadPelisPorCompetencias,
        controladorCompetencias.crearCompetencias
        )

router.route('/:id/peliculas')
    .get(controladorCompetencias.obtenerPelisAleatorias)

router.route('/:id/resultados')
    .get(controladorCompetencias.obtenerPelisMasVotadas)

router.route('/:id/voto')
    .post(controladorCompetencias.guardarVoto)

router.route('/:id/votos')
    .delete(controladorCompetencias.eliminarVotos)

router.route('/:id')
    .get(controladorCompetencias.listarInformacionCompetencias)
    .delete(controladorCompetencias.eliminarCompetencias)
    .put(controladorCompetencias.modificarNombreCompetencias)

// app.get('/competencias', controladorCompetencias.listarCompetencias);
// app.post('/competencias', controladorCompetencias.crearCompetencias);
// app.get('/competencias/:id/peliculas', controladorCompetencias.obtenerPelisAleatorias);
// app.get('/competencias/:id/resultados', controladorCompetencias.obtenerPelisMasVotadas);
// app.post('/competencias/:idCompetencia/voto', controladorCompetencias.guardarVoto);
// app.delete('/competencias/:id/votos', controladorCompetencias.eliminarVoto);
// app.get('/competencias/:id', controladorCompetencias.listarInformacionCompetencias);
// app.delete('/competencias/:id', controladorCompetencias.eliminarCompetencias);
// app.put('/competencias/:id', controladorCompetencias.modificarNombreCompetencias);

module.exports = router;