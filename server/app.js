const express = require('express')
const app = express();
const io = require('socket.io');
const server = io.listen(3000);
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysqlConfig = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'test'
};

const con = mysql.createConnection(mysqlConfig);
const Database = require('./Database');
const db = new Database(mysqlConfig);

app.listen(3003, '0.0.0.0');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/api/user/login', (req, res) => {
  var stm = "SELECT * FROM testing WHERE usuario = ? LIMIT 1";
  const parm = [req.body.usuario];
  con.query(stm, parm, (err, rows) => {
    if (err) {
      return res.status(200).json({
        status: 'fail'
      });
    }
    if (rows.length == 1) {
      rows.forEach((row) => {
        const result = bcrypt.compareSync(req.body.clave, row.clave);
        console.log(result);
        if (result) {
          return res.status(200).json({
              status: 'success',
              data: row
          });
        } else {
          return res.status(200).json({
            status: 'fail',
            message: 'Login Failed'
          });
        }
      });
      } else {
        return res.status(200).json({
            status: 'fail',
            message: 'Login Failed'
        });
      }
    });
  });

server.on("connection", (socket) => {
  console.log("Usuario conectado");
  // var query = socket.handshake.query;
  socket.on('login',(data) => {
    console.log("conectado a login", data);
    let result = [];
    const stm = "SELECT * FROM testing";
    db.query(stm)
    .then(rows => {
      if (rows.length > 0) {
        result = rows;
      } else {
        result.push({error: 1});
      }
      return result;
    })
    .then(()=>{
      socket.emit("login",result);
      socket.broadcast.emit("login",result);
    })
    .catch(err => {
      console.log(err);
    });
  });
});
