import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import {dbConnection} from "./database/config"
import { validarJwt } from "./middleware/validar-jwt";
const app = express();


dbConnection()

app.use(validarJwt)

app.use("/graphql", graphqlHTTP((req)=>({
     graphiql : true,
     schema : schema,
     context :{
          user : req.user
     } 
})));

app.listen(4000, () => { 
    console.log("servidor  conectado al puerto 4000");})