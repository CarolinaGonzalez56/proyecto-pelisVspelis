var con = require('../lib/conexionbd');

function listarCompetencias(req, res) {

    var sql = `select * from competencias`

    
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        //console.log(error)
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en listarCompetencias");
        }
        //si no hubo error, se crea el objeto respuesta con las competencias
        var respuesta = resultado
        //se envía la respuesta
        res.send(JSON.stringify(respuesta));
        //console.log(respuesta)
    })
}

function listarInformacionCompetencias(req, res) {
    var id = req.params.id
    var sql = `select c.id,c.nombre, c.genero_id , c.director_id , c.actor_id, genero.nombre as genero_nombre, actor.nombre as actor_nombre, director.nombre as director_nombre 
    from competencias as c
    left join genero 
    on genero.id=c.genero_id
    left join actor 
    on actor.id=c.actor_id
    left join director 
    on director.id=c.director_id
    where c.id=${id}`
    //console.log(sql)
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en listarInformacionCompetencias");
        }
        console.log(resultado)
        
        //se envía la respuesta
        res.send(JSON.stringify(resultado[0]));
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
    let id = req.params.id
    const sqlCompentencia = `select * from competencias where id = ${id}`;

    con.query(sqlCompentencia, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta sqlcompetencias");
        }
        //si no hubo error, se crea el objeto respuesta con las peliculas
        let competencia = resultado;
        //console.log(competencia)
        let genero = competencia[0].genero_id;
        let actor = competencia[0].actor_id;
        let director = competencia[0].director_id;
        // console.log(genero)
        // console.log(actor)
        // console.log(director)

        if(genero){
            sql = `SELECT *, p.id as peliculas_id_key  FROM pelicula as p 
            JOIN genero as g ON p.genero_id = g.id 
            JOIN competencias as c ON g.id = c.genero_id
            WHERE c.genero_id=${genero}
            ORDER BY RAND() limit 2;`
        }
    
        if(actor){
            sql = `SELECT * , p.id as peliculas_id_key  FROM pelicula as p 
            JOIN actor_pelicula as ap ON p.id = ap.pelicula_id
            JOIN actor as a ON ap.actor_id = a.id
            WHERE a.id= ${actor}
            ORDER BY RAND() limit 2;`
        }
    
        if(director){
            sql = `SELECT * , p.id as peliculas_id_key  FROM pelicula as p 
            JOIN director_pelicula as dp ON p.id = dp.pelicula_id
            JOIN director as d ON dp.director_id = d.id
            WHERE d.id= ${director}
            ORDER BY RAND() limit 2;`
        }

        console.log ('la consulta sql es:')
        console.log(sql)
        con.query(sql, function (error, resultado) {
            //si hubo un error, se informa y se envía un mensaje de error
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta en listarInformacionCompetencias");
            }
            //si no hubo error, se crea el objeto respuesta con las peliculas

            const newResultado = []
            resultado.forEach(pelicula =>{
                pelicula.id = pelicula.peliculas_id_key
                newResultado.push(pelicula)
            })
            var respuesta = {
                'peliculas': newResultado,
            }
            //console.log(respuesta)
            //se envía la respuesta
            res.send(JSON.stringify(respuesta));
        })
    })
}

function guardarVoto(req, res){
    var peliVotada = req.body.idPelicula;
    var competenciaVotada = req.params.idCompetencia;
    console.log(peliVotada)
    console.log(competenciaVotada)
    
    // 2) hacer la query para ingredar los votos 
    if(peliVotada && competenciaVotada){
        var sql = `insert into votos (peliculas_id, competencias_id) values (${peliVotada}, ${competenciaVotada});`

    }else{
        return res.status(404).send("La competencia o la pelicula no existe");
    }
    console.log(sql)
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en guardarVoto");
        }
        //si no hubo error, se crea el objeto respuesta con los votos obtenidos 
        var respuesta = resultado;
        console.log(respuesta)
        //se envía la respuesta
        res.status(201).send(JSON.stringify(respuesta));
    })
    
}

