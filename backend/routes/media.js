const { Router } = require("express");
const {
  createMedia,
  consultarMedias,
  consultarMediaPorId,
  actualizarMediaPorId,
  eliminarMediaPorId,
} = require("../controllers/media");

const router = Router();

// Rutas para las operaciones CRUD de Medias
router.post("/", createMedia);
router.get("/", consultarMedias);
router.get("/:id", consultarMediaPorId);
router.put("/:id", actualizarMediaPorId);
router.delete("/:id", eliminarMediaPorId);

module.exports = router;
