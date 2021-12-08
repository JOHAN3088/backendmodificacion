import mongoose from "mongoose";
const {Schema, model, isValidObjectId} = mongoose

const GestionInscripcionSchema= Schema({      
    idProyecto: {type:String,required:true},
    nombre: {type:String,required:true},
    idEstudiante: {type:String,required:true},
    nombreEstudiante:{type:String,required:true},
    estadoInscripcion:{type:String,required:true},
    fechaEgreso:{type:String,required:true},
    fechaFinal:{type:String,required:true}
})
export default model("GestionInscripcion",GestionInscripcionSchema);