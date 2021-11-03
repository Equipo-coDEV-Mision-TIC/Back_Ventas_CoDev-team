import { getBD } from "../../db/db.js"
import { ObjectId } from "mongodb";

const queryAllUsers = async (callback) =>{

    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Articulo')
    .find({}).limit(50)
    .toArray(callback)
}

const crearUsuario = async (datosUsuario, callback) =>{

            const baseDeDatos = getBD();
            await baseDeDatos
            .collection('Articulo').insertOne(datosUsuario, callback)
        
}

const editarUsuario = async (id, edicion, callback)=>{
  const filtroUsuario ={ _id: new ObjectId(id)}
  const operacion = {
      $set: edicion,
  }
  const baseDeDatos = getBD();
  await baseDeDatos
  .collection('Articulo').findOneAndUpdate(filtroUsuario,operacion,{upsert:true},callback)  
}

const eliminarUsuario = async (id, callback)=>{
    const filtroUsuario ={ _id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Articulo').deleteOne(filtroUsuario,callback) 
}

export {queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario}