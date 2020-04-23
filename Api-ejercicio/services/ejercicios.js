const db = require("../config/db.config");

class EjerciciosService {
  constructor() {
    this.Ejercicio = db.ejercicio;
    this.Log = db.log;
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
    const createdEjercicio = await this.Ejercicio.create({ ...ejercicio });
    console.log(createdEjercicio.id)
    const updatedLog = await this.Log.create(
      {id_ejercicio: createdEjercicio.id,
        accion: "crear",
        cambios: JSON.stringify( ejercicio )
      }
    )
    return createdEjercicio;
  }

  async updateStatus({ ejercicioId, status }) {
    const updatedEjercicioId = await this.Ejercicio.update(
      {status},
      {where: {id: ejercicioId}}
    );
    const updatedLog = await this.Log.create(
      {id_ejercicio: ejercicioId,
        accion: "status",
        cambios: "se dio de baja"
      }
    )
    return updatedEjercicioId;
  }

  async updateEjercicio({ ejercicio }) {
    console.log(`Aquí es el log: ${ejercicio.id}`)
    const updatedEjercicio = await this.Ejercicio.update(
      {nombre: ejercicio.nombre,
      numero: ejercicio.numero,
      email: ejercicio.email},
      {where: {id: ejercicio.id}}
    );
    const updatedLog = await this.Log.create(
      {id_ejercicio: ejercicio.id,
        accion: "update",
        cambios: JSON.stringify( ejercicio )
      }
    )
    return updatedEjercicio;
  }


  async deleteEjercicio({ ejercicioId}) {
    const deletedEjercicio = await this.Ejercicio.destroy({
      where: { id: ejercicioId }
    });
    const updatedLog = await this.Log.create(
      {id_ejercicio: ejercicioId,
        accion: "borrar definitivo",
        cambios: JSON.stringify( deletedEjercicio )
      }
    )
    return deletedEjercicio;
  }
}

module.exports = EjerciciosService;
