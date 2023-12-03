const { conexion } = require("./database/connection")
const routesArticulos = require("./routes/articulo")
const express = require("express")
const cors = require("cors")

console.log('Arrancando la aplicación');

// Conectar a la base de datos
conexion()

// Crear servidor de Node
const app = express()

// Configurar cors
app.use(cors())

// Convertir body a objeto js
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Crear rutas
// Rutas prueba hardcodeadas
app.use('/api', routesArticulos);


const PORT = 3000

// Crear servidor y escuchar peticiones http
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT);
})





