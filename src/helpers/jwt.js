import jwt from "jsonwebtoken";

const secret = "mi_llave"
export const generarJwt =  (uid, nombre) => {
    return new Promise((resolve,reject) =>{
        const payloat = {
            uid,
            nombre
        }
            jwt.sign(payloat, secret, {expiresIn:"2h"},
            (err, token)=>{
                if(err){
                    console.log(err)
                    reject("no se pudo generar el token")
                }
                resolve(token)
            }
         )
    })
}