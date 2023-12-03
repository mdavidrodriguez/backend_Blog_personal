const express = require("express")
const router = express.Router();

const ArticuloController = require("../controllers/articulo");

// Rutas de prueba

router.get("/:ultimos?", ArticuloController.getArticulos)
router.get("/ruta-de-prueba", ArticuloController.prueba)
router.post("/", ArticuloController.create)



module.exports = router