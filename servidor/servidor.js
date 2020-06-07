//paquetes necesarios para el proyecto

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var rutaCompetencias = require('./rutas/rutaCompetencias')
var rutaGeneros = require('./rutas/rutaGeneros')
var rutaDirectores = require('./rutas/rutaDirectores')
var rutaActores = require('./rutas/rutaActores')
var app = express();

app.use(cors() );

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/competencias', rutaCompetencias)

app.use('/generos', rutaGeneros);

app.use('/directores', rutaDirectores);

app.use('/actores', rutaActores);
////////////////////////////////////////////


// app.get('/competencias', controlador.listarCompetencias);
// app.post('/competencias', controlador.crearCompetencias);
// app.get('/competencias/:id/peliculas', controlador.obtenerPelisAleatorias);
// app.get('/competencias/:id/resultados', controlador.obtenerPelisMasVotadas);
// app.post('/competencias/:idCompetencia/voto', controlador.guardarVoto);
// app.delete('/competencias/:id/votos', controlador.eliminarVoto);
// app.get('/competencias/:id', controlador.listarInformacionCompetencias);
// app.delete('/competencias/:id', controlador.eliminarCompetencias);
// app.put('/competencias/:id', controlador.modificarNombreCompetencias);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});