import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers.js";
// ProyectoYavances(nombre : String!) : [Proyecto, GestionAvance]
const typeDefs = ` 
    type Query {
        Hola(nombre : String!) : String
        Proyectos : [Proyecto]
        ProyectoLider(docLider: String!):[Proyecto]
        ProyectoByLideryEstado( docLider : String!, estadoProyecto : Boolean ) : [Proyecto] 
        ProyectoID(id:String!): Proyecto

        Usuarios : [Usuario]
        UsuarioEstudiante(rol : String!) : [Usuario]
        UsuarioEstudianteById(id : String!) : [Usuario]
        UsuarioEstado(estadoUsuario:String!) : [Usuario]

        GestionInscripciones : [GestionInscripcion]
        GestionInscripcionByEst(idEstudiante : String!) : [GestionInscripcion]
        GestionInscripcionByEstadoIns(estadoInscripcion : String!) : [GestionInscripcion]
        GestionAvances : [GestionAvance]
        GestionAvanceByidPro(idProyecto : String!) : [GestionAvance] 
        Login( correo : String!, password : String!) : String   
    }
    
    type Mutation{
        AgregarProyecto( proyecto : ProyectoInput ): Proyecto
        AgregarUsuario( usuario : UsuarioInput ): Usuario 
        AgregarGestionInscripcion( gestioninscripcion : GestionInscripcionInput  ): GestionInscripcion  
        AgregarGestionAvance( gestionavance : GestionAvanceInput  ): GestionAvance
       
        ActualizarUsuario( usuario : ActualizarUsuarioInput ): Usuario 
        ActualizarUsuarioEstado( usuario : ActualizarEstadoUsuarioInput ): Usuario 
        ActualizarProyecto( proyecto : ProyectoInput ): Proyecto
        ActualizarProyectoFase( proyecto : ProyectoInputfase ): Proyecto
        ActualizarEstadoProyecto(proyecto: ActualizarEstadoProyectoInput):Proyecto  
        ActualizarEstadoInscripcion(gestioninscripcion: ActualizarEstadoInscripcionInput):GestionInscripcion
        ActualizarDescripcionAvance(gestionAvances: ActualizarDescripcionAvanceInput):GestionAvance

    }

     type Proyecto {
         id: ID,
         nombre: String,
         objetivosGenerales: String,
         objetivosEspecificos: [Objetivo],
         presupuesto: Int,
         fechaInicio: String,
         fechaFinal: String,
         docLider: Int,
         nombreLider: String,
         estadoProyecto: Boolean,
         faseProyecto: String
     }
     type Objetivo {
         objetivo: String
     }

     input ProyectoInput {
         id: ID! 
        nombre: String,
        objetivosGenerales: String!,
        objetivosEspecificos: [ObjetivoInput]!,
        presupuesto: Int!,
        fechaInicio: String,
        fechaFinal: String,
        docLider: Int ,
        nombreLider: String,
        estadoProyecto: Boolean,
        faseProyecto: String
    }
    input ProyectoInputfase {
       id: ID!
       faseProyecto: String!
   }

   input ActualizarEstadoProyectoInput{
    id:ID!,
    estadoProyecto:Boolean!
}


    input ObjetivoInput {
        objetivo: String
    }

    type Usuario {
        id: ID,
        nombreCompleto: String,
        documento: Int,
        rol: String,
        correo: String,
        password: String,
        estadoUsuario: String
    }

    input UsuarioInput {
        id : ID!
        nombreCompleto: String!,
        documento: Int!,
        rol: String!,
        correo: String!,
        password: String!,
        estadoUsuario: String!        
    }
    input ActualizarUsuarioInput {
        id : ID!
        nombreCompleto: String!,
        documento: Int!,
        password: String!,
        estadoUsuario: String!        
    }
    input ActualizarEstadoUsuarioInput {
        id : ID!
        estadoUsuario: String!        
    }
    
    type GestionInscripcion {
        id: ID,
        idProyecto: ID,
        nombre: String,
        idEstudiante: ID,
        nombreEstudiante: String,
        estadoInscripcion: String,
        fechaEgreso: String,
        fechaFinal: String
    }

    input GestionInscripcionInput {
        id: ID!
        idProyecto: ID,
        nombre: String,
        idEstudiante: ID,
        nombreEstudiante: String,
        estadoInscripcion: String,
        fechaEgreso: String,
        fechaFinal: String    
    }
    input ActualizarEstadoInscripcionInput{
        id:ID!,
        estadoInscripcion:String!
    }
    type GestionAvance {
        id: ID,
        idProyecto: String!,
        nombre: String,
        fechaAvance: String,
        descripcionAvance : String,
        observaciones: [Observacion],
        idUsuario: String!
    }
    type Observacion{
        observacion: String
    }

    input GestionAvanceInput {
        id : ID!
        idProyecto: String!,
        nombre: String!,
        fechaAvance: String!,
        descripcionAvance : String!,
        observaciones: [ObservacionInput]!, 
        idUsuario: String!
    }
    input ObservacionInput{
        observacion: String
    }

    input ActualizarDescripcionAvanceInput{
        id:ID!,
        descripcionAvance:String!
    }

`; 


const schx = makeExecutableSchema({
    typeDefs : typeDefs,
    resolvers : resolvers
})

export default schx;