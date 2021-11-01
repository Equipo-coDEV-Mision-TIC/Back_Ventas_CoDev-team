import { getBD } from "../../db/db.js"

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

export {queryAllProducts, crearProducto}