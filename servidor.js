// const express = require('express') forma tradicional de importar express pero actualmente la tendencia es:

import Express from "express"
import Cors from 'cors'

import dotenv from 'dotenv'
import {conectarBD} from "./db/db.js"
import rutasProductos from './views/articulos/rutas.js'


dotenv.config({path:'./.env'})


const app = Express()
app.use(Express.json())
app.use(Cors())
app.use(rutasProductos)

// fin post
const main = ()=>{

    return app.listen(process.env.PORT,()=>{ //process.env.PORT --> buena practica
        console.log(`escuchando puerto ${process.env.PORT}`) //process.env.PORT --> buena practica
  });
    
}
 conectarBD(main)