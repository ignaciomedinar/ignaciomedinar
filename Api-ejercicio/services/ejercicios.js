const db = require("../config/db.config");

class EjerciciosService {
  constructor() {
    this.Ejercicio = db.ejercicio;
  }

  async getEjercicios() {
    const ejercicios = await this.Ejercicio.findAll({
      where: { status: 1 }
    });
    return ejercicios || [];
  }

  async getEjercicio({ ejercicioId }) {
    const ejercicio = await this.Ejercicio.findOne({
      where: { id: ejercicioId },
      include: [
  
      ]
    });

    return ejercicio || {};
  }

  async createEjercicio({ ejercicio }) {
    console.log(ejercicio);
    const createdEjercicioId = await this.Ejercicio.create({ ...ejercicio });
    return createdEjercicioId;
  }

  async updateEjercicio({ ejercicioId, status }) {
    const updatedEjercicioId = await this.Ejercicio.update({
      status,
      where: {id: ejercicioId}
    });
    return updatedEjercicioId;
  }

  async deleteEjercicio({ ejercicioId}) {
    const deletedEjercicioId = await this.Ejercicio.destroy({
      where: { id: ejercicioId }
    });
    return deletedEjercicioId;
  }
}

module.exports = EjerciciosService;
