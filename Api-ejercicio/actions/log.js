// CONSTANTES
const CREATE_EJERCICIO = "CREATE_EJERCICIO";
const UPDATE_EJERCICIO = "UPDATE_EJERCICIO";
const UPDATE_STATUS = "UPDATE_STATUS";
const DETELE_EJERCICIO = "DETELE_EJERCICIO";

// CREAR ACCIONES
const actions = {
  createEjercicio: (text) => ({
    type: CREATE_EJERCICIO,
    text,
  }),
  updateEjercicio: (text) => ({
    type: UPDATE_EJERCICIO,
    text,
  }),
  updateStatus: (text) => ({
    type: UPDATE_STATUS,
    text,
  }),
  deleteEjercicio: (text) => ({
    type: DETELE_EJERCICIO,
    text,
  }),
};

module.exports = actions;