function obtenerPelisMasVotadas(req,res){
    var idCompetencia = req.params.id
    var sql = `SELECT v.peliculas_id as pelicula_id, count(v.peliculas_id)  as votos , p.poster, p.titulo
    from votos as v 
    join pelicula as p on v.peliculas_id = p.id 
    where competencias_id = ${idCompetencia} 
    group by peliculas_id 
    ORDER BY votos DESC
    limit 3;`

    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en guardarVoto");
        }

        var resultados = resultado;

        // var respuesta = {
        //     "pelicula_id": resultado.pelicula_id,
        //     "poster": resultado.poster,
        //     "titulo": resultado.titulo,
        //     "votos": resultado.votos
        // }
        console.log(resultados)
        //se envía la respuesta
        res
        .status(200)
        .send(JSON.stringify({resultados: resultados}));
    })
}

function obtenerGeneros(req,res){
    var sql = `SELECT * FROM genero;`

    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en guardarVoto");
        }
        
        console.log(resultado)
        //se envía la respuesta
        res
        .status(200)
        .send(JSON.stringify(resultado));
    })
}

function obtenerDirectores(req,res){
    var sql = `SELECT * FROM director;`

    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en guardarVoto");
        }
        
        console.log(resultado)
        //se envía la respuesta
        res
        .status(200)
        .send(JSON.stringify(resultado));
    })
}

function obtenerActores(req,res){
    var sql = `SELECT * FROM actor;`

    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en guardarVoto");
        }
        
        console.log(resultado)
        //se envía la respuesta
        res
        .status(200)
        .send(JSON.stringify(resultado));
    })
}

function crearCompetencias(req,res){
    const{ nombre, genero, director, actor } = req.body
    console.log(req.body)
    
    //var sql = `insert into competencias (nombre) values ('${nombre}');`
    var sql = `insert into competencias (nombre , ${genero!=0?'genero_id':''} ${director!=0?'director_id':''} ${actor!=0?'actor_id':''})
     values ('${nombre}', ${genero!=0?genero:''} ${director!=0?director:''} ${actor!=0?actor:''});`
    console.log(sql)

    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la  hola consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta en guardarVoto");
        }

        console.log(resultado)
        //se envía la respuesta
        res
        .status(200)
        .send(JSON.stringify({resultados: resultado}));
    })
}

function eliminarCompetencias(req, res){
    var id = req.params.id
    console.log(id)
    var sql= `DELETE v FROM votos v
    JOIN competencias c on c.id=v.competencias_id
    WHERE c.id=${id};`
    
    console.log(sql)
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta eliminarCompetencias sql", error.message);
            return res.status(404).send("Hubo un error en la consulta eliminarCompetencias");
        }
        
        var sql2=`DELETE FROM competencias WHERE id=${id};`
        con.query(sql2, function (error, resultado) {
            //si hubo un error, se informa y se envía un mensaje de error
            if (error) {
                console.log("Hubo un error en la consulta sql2", error.message);
                return res.status(404).send("Hubo un error en la consulta en eliminarCompetencias");
            }
            //si no hubo error, se crea el objeto respuesta con las competencias
            var respuesta = resultado
            //se envía la respuesta
            res.send(JSON.stringify(respuesta));
        })
    })
}

function eliminarVoto(req, res){
    var id = req.params.id
    console.log(id)
    var sql = `DELETE FROM votos WHERE competencias_id=${id};`
    console.log(sql)
    console.log(sql)
    con.query(sql, function (error, resultado) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta eliminarVoto", error.message);
            return res.status(404).send("Hubo un error en la consulta en eliminarVoto");
        }
        
        //si no hubo error, se crea el objeto respuesta con las competencias
        var respuesta = resultado
        console.log(respuesta)
        //se envía la respuesta
        res.send(JSON.stringify(respuesta));
    })

}

function modificarNombreCompetencias(req,res){
var id = req.params.id;
var sql = 
}


module.exports = {
    listarCompetencias: listarCompetencias,
    listarInformacionCompetencias: listarInformacionCompetencias,
    obtenerPelisAleatorias: obtenerPelisAleatorias,
    guardarVoto: guardarVoto,
    obtenerPelisMasVotadas: obtenerPelisMasVotadas,
    crearCompetencias: crearCompetencias,
    obtenerGeneros: obtenerGeneros,
    obtenerDirectores: obtenerDirectores,
    obtenerActores: obtenerActores,
    eliminarCompetencias: eliminarCompetencias,
    eliminarVoto: eliminarVoto,
    modificarNombreCompetencias: modificarNombreCompetencias,
}