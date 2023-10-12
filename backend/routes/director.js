const { Router } = require("express");
const {
  createDirector,
  consultarDirectores,
  consultarDirectorPorId,
  actualizarDirectorPorId,
  eliminarDirectorPorId,
} = require("../controllers/director");

const router = Router();

// Rutas para las operaciones CRUD de Directores
router.post("/", createDirector);
router.get("/", consultarDirectores);
router.get("/:id", consultarDirectorPorId);
router.put("/:id", actualizarDirectorPorId);
router.delete("/:id", eliminarDirectorPorId);

module.exports = router;
