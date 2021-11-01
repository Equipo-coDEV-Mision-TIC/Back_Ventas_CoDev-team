import Express from 'express'
import { queryAllProducts, crearProducto, editarProducto, eliminarProducto } from '../../controllers/productos/controllers.js';

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
rutasProductos.route('/Productos').post((req,res)=>{
    crearProducto(req.body, genercCallback(res))
    })

rutasProductos.route('/Productos/:id').patch((req,res)=>{
  editarProducto(req.params.id,req.body, genercCallback(res))
})

rutasProductos.route('/Productos/:id').delete((req,res)=>{
  eliminarProducto(req.params.id, genercCallback(res))  
})

export default rutasProductos