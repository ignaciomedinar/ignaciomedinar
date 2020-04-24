const db = require("../config/db.config");
const actions = require("../actions/log");
const Logger = require("./logging");

class EjerciciosService {
  constructor() {
    this.Ejercicio = db.ejercicio;
    this.Log = db.log;
    this.actions = actions;
  }

  async getEjercicios() {
    const ejercicios = await this.Ejercicio.findAll({
      where: { status: 1 },
    });
    return ejercicios || [];
  }

  async getEjercicio({ ejercicioId }) {
    const ejercicio = await this.Ejercicio.findOne({
      where: { id: ejercicioId },
      include: [],
    });

    return ejercicio || {};
  }

  async createEjercicio({ ejercicio }) {
    const createdEjercicio = await this.Ejercicio.create({ ...ejercicio });
    const log = Logger(
      ejercicio,
      createdEjercicio,
      this.actions.createEjercicio("Nuevo registro")
    );
    if (log) console.log("Se registró en el log");
    return createdEjercicio;
  }

  async updateStatus({ ejercicioId, status }) {
    const updatedEjercicioId = await this.Ejercicio.update(
      { status },
      { where: { id: ejercicioId } }
    );
    const log = Logger(
      { ejercicioId, status },
      updatedEjercicioId,
      this.actions.updateStatus("Baja lógica")
    );
    if (log) console.log("Se registró en el log");
  }

  async updateEjercicio({ ejercicio }) {
    const ejercicioAntesDeActualizar = await this.Ejercicio.findOne({
      where: { id: ejercicio.id },
      include: [],
    });
    const updatedEjercicioId = await this.Ejercicio.update(
      {
        nombre: ejercicio.nombre,
        numero: ejercicio.numero,
        email: ejercicio.email,
      },
      { where: { id: ejercicio.id } }
    );
    const log = Logger(
      ejercicioAntesDeActualizar,
      ejercicio,
      this.actions.updateEjercicio("Actualización")
    );
    if (log) console.log("Se registró en el log");
    return updatedEjercicioId;
  }

  async deleteEjercicio({ ejercicioId }) {
    const ejercicioAntesDeBorrar = await this.Ejercicio.findOne({
      where: { id: ejercicioId },
      include: [],
    });
    const deletedEjercicio = await this.Ejercicio.destroy({
      where: { id: ejercicioId },
    });
    const log = Logger(
      ejercicioAntesDeBorrar,
      ejercicioId,
      this.actions.deleteEjercicio("Baja permanente")
    );
    if (log) console.log("Se registró en el log");
    return deletedEjercicio;
  }
}

module.exports = EjerciciosService;
