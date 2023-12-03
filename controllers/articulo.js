
const Articulo = require("../models/Articulo")
const { validarArticulo } = require("../helpers/validar")

const prueba = (req, res) => {
    return res.status(200).json({ mensaje: 'Soy una accion de prueba en mi controlador de articulos' })
}

const create = async (req, res) => {
    // recoger los parametros por post a guardar
    const parametros = req.body;

    // validar datos
    try {
        validarArticulo(parametros);
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
            mensaje: 'Arituculo guardado con éxito'
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

const getOneArticulo = (req, res) => {

    // Recoger un id por la url
    const id = req.params.id

    // Buscar el articulo
    Articulo.findById(id).then((articulo) => {
        // Si no existe devolver el error
        if (!articulo) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se ha encotrado el articulo!!'
            })
        }
        // Devolver el resultado
        return res.status(200).json({
            status: 'success',
            articulo
        })

    })
        .catch(error => {
            return res.status(500).json({
                status: 'error',
                mensaje: 'Error en el servidor'
            })
        })
}


const deleteArticulo = async (req, res) => {
    const articulo_id = req.params.id
    const articulo = await Articulo.findOneAndDelete({ _id: articulo_id })
    try {
        if (!articulo) {
            return res.status(404).json({
                status: 'error',
                mensaje: "Error al borrar el articulo",
            })
        }
        return res.status(200).json({
            status: 'success',
            mensaje: "Metodo de borrar",
            articulo
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            mensaje: 'Error en el servidor'
        })
    }

}


const updateArticulo = (req, res) => {
    // Recoger el id del articulo a editar
    const id_articulo = req.params.id

    // Recoger datos del body
    const parametros = req.body;

    // Validar datos
    try {
        validarArticulo(parametros);
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: 'Faltan datos por enviar',
        })
    }



    // Buscar y actualizar articulo
    Articulo.findOneAndUpdate({ _id: id_articulo }, parametros, { new: true }).then((articuloActualizado) => {

        if (!articuloActualizado) {
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            })
        }
        // Devolver respuesta
        return res.status(200).json({
            status: 'success',
            articulo: articuloActualizado
        })

    })


}




module.exports = { prueba, create, getArticulos, getOneArticulo, deleteArticulo, updateArticulo }