const { Router } = require("express");
const {
  createGenero,
  consultarGeneros,
  consultarGeneroPorId,
  actualizarGenero,
  borrarGeneroPorId,
} = require("../controllers/genero");

const router = Router();

// Rutas para las operaciones CRUD
router.post("/", createGenero);
router.get("/", consultarGeneros);
router.get("/:id", consultarGeneroPorId);
router.put("/:id", actualizarGenero);
router.delete("/:id", borrarGeneroPorId);

module.exports = router;
