const db = require("../config/db.config");

const Logger = (receivedData = {}, processedData = {}, action) => {
  console.log(
    "Recibido:" + receivedData,
    "Procesado:" + processedData,
    "Accion:" + action
  );
  switch (action.type) {
    case "CREATE_EJERCICIO":
      db.log.create({
        id_ejercicio: processedData.id,
        accion: action.text,
        registro_antes: "N/A",
        registro_despues: JSON.stringify(processedData),
      });
      return true;
    case "UPDATE_EJERCICIO":
      db.log.create({
        id_ejercicio: receivedData.id,
        accion: action.text,
        registro_antes: JSON.stringify(receivedData),
        registro_despues: JSON.stringify(processedData),
      });
      return true;
    case "UPDATE_STATUS":
      db.log.create({
        id_ejercicio: receivedData.ejercicioId,
        accion: action.text,
        registro_antes: JSON.stringify(receivedData),
        registro_despues: `Se eliminó lógicamente registro con id: ${processedData}`,
      });
      return true;
    case "DETELE_EJERCICIO":
      db.log.create({
        id_ejercicio: receivedData.id,
        accion: action.text,
        registro_antes: JSON.stringify(receivedData),
        registro_despues: `Se eliminó lógicamente registro con id: ${receivedData.id}`,
      });
      return true;
    default:
      return state;
  }
};

module.exports = Logger;
