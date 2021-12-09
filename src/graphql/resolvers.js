// import { cursos } from "../data/cursos"
import GestionAvance from "../models/GestionAvance.js";
import GestionInscripcion from "../models/GestionInscripcion.js";
import Proyecto from "../models/Proyecto.js";
import Usuario from "../models/Usuario.js";
import bcryp from "bcrypt";
import { generarJwt } from "../helpers/jwt.js";

export const resolvers = {
    Query: {
        Hola: (parent, args) => {
            return "Hola " + args.nombre
        },
        Proyectos(_, agrs, context) {
            console.log(context)
            if (context.user.auth) {
                return Proyecto.find();
            } else {
                return null
            }
        },
        ProyectoID(_, { id }, context) {
            if (context.user.auth) {
                return Proyecto.findById(id);
            } else {
                return null
            }
        },
        ProyectoLider(_, { docLider }, context) {
            if (context.user.auth) {
                return Proyecto.find({ docLider })
            } else {
                return null
            }

        },
        ProyectoByLideryEstado(_, { docLider, estadoProyecto }, context) {
            if (context.user.auth) {
                return Proyecto.find({ docLider, estadoProyecto })
            } else {
                return null
            }
        },

        Usuarios(_, agrs, context) {
            console.log(context)
            if (context.user.auth) {
                return Usuario.find();
            } else {
                return null
            }
        },
        UsuarioEstudiante(_, { rol }, context) {
            if (context.user.auth) {
                return Usuario.find({ rol })
            } else {
                return null
            }
        },
        UsuarioEstudianteById(_, { id }, context) {
            console.log(context)
            if (context.user.auth) {
                return Usuario.find({ id })
            } else {
                return null
            }

        },
        async UsuarioEstado(_, { estadoUsuario }, context) {
            if (context.user.auth) {
                return Usuario.find({ estadoUsuario })
            } else {
                return null
            }
        },
        GestionInscripciones(_, agrs, context) {
            console.log(context)
            if (context.user.auth) {
                return GestionInscripcion.find();
            } else {
                return null
            }
        },
        GestionInscripcionByEst(_, { idEstudiante }, context) {
            if (context.user.auth) {
                return GestionInscripcion.find({ idEstudiante })
            } else {
                return null
            }
        },
        GestionInscripcionByEstadoIns(_, { estadoInscripcion }, context) {
            if (context.user.auth) {
                return GestionInscripcion.find({ estadoInscripcion })
            } else {
                return null
            }
        },
        GestionAvances(_, agrs, context) {
            console.log(context)
            if (context.user.auth) {
                return GestionAvance.find();
            } else {
                return null
            }
        },
        GestionAvanceByidPro(_, { idProyecto }, context) {
            if (context.user.auth) {
                return GestionAvance.find({ idProyecto })
            } else {
                return null
            }
        },

        async Login(_, { correo, password }) {
            const usuario = await Usuario.findOne({
                correo
            })
            if (!usuario) {
                return "usuario o contraseña incorrecto"
            }
            const validarPassword = bcryp.compareSync(password, usuario.password);
            if (validarPassword) {
                const token = await generarJwt(usuario.id, usuario.nombreCompleto)
                return token;
            } else {
                return "usuario o contraseña incorrecto"
            }
        }
    },
    Mutation: {
        async AgregarProyecto(_, { proyecto }, context) {
            
            if (context.user.auth) {
                const lider = await Usuario.findOne({
                    documento: proyecto.docLider,
                })

                if (!lider || proyecto.faseProyecto == "Terminado") {
                    return null
                } else {
                    const nProyecto = new Proyecto(proyecto)
                    return await nProyecto.save();
                }
            } else {
                return null
            }

        },
        async AgregarUsuario(_, { usuario }, context) {

            if (context.user.auth) {
                const salt = bcryp.genSaltSync();
                const nUsuario = new Usuario({
                    nombreCompleto: usuario.nombreCompleto,
                    documento: usuario.documento,
                    rol: usuario.rol,
                    correo: usuario.correo,
                    estadoUsuario: usuario.estadoUsuario
                });
                nUsuario.password = bcryp.hashSync(usuario.password, salt)
                return await nUsuario.save();
            } else {
                return null
            }

        },
        async AgregarGestionInscripcion(_, { gestioninscripcion },context) {
            if (context.user.auth) {
                try {
                    const inscripcion = await Proyecto.findById(gestioninscripcion.idProyecto).exec();
                    const estuid = await Usuario.findById(gestioninscripcion.idEstudiante).exec();
                    const nInscripcion = new GestionInscripcion({
                        idProyecto: gestioninscripcion.idProyecto,
                        nombre: gestioninscripcion.nombre,
                        idEstudiante: gestioninscripcion.idEstudiante,
                        nombreEstudiante: gestioninscripcion.nombreEstudiante,
                        estadoInscripcion: gestioninscripcion.estadoInscripcion,
                        fechaEgreso: gestioninscripcion.fechaEgreso,
                        fechaFinal: gestioninscripcion.fechaFinal
                    });
                    if(inscripcion && estuid ){    
                    return await nInscripcion.save();
                    }else{
                        return null
                    }
                } catch (error) {
                    return null
                }
            } else {
                return null
            }       
            
        },
        async AgregarGestionAvance(_, { gestionavance }) {
            if (context.user.auth) {
                try {
                    const fase = await Proyecto.findById(gestionavance.idProyecto).exec();
                    const usuid = await Usuario.findById(gestionavance.idUsuario).exec();
                    if (fase && usuid) {
                        const nAvance = new GestionAvance(gestionavance)
                        return await nAvance.save()
                    }else{
                        return null;
                    }
                } catch (error) {
                    return null
                }
            } else {
                return null
            }    
           
        },
        async ActualizarUsuario(_, { usuario }) {
            if (context.user.auth) {
                return await Usuario.findByIdAndUpdate(
                    usuario.id,
                    {
                        documento: usuario.documento,
                        correo: usuario.correo,
                        password: usuario.password,
                        estadoUsuario: usuario.estadoUsuario
                    }, {
                    new: true
                }
                )
            } else {
                return null
            }
            
        },
        async ActualizarUsuarioEstado(_, { usuario }) {
            if (context.user.auth) {
                return await Usuario.findByIdAndUpdate(
                    usuario.id,
                    {
                        estadoUsuario: usuario.estadoUsuario
                    }, {
                    new: true
                }
                )
            } else {
                return null
            }
           
        },
        async ActualizarProyecto(_, { proyecto }) {
            if (context.user.auth) {
                return await Proyecto.findByIdAndUpdate(
                    proyecto.id,
                    {
                        nombre: proyecto.nombre,
                        objetivosEspecificos: proyecto.objetivosEspecificos,
                        objetivosGenerales: proyecto.objetivosGenerales,
                        presupuesto: proyecto.presupuesto
                    }, {
                    new: true
                }
                )
                
            } else {
                return null
            }
            
        },
        async ActualizarProyectoFase(_, { proyecto }) {
            if (context.user.auth) {
                if (proyecto.faseProyecto = "Terminado") {
                    proyecto.estadoProyecto = false
    
                } else {
                    proyecto.estadoProyecto = true
                }
                return await Proyecto.findByIdAndUpdate(
                    proyecto.id,
                    {
                        faseProyecto: proyecto.faseProyecto,
                        estadoProyecto: proyecto.estadoProyecto
                    }, {
                    new: true
                }
                )
            } else {
                return null
            }            
        },
        async ActualizarEstadoProyecto(_, { proyecto }) {
            if (context.user.auth) {
                return await Proyecto.findByIdAndUpdate(
                    proyecto.id,
                    {
                        estadoProyecto: proyecto.estadoProyecto
                    }, {
                    new: true
                }
                )
            } else {
                return null
            }
           
        },

        async ActualizarEstadoInscripcion(_, { gestioninscripcion }) {
            if (context.user.auth) {
                return await GestionInscripcion.findByIdAndUpdate(
                    gestioninscripcion.id,
                    {
                        estadoInscripcion: gestioninscripcion.estadoInscripcion
                    }, {
                    new: true
                }
                )
            } else {
                return null
            }
            
        }, 
        async ActualizarDescripcionAvance(_, { gestionAvances }) {
            if (context.user.auth) {
                return await GestionAvance.findByIdAndUpdate(
                    gestionAvances.id,
                    {
                        descripcionAvance: gestionAvances.descripcionAvance
                    }, {
                    new: true
                }
                )
            } else {
                return null
            }
            
        }
    }
}


