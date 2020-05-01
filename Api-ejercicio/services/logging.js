const db = require("../config/db.config");

const Logger = (beforeUpdate = {}, changes = {}, action) => {
  console.log(
    "Recibido:" + beforeUpdate,
    "Procesado:" + changes,
    "Accion:" + action
  );
  switch (action.type) {
    case "CREATE_EJERCICIO":
      db.log.create({
        id_ejercicio: changes.id, 
        accion: action.text,
        registro_antes: "N/A",
        registro_despues: JSON.stringify(changes),
      });
      return true;
    case "UPDATE_EJERCICIO":
      db.log.create({
        id_ejercicio: beforeUpdate.id,
        accion: action.text,
        registro_antes: JSON.stringify(beforeUpdate),//redeivedData antes de actualizar en bd
        registro_despues: JSON.stringify(changes),//changes es ejercicio ya actualizado en
      });
      return true;
    case "UPDATE_STATUS":
      db.log.create({
        id_ejercicio: beforeUpdate.ejercicioId,
        accion: action.text,
        registro_antes: JSON.stringify(beforeUpdate),
        registro_despues: `Se eliminó lógicamente registro con id: ${changes}`,
      });
      return true;
    case "DETELE_EJERCICIO":
      db.log.create({
        id_ejercicio: beforeUpdate.id,
        accion: action.text,
        registro_antes: JSON.stringify(beforeUpdate),
        registro_despues: `Se eliminó lógicamente registro con id: ${beforeUpdate.id}`,
      });
      return true;
    default:
      return false;
  }
};

module.exports = Logger;
