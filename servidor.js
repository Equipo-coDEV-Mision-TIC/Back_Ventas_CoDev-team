// const express = require('express') forma tradicional de importar express pero actualmente la tendencia es:

import Express from "express"
import Cors from 'cors'

import dotenv from 'dotenv'
import { conectarBD, getBD } from "./db/db.js"


dotenv.config({path:'./.env'})




const app = Express()
app.use(Express.json())
app.use(Cors())


app.get('/Productos',(req,res)=>{
    console.log('Alguien hizo get en la ruta /Productos')
    const baseDeDatos = getBD();
    baseDeDatos
    .collection('Articulo')
    .find({}).limit(50)
    .toArray((err,result)=>{
        if(err){
            res.status(500).send('Error consultando los Articulos')
        }
        else{
            res.json(result);
        }    
    })
})

// comunicacion completa desde el front hasta el back para crear productos
app.post('/Productos/nuevo',(req,res)=>{
    const datosProducto = req.body;
    //console.log('llaves: ', object.keys(datosProducto))
    try{
        if(
            Object.keys(datosProducto).includes('IDproducto') &&
            Object.keys(datosProducto).includes('Categoria') &&
            Object.keys(datosProducto).includes('Descripcion')&&
            Object.keys(datosProducto).includes('Precio')  
        ){
            const baseDeDatos = getBD();
            baseDeDatos.collection('Articulo').insertOne(datosProducto,(err,result)=>{
                if(err){
                    console.error(err)
                    res.sendStatus(500);
                }else{
                    console.log(result)
                    res.sendStatus(200)
                }  
            })

        }else{
            res.sendStatus(500)
        }
        }catch{
            res.sendStatus(500);
        }
        
    })

app.patch('/Productos/editar',(req,res)=>{
  const edicion = req.body
  const filtroArticulo ={ _id: new ObjectId(edicion.id)}
  delete edicion.id
  const operacion = {
      $set: edicion,
  }
  const baseDeDatos = getBD();
  baseDeDatos.collection('Articulo').findOneAndUpdate(filtroArticulo,operacion,{upsert:true},(err,result)=>{
    if(err){
        console.error('Error actualizando el Articulo: ',err)
        res.sendStatus(500)
    }else{
        console.log('Articulo actualizado con exito')
        res.sendStatus(200)
    }
    }
  )  
})

app.delete('/Productos/Eliminar',(req,res)=>{
    const filtroArticulo ={ _id: new ObjectId(req.body.id)}
    const baseDeDatos = getBD();
    baseDeDatos.collection('Articulo').deleteOne(filtroArticulo,(err,result)=>{
        if(err){
            console.error('Error eliminando el Articulo: ',err)
            res.sendStatus(500)
        }else{
            console.log('Articulo eliminado con exito')
            res.sendStatus(200)
        }
    }) 
})
// fin post
const main = ()=>{

    return app.listen(process.env.PORT,()=>{ //process.env.PORT --> buena practica
        console.log(`escuchando puerto ${process.env.PORT}`) //process.env.PORT --> buena practica
  });
    
}
 conectarBD(main)