const Genero = require("../models/genero");
const { request, response } = require("express");

// Metodo para crear un genero

const createGenero = async (req = request, res = response) => {
  console.log(req.body);

  const { nombre, descripcion } = req.body;

  try {
    const generoDB = await Genero.findOne({ nombre });
    if (generoDB) {
      return res.status(400).json({ msj: "Género ya existe este nombre" });
    }

    const datos = {
      nombre,
      descripcion,
    };
    const genero = new Genero(datos);

    await genero.save();

    return res.status(201).json(genero);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: error });
  }
};

//Consultar todos los generos
const consultarGeneros = async (req = request, res = response) => {
  try {
    const generos = await Genero.find();
    return res.status(200).json(generos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al consultar géneros" });
  }
};

//Consulatr un genero por su id
const consultarGeneroPorId = async (req = request, res = response) => {
  const generoId = req.params.id;
  try {
    const genero = await Genero.findById(generoId);

    if (!genero) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }

    return res.status(200).json(genero);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al consultar el género" });
  }
};

//Actualizar un genero

const actualizarGenero = async (req = request, res = response) => {
  const generoId = req.params.id;
  const { nombre, descripcion } = req.body;

  try {
    const genero = await Genero.findById(generoId);

    if (!genero) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }

    genero.nombre = nombre;
    genero.descripcion = descripcion;

    await genero.save();

    return res.status(200).json(genero);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al actualizar el género" });
  }
};

//Borrar un genero pos su id
const borrarGeneroPorId = async (req = request, res = response) => {
  const generoId = req.params.id;

  try {
    const genero = await Genero.findByIdAndDelete(generoId);

    if (!genero) {
      return res.status(404).json({ msj: "Género no encontrado" });
    }

    return res.status(204).json(); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msj: "Error al borrar el género" });
  }
};

module.exports = {
  createGenero,
  consultarGeneros,
  consultarGeneroPorId,
  actualizarGenero,
  borrarGeneroPorId
};
