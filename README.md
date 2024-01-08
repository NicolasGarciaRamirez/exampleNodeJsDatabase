Este es un ejemplo de una conexion con base de datos mysql desde js

para correr el proyecto recuerda seguir estos pasos:
  1 . npm install 

si deseas iniciar un proyecto desde 0 sige esto:
1. create node project "npm init -y"
2. install mysql package "npm install mysql"
3. create a file like "database.js"
4. import mysql package "const { createPool } = require('mysql')"
5. create pool connection
-----------------------------------------
este es un ejemplo de uso de la libreria mysql con createPool
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    connectionLimit: 10
})
6. execute query
---------------------------
pool.query(`select * from registration`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
})
