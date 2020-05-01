// CONSTANTES
const CREATE_EJERCICIO = "CREATE_EJERCICIO";
const UPDATE_EJERCICIO = "UPDATE_EJERCICIO";
const UPDATE_STATUS = "UPDATE_STATUS";
const DETELE_EJERCICIO = "DETELE_EJERCICIO";

// CREAR ACCIONES
const actions = {
  logCreateEjercicio: (text) => ({
    type: CREATE_EJERCICIO,
    text,
  }),
  logUpdateEjercicio: (text) => ({
    type: UPDATE_EJERCICIO,
    text,
  }),
  logUpdateStatus: (text) => ({
    type: UPDATE_STATUS,
    text,
  }),
  logDeleteEjercicio: (text) => ({
    type: DETELE_EJERCICIO,
    text,
  }),
};

module.exports = actions;
