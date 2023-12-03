const validator = require("validator")
const Articulo = require("../models/Articulo")

const prueba = (req, res) => {
    return res.status(200).json({ mensaje: 'Soy una accion de prueba en mi controlador de articulos' })
}

const create = (req, res) => {
    // recoger los parametros por post a guardar
    const parametros = req.body;

    // validar datos
    try {
        const validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 0, max: 15 });
        const validar_contenido = !validator.isEmpty(parametros.contenido);

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información");
        }

    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: 'Faltan datos por enviar',
        })
    }

    // Crear el objeto a guardar
    const articulo = new Articulo(parametros)

    // Asignar valores a objeto basado en el modelo (manual, automatico)
    // articulo.titulo = parametros.titulo; // --> Forma manual

    // Guardar el articulo en la base de datos
    articulo.save().then((articuloGuardado) => {
        if (!articuloGuardado) {
            return res.status(400).json({
                status: "error",
                mensaje: 'No se ha guardado el articulo',
            })
        }
        // Devolver el resultado

        return res.status(200).json({
            status: 'success',
            articulo: articuloGuardado,
            mensaje: 'Arituculo guardado cone éxito'
        })
    })
        .catch(error => {
            return res.status(500).json({
                status: 'success',
                mensaje: 'Error en el servidor'
            })
        })
}


const getArticulos = (req, res) => {
    const consulta = Articulo.find({});

    if (req.params.ultimos) {
        consulta.limit(3);
    }
    consulta.sort({ fecha: -1 })
        .exec().then((articulos) => {
            if (!articulos) {
                return res.status(404).json({
                    status: 'error',
                    mensaje: 'No se han encontrado articulos!!'
                })
            }
            return res.status(200).send({
                status: "success",
                contador: articulos.length,
                parametro: req.params.ultimos,
                articulos
            }
            )
        })
}






module.exports = { prueba, create, getArticulos }