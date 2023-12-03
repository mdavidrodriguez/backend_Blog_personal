const validator = require("validator")
const validarArticulo = (parametros) => {
    const validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, { min: 0, max: 15 });
    const validar_contenido = !validator.isEmpty(parametros.contenido);

    if (!validar_titulo || !validar_contenido) {
        throw new Error("No se ha validado la información");
    }
}

module.exports = { validarArticulo }