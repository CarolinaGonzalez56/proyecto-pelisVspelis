var con = require('../lib/conexionbd');

function listarCompetencias(req, res) {

    var sql = `select * from competencias`

    
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        console.log(error)
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en listarCompetencias");
        }
        //si no hubo error, se crea el objeto respuesta con las competencias
        var respuesta = resultado
        //se envía la respuesta
        res.send(JSON.stringify(respuesta));
        console.log(respuesta)
    })
}

function listarInformacionCompetencias(req, res) {
    var id = req.params.id
    var sql = `select * from competencias where id = ${id};`
    console.log(sql)
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en listarInformacionCompetencias");
        }
        //si no hubo error, se crea el objeto respuesta con las competencias
        var respuesta = resultado
        //se envía la respuesta
        res.send(JSON.stringify(respuesta));
    })
}
/*
LA RESPUESTA AL FRONTEND DEBERIA TENER
respuesta = {
    competencia: cual es la mejor ?
    peliculas: [
    {id: 234},
    {id: 658},
    ]
}
*/

function obtenerPelisAleatorias(req, res) {
    var id = `SELECT * FROM pelicula ORDER BY RAND() limit 2;`
    
    console.log(id);
    con.query(id, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en listarInformacionCompetencias");
        }
        //si no hubo error, se crea el objeto respuesta con las peliculas
        var respuesta = {
            'peliculas': resultado,
        }
        console.log(respuesta)
        //se envía la respuesta
        res.send(JSON.stringify(respuesta));
    })

}

module.exports = {
    listarCompetencias: listarCompetencias,
    listarInformacionCompetencias: listarInformacionCompetencias,
    obtenerPelisAleatorias: obtenerPelisAleatorias,
}