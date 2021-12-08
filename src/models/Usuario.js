import mongoose from "mongoose";
const {Schema, model, isValidObjectId} = mongoose

const UsuarioSchema= Schema({
    
    nombreCompleto: {type:String,required:true},
    documento: {type:Number,required:true},
    rol: {type:String,required:true},
    correo : {type:String,required:true},
    password : {type:String,required:true},
    estadoUsuario : {type:String,required:true}

})
export default model("Usuario",UsuarioSchema);