import mongoose from "mongoose";
const {Schema, model, isValidObjectId} = mongoose

const GestionAvanceSchema= Schema({  
    idProyecto: {type:String,required:true},
    nombre: {type:String,required:true},
    fechaAvance: {type:String,required:true},
    descripcionAvance : {type:String,required:true},
    observaciones:[{
        observacion: String
    }],
    idUsuario: {type:String,required:true}
})
export default model("GestionAvance",GestionAvanceSchema);