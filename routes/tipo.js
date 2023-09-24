const { Router } = require("express");
const {
  createTipo,
  consultarTipos,
  consultarTipoPorId,
  actualizarTipoPorId,
  eliminarTipoPorId,
} = require("../controllers/tipo");

const router = Router();

// Rutas para las operaciones CRUD de Tipos
router.post("/", createTipo);
router.get("/", consultarTipos);
router.get("/:id", consultarTipoPorId);
router.put("/:id", actualizarTipoPorId);
router.delete("/:id", eliminarTipoPorId);

module.exports = router;
