const express = require("express");
const EjerciciosService = require("../services/ejercicios");

function ejerciciosApi(app) {
  const router = express.Router();
  app.use("/api/ejercicios", router);

  const ejerciciosService = new EjerciciosService();

  router.get("/", async function(req, res, next) {
    try {
      const ejercicios = await ejerciciosService.getEjercicios();

      res.status(200).json({
        data: ejercicios,
        message: "lista de ejercicios devuelta"
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:ejercicioId", async function(req, res, next) {
    
    const { ejercicioId } = req.params;
    try {
      const ejercicio = await ejerciciosService.getEjercicio({ ejercicioId });

      res.status(200).json({
        data: ejercicio,
        message: "ejercicio encontrado"
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async function(req, res, next) {
    const { body: ejercicio } = req;
    console.log(ejercicio);
    try {
      const createdEjercicioId = await ejerciciosService.createEjercicio({
        ejercicio
      });

      res.status(200).json({
        data: createdEjercicioId,
        message: "ejercicio creado"
      });
    } catch (err) {
      next(err);
    }
  });

  router.put("/:ejercicioId", async function(req, res, next) {
    const { ejercicioId } = req.params;
    const status = 0
    try {
      const updatedEjercicioId = await ejerciciosService.updateEjercicio({
        ejercicioId,
        status
      });

      res.status(200).json({
        data: updatedEjercicioId,
        message: "ejercicio actualizado"
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:ejercicioId", async function(req, res, next) {
    console.log(req.params);
    const { ejercicioId } = req.params;
    try {
      const deletedEjercicioId = await ejerciciosService.deleteEjercicio({
        ejercicioId
      });

      res.status(200).json({
        data: deletedEjercicioId,
        message: "ejercicio actualizado"
      });
    } catch (err) {
      next(err);
    }
  });
}

/**/
module.exports = ejerciciosApi;
