import { getBD } from "../../db/db.js"
import { ObjectId } from "mongodb";
import jwt_decode from 'jwt-decode'

const queryAllUsers = async (callback) =>{

    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Usuario')
    .find({}).limit(50)
    .toArray(callback)
}

const crearUsuario = async (datosUsuario, callback) =>{

            const baseDeDatos = getBD();
            await baseDeDatos
            .collection('Usuario').insertOne(datosUsuario, callback)
        
}

const consultarOCrearUsuario = async (req, callback) => {
    console.log('Estoy llegando a crear usuario');
    // 6.1. obtener los datos del usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
   console.log('token',token)
   //const token = console.log('token',req.headers.authorization)
  console.log('token',jwt_decode(token))
  };

const editarUsuario = async (id, edicion, callback)=>{
  const filtroUsuario ={ _id: new ObjectId(id)}
  const operacion = {
      $set: edicion,
  }
  const baseDeDatos = getBD();
  await baseDeDatos
  .collection('Usuario').findOneAndUpdate(filtroUsuario,operacion,{upsert:true},callback)  
}

const eliminarUsuario = async (id, callback)=>{
    const filtroUsuario ={ _id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Usuario').deleteOne(filtroUsuario,callback) 
}

export {queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario,consultarOCrearUsuario}