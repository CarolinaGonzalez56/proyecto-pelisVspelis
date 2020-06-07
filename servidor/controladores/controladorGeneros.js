var con = require('../lib/conexionbd');

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

module.exports = {
    obtenerGeneros: obtenerGeneros,
}