import mongoose from "mongoose"

 export const dbConnection = async () =>{
    try{
        await mongoose.connect('mongodb+srv://myriam:Prom2013ciencias$@cluster0.rtt0q.mongodb.net/graphql');
        console.log("Base de datos conectada")
    }catch(error){
        console.log(error)
    }
}
