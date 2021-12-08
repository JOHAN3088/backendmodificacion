import express from "express";
import { graphqlHTTP } from "express-graphql";
import schx from "./graphql/schema.js";
import dbConnection from "./database/config.js";
import validarJwt from "./middleware/validar-jwt.js";
const app = express();


dbConnection()

app.use(validarJwt)

app.use("/graphql", graphqlHTTP((req)=>({
     graphiql : true,
     schema : schx,
     context :{
          user : req.user
     } 
})));

app.listen(4000, () => { 
    console.log("servidor  conectado al puerto 4000");})