// const express = require('express') forma tradicional de importar express pero actualmente la tendencia es:

import Express from "express"
import Cors from 'cors'

import dotenv from 'dotenv'
import {conectarBD} from "./db/db.js"
import rutasProductos from './views/articulos/rutas.js'
import rutasUsuarios from './views/usuarios/rutas.js'
import rutasVentas from './views/ventas/rutas.js'


dotenv.config({path:'./.env'})

const PORT = process.env.PORT || 5000;


const app = Express()
app.use(Express.json())
app.use(Cors())
app.use(rutasProductos)
app.use(rutasUsuarios)
app.use(rutasVentas)

// fin post
const main = ()=>{

    return app.listen(PORT,()=>{ //process.env.PORT --> buena practica
        console.log(`escuchando puerto ${PORT}`) //process.env.PORT --> buena practica
  });
    
}
 conectarBD(main);