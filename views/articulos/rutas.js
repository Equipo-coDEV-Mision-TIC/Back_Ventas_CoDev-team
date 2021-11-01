import Express from 'express'
import { queryAllProducts, crearProducto, editarProducto } from '../../controllers/productos/controllers.js';
import { getBD } from "../../db/db.js"

const rutasProductos = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };


rutasProductos.route('/Productos').get((req,res)=>{
    console.log('Alguien hizo get en la ruta /Productos')
    
    queryAllProducts(genercCallback(res));
})

// comunicacion completa desde el front hasta el back para crear productos
rutasProductos.route('/Productos/nuevo').post((req,res)=>{
    crearProducto(req.body, genercCallback(res))
    })

rutasProductos.route('/Productos/editar').patch((req,res)=>{
  editarProducto(req.body, genercCallback(res))
})

rutasProductos.route('/Productos/Eliminar').delete((req,res)=>{
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

export default rutasProductos