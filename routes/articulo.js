const express = require("express")
const router = express.Router();

const ArticuloController = require("../controllers/articulo");

// Rutas de prueba

router.get("/articulos/:ultimos?", ArticuloController.getArticulos)
router.get("/articulo/:id", ArticuloController.getOneArticulo)
router.get("/ruta-de-prueba", ArticuloController.prueba)
router.post("/articulos", ArticuloController.create)
router.delete("/articulo/:id", ArticuloController.deleteArticulo)
router.put("/articulo/:id", ArticuloController.updateArticulo)



module.exports = router