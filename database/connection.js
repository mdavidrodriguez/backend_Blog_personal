const mongoose = require("mongoose")


const conexion = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/mi_blog')
        // useNewUrlParse:true
        // useUnifiedTopology: true
        console.log('Conectado a mongo correctamente');
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la bd")
    }
}



module.exports = { conexion }