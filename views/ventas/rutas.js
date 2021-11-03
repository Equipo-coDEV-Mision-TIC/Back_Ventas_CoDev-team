import Express from 'express'
import { queryAllSale, crearVenta, editarVenta, eliminarVenta } from '../../controllers/ventas/controllers.js';

const rutasVentas = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };


rutasVentas.route('/Ventas').get((req,res)=>{
    console.log('Alguien hizo get en la ruta /Ventas')
    
    queryAllSale(genercCallback(res));
})

// comunicacion completa desde el front hasta el back para crear Venta
rutasVentas.route('/Ventas').post((req,res)=>{
    crearVenta(req.body, genercCallback(res))
    })

rutasVentas.route('/Ventas/:id').patch((req,res)=>{
  editarVenta(req.params.id,req.body, genercCallback(res))
})

rutasVentas.route('/Ventas/:id').delete((req,res)=>{
  eliminarVenta(req.params.id, genercCallback(res))  
})

export default rutasVentas