const express = require("express")
const multer = require("multer")
const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './imagenes/articulos/');
    },

    filename: (req, file, cb) => {
        cb(null, "articulo" + Date.now() + file.originalname);
    }
})

const subidas = multer({ storage: almacenamiento });
const ArticuloController = require("../controllers/articulo");


// Rutas de prueba
router.get("/articulos/:ultimos?", ArticuloController.getArticulos)
router.get("/articulo/:id", ArticuloController.getOneArticulo)
router.get("/ruta-de-prueba", ArticuloController.prueba)
router.post("/articulos", ArticuloController.create)
router.delete("/articulo/:id", ArticuloController.deleteArticulo)
router.put("/articulo/:id", ArticuloController.updateArticulo)
router.post("/subirimagen/:id", [subidas.single("file")], ArticuloController.subir)
router.get("/imagen/:fichero", ArticuloController.getImagen)
router.get("/buscar/:busqueda", ArticuloController.searchArticulo)



module.exports = router