import { getBD } from "../../db/db.js"
import { ObjectId } from "mongodb";

const queryAllProducts = async (callback) =>{

    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Articulo')
    .find({}).limit(50)
    .toArray(callback)
}

const crearProducto = async (datosProducto, callback) =>{

        if(
            Object.keys(datosProducto).includes('IDproducto') &&
            Object.keys(datosProducto).includes('Categoria') &&
            Object.keys(datosProducto).includes('Descripcion')&&
            Object.keys(datosProducto).includes('Precio')  
        ){
            const baseDeDatos = getBD();
            await baseDeDatos
            .collection('Articulo').insertOne(datosProducto, callback)

        }else{
            res.sendStatus(500)
        }
        
}

const editarProducto = async (id, edicion, callback)=>{
  const filtroProducto ={ _id: new ObjectId(id)}
  const operacion = {
      $set: edicion,
  }
  const baseDeDatos = getBD();
  await baseDeDatos
  .collection('Articulo').findOneAndUpdate(filtroProducto,operacion,{upsert:true},callback)  
}

const eliminarProducto = async (id, callback)=>{
    const filtroProducto ={ _id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Articulo').deleteOne(filtroProducto,callback) 
}

export {queryAllProducts, crearProducto, editarProducto, eliminarProducto}