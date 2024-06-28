import mysql from 'mysql';
import dotenv from 'dotenv';
import createNoteSchema from '../models/note.model.js';
import createUserSchema from '../models/user.model.js'; 
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((e) => {
  if(e){
    console.log("Error connecting to database : ", e);
    return;
  }
  else{
    console.log("Successfully connected to database");
    createNoteSchema();
    createUserSchema();
  }
})




export default connection;