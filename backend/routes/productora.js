const { Router } = require("express");
const {
  createProductora,
  consultarProductoras,
  consultarProductoraPorId,
  actualizarProductoraPorId,
  eliminarProductoraPorId,
} = require("../controllers/prductora");

const router = Router();

// Rutas para las operaciones CRUD de Productoras
router.post("/", createProductora);
router.get("/", consultarProductoras);
router.get("/:id", consultarProductoraPorId);
router.put("/:id", actualizarProductoraPorId);
router.delete("/:id", eliminarProductoraPorId);

module.exports = router;
