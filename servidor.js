// const express = require('express') forma tradicional de importar express pero actualmente la tendencia es:

import Express from "express"
import Cors from 'cors'

const app = Express()
app.use(Express.json())
app.use(Cors())


app.get('/Productos',(req,res)=>{
    const productos = [
        {
            IDproducto: "1001",Categoria: "Sofás",Descripción: "sofa reclinable cuerina",Precio: "1100000",
        },
        {
            IDproducto: "1002",
            Categoria: "Sillas Oficina",
            Descripción: "Silla Gerente Reclinable",
            Precio: "950000",   
        }]
    console.log('Alguien hizo get en la ruta /Productos')
    res.send(productos)
})

// comunicacion completa desde el front hasta el back para crear productos
app.post('/Productos/nuevo',(req,res)=>{
    const datosProducto = req.body;
    try{
        if(
            Object.keys(datosProducto).includes('IDProducto') &&
            Object.keys(datosProducto).includes('Categoria') &&
            Object.keys(datosProducto).includes('Descripcion')&&
            Object.keys(datosProducto).includes('Precio')  
        ){
            res.sendStatus(200);
         }else{
             res.sendStatus(500)
         }  
        }catch{
            res.sendStatus(500);
        }
        console.log("Producto a crear: ",req.body)
        console.log('Producto creado con exito')
        
    })

// fin post

app.listen(5000,()=>{
    console.log('escuchando puerto 5000')
});