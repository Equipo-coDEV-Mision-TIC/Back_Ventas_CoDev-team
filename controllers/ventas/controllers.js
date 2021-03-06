import { getBD } from "../../db/db.js"
import { ObjectId } from "mongodb";

const queryAllSale = async (callback) =>{

    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Venta')
    .find({}).limit(50)
    .toArray(callback)
}

const crearVenta = async (datosVenta, callback) =>{

        if(
            Object.keys(datosVenta).includes('IDventa') &&
            Object.keys(datosVenta).includes('Vendedor') &&
            Object.keys(datosVenta).includes('Producto')&&
            Object.keys(datosVenta).includes('Valor')  
        ){
            const baseDeDatos = getBD();
            await baseDeDatos
            .collection('Venta').insertOne(datosVenta, callback)

        }else{
            res.sendStatus(500)
        }
        
}

const editarVenta = async (id, edicion, callback)=>{
  const filtroVenta ={ _id: new ObjectId(id)}
  const operacion = {
      $set: edicion,
  }
  const baseDeDatos = getBD();
  await baseDeDatos
  .collection('Venta').findOneAndUpdate(filtroVenta,operacion,{upsert:true},callback)  
}

const eliminarVenta = async (id, callback)=>{
    const filtroVenta ={ _id: new ObjectId(id)}
    const baseDeDatos = getBD();
    await baseDeDatos
    .collection('Venta').deleteOne(filtroVenta,callback) 
}

export {queryAllSale, crearVenta, editarVenta, eliminarVenta}