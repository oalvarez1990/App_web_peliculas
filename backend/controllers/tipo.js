// Importar modelo Tipo
const Tipo = require("../models/tipo");
const { request, response } = require("express");

// Metodo para crear tipo
const createTipo = async (req = request, res = response) => {
  console.log(req.body);

  const { nombre, descripcion } = req.body;

  try {
    const tipoDB = await Tipo.findOne({ nombre });
    if (tipoDB) {
      return res.status(400).json({ msj: "Tipo ya existe este nombre" });
    }

    const datos = {
      nombre,
      descripcion,
    };
    const tipo = new Tipo(datos);

    await tipo.save();

    return res.status(201).json(tipo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: error });
  }
};

// Consultar todos los tipos
const consultarTipos = async (req = request, res = response) => {
  try {
    const tipos = await Tipo.find();
    return res.status(200).json(tipos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al consultar tipos" });
  }
};

// Consultar un tipo por su ID
const consultarTipoPorId = async (req = request, res = response) => {
  const tipoId = req.params.id; // 

  try {
    const tipo = await Tipo.findById(tipoId);

    if (!tipo) {
      return res.status(404).json({ msj: "Tipo no encontrado" });
    }

    return res.status(200).json(tipo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al consultar el tipo" });
  }
};

// Actualizar un tipo por su ID
const actualizarTipoPorId = async (req = request, res = response) => {
  const tipoId = req.params.id;
  const { nombre, descripcion } = req.body;

  try {
    const tipo = await Tipo.findById(tipoId);

    if (!tipo) {
      return res.status(404).json({ msj: "Tipo no encontrado" });
    }

    tipo.nombre = nombre;
    tipo.descripcion = descripcion;

    await tipo.save();

    return res.status(200).json(tipo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al actualizar el tipo" });
  }
};

// Eliminar un tipo por su ID
const eliminarTipoPorId = async (req = request, res = response) => {
  const tipoId = req.params.id;

  try {
    const tipo = await Tipo.findByIdAndDelete(tipoId);

    if (!tipo) {
      return res.status(404).json({ msj: "Tipo no encontrado" });
    }

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al eliminar el tipo" });
  }
};

module.exports = {
  createTipo,
  consultarTipos,
  consultarTipoPorId,
  actualizarTipoPorId,
  eliminarTipoPorId,
};
