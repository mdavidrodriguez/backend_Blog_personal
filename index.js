const { conexion } = require("./database/connection")
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

// Crear rutas


// Rutas
app.get('/probando', (req, res) => {
    console.log("se ha ejecutado el endpoint probando");
    return res.status(200).send({
        curso: 'Master en react',
        autor: "Mateo R",
        url: "cursomateo.com"
    })
});


const PORT = 3000

// Crear servidor y escuchar peticiones http
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT);
})





