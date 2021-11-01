import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path:'./.env'})

const uri = process.env.DATABASE_URL; //process.env.PORT --> buena practica
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let baseDeDatos;

const conectarBD = (callback) =>{

  client.connect((err, db) => {
    if(err) {
        console.error('Error conectando a la base de datos')
    }
    baseDeDatos = db.db('TiendaTech');
    console.log('Conexion exitosa')
    return callback(); 
    })

}

const getBD = () =>{
  return baseDeDatos
}

export {conectarBD, getBD}
