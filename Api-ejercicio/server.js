const express = require("express");
const app = express();

const ejerciciosApi = require("./routes/ejercicios");

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-type,Accept,access-token,X-Key"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// routes
ejerciciosApi(app);

// HACER SYNC CON LA BD
const db = require("./config/db.config.js");

const Ejercicio = db.ejercicio;
const Log = db.log;
const User = db.user;

// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  //  inicializar la base con algunos registros
  //initialize()
});

// Create a Server
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});

function initialize() {
  Ejercicio.create({
    nombre: "Ejemplo1",
    numero: "29.2",
    email: "ejemplo1@equis.com",
  });
  Ejercicio.create({
    nombre: "Ejemplo2",
    numero: "7",
    email: "ejemplo2@equis.com",
  });
}
