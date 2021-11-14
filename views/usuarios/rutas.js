import Express from 'express'
import { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarOCrearUsuario } from '../../controllers/usuarios/controllers.js';

const rutasUsuarios = Express.Router();

const genercCallback = (res) => (err, result) => {
    if (err) {
      console.log('error', err);
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  };


rutasUsuarios.route('/Usuarios').get((req,res)=>{
    console.log('Alguien hizo get en la ruta /Usuarios')
    
    queryAllUsers(genercCallback(res));
})

// comunicacion completa desde el front hasta el back para crear Usuario
rutasUsuarios.route('/Usuarios').post((req,res)=>{
    crearUsuario(req.body, genercCallback(res))
    console.log('Alguien hizo get en la ruta /Usuarios')
    })

    rutasUsuarios.route('/Usuarios/self').get((req, res) => {
      console.log('alguien hizo get en la ruta /self');
      consultarOCrearUsuario(req, genercCallback(res));
      console.log('usuario consultado')
      // consultarUsuario(, genercCallback(res));
    });
    
    rutasUsuarios.route('/Usuarios/:id').get((req, res) => {
      console.log('alguien hizo get en la ruta /usuarios');
      consultarUsuario(req.params.id, genercCallback(res));
    });

rutasUsuarios.route('/Usuarios/:id').patch((req,res)=>{
  editarUsuario(req.params.id,req.body, genercCallback(res))
})

rutasUsuarios.route('/Usuarios/:id').delete((req,res)=>{
  eliminarUsuario(req.params.id, genercCallback(res))  
})

export default rutasUsuarios