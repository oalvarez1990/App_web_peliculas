// Importar modelo Director
const { request, response } = require("express");
const Director = require("../models/director");

// Método para crear un director
const createDirector = async (req = request, res = response) => {
  console.log(req.body);

  const { nombre, estado } = req.body;

  try {
    const directorExistente = await Director.findOne({ nombre });

    if (directorExistente) {
      return res
        .status(400)
        .json({ mensaje: "Ya existe un director con este nombre" });
    }

    const nuevoDirector = new Director({ nombre, estado });

    await nuevoDirector.save();

    return res.status(201).json(nuevoDirector);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al crear el director" });
  }
};

// Consultar todos los directores
const consultarDirectores = async (req = request, res = response) => {
  try {
    const directores = await Director.find();
    return res.status(200).json(directores);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Error al consultar los directores" });
  }
};

// Consultar un director por su ID
const consultarDirectorPorId = async (req = request, res = response) => {
  const directorId = req.params.id;

  try {
    const director = await Director.findById(directorId);

    if (!director) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    return res.status(200).json(director);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al consultar el director" });
  }
};

// Actualizar un director por su ID
const actualizarDirectorPorId = async (req = request, res = response) => {
  const directorId = req.params.id;
  const { nombre, estado } = req.body;

  try {
    const director = await Director.findById(directorId);

    if (!director) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    director.nombre = nombre;
    director.estado = estado;

    await director.save();

    return res.status(200).json(director);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al actualizar el director" });
  }
};

// Eliminar un director por su ID
const eliminarDirectorPorId = async (req = request, res = response) => {
  const directorId = req.params.id;

  try {
    const director = await Director.findByIdAndDelete(directorId);

    if (!director) {
      return res.status(404).json({ mensaje: "Director no encontrado" });
    }

    return res.status(204).json(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error al eliminar el director" });
  }
};

module.exports = {
  createDirector,
  consultarDirectores,
  consultarDirectorPorId,
  actualizarDirectorPorId,
  eliminarDirectorPorId,
};
