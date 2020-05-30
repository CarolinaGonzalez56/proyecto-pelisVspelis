//paquetes necesarios para el proyecto

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('./controladores/controlador');

var app = express();

app.use(cors() );

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/competencias', controlador.listarCompetencias);
app.post('/competencias', controlador.crearCompetencias);
app.get('/generos', controlador.obtenerGeneros);
app.get('/directores', controlador.obtenerDirectores);
app.get('/actores', controlador.obtenerActores);
app.get('/competencias/:id/peliculas', controlador.obtenerPelisAleatorias);
app.get('/competencias/:id/resultados', controlador.obtenerPelisMasVotadas);
app.post('/competencias/:idCompetencia/voto', controlador.guardarVoto);
app.delete('/competencias/:id/votos', controlador.eliminarVoto);
app.get('/competencias/:id', controlador.listarInformacionCompetencias);
app.delete('/competencias/:id', controlador.eliminarCompetencias);
app.put('/competencias/:id', controlador.modificarNombreCompetencias);








//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});